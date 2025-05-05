import json
import asyncio
import re
import os
from urllib.parse import urljoin
from crawl4ai import AsyncWebCrawler, CrawlerRunConfig, CacheMode
from crawl4ai.extraction_strategy import JsonCssExtractionStrategy
from mongodb_handler import MongoDBHandler
from crawler_config import urls
from dotenv import load_dotenv
import smtplib
from email.mime.text import MIMEText

load_dotenv()

# ----------------------
# Email Sending Function
# ----------------------
def send_email(subject, body):
    sender_email = os.environ.get("SENDER_EMAIL")
    sender_password = os.environ.get("SENDER_PASSWORD")  # App password
    receiver_email = os.environ.get("RECEIVER_EMAIL")

    message = MIMEText(body)
    message["Subject"] = subject
    message["From"] = sender_email
    message["To"] = receiver_email

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, receiver_email, message.as_string())
        print("Email sent successfully!")
    except Exception as e:
        print(f"Error sending email: {e}")

# ----------------------
# Crawler Logic
# ----------------------
async def extract_notices_and_events():
    mongo_handler = MongoDBHandler(uri=os.environ.get("MONGO_URI"))
    collection_types = ["notices", "tenders", "upcoming_events", "recruitments", "admissions", "news", "research"]

    for collection in collection_types:
        mongo_handler.create_collection_if_not_exists(collection)

    try:
        async with AsyncWebCrawler(verbose=True) as crawler:
            for site in urls:
                extraction_strategy = JsonCssExtractionStrategy(site["schema"], verbose=True)
                config = CrawlerRunConfig(cache_mode=CacheMode.BYPASS, extraction_strategy=extraction_strategy)
                result = await crawler.arun(url=site["url"], config=config)

                if not result.success:
                    print(f"Crawl failed for {site['url']}: {result.error_message}")
                    continue

                data = json.loads(result.extracted_content)

                # Site-specific filtering
                if site["url"] in ["https://www.nitt.edu/", "https://www.iitkgp.ac.in/"]:
                    data = data[:10]
                elif site["url"] in ["https://www.iitk.ac.in/", "https://www.iiti.ac.in/"]:
                    data = data[:4]

                # Special case for IIT Roorkee
                if site["url"] == "https://www.iitr.ac.in/":
                    for entry in data:
                        if "event_url" in entry:
                            entry["upcoming_Event_url"] = entry["event_url"]
                            del entry["event_url"]
                        elif "upcoming_Event_url" in entry and "window.open(" in entry["upcoming_Event_url"]:
                            match = re.search(r"window\.open\('([^']+)'\)", entry["upcoming_Event_url"])
                            if match:
                                entry["upcoming_Event_url"] = match.group(1)

                print(f"Extracted {len(data)} items from {site['url']}")
                print(json.dumps(data, indent=2) if data else "No data found")

                collections = {collection: [] for collection in collection_types}

                url_mappings = {
                    "notice_url": "notices",
                    "tender_url": "tenders",
                    "upcoming_Event_url": "upcoming_events",
                    "recruitment_url": "recruitments",
                    "research_url": "research",
                    "admission_url": "admissions",
                    "news_url": "news"
                }

                for entry in data:
                    for url_key, collection_name in url_mappings.items():
                        if url_key in entry:
                            entry[url_key] = process_url(site["url"], entry[url_key])
                            collections[collection_name].append(entry)

                for collection_name, records in collections.items():
                    if records:
                        mongo_handler.insert_data(collection_name, records)

        # ✅ If everything runs fine, send success email
        send_email(
            subject="Crawler Run Completed ✅",
            body="Your AICTE college news/event crawler finished successfully!"
        )

    except Exception as e:
        error_message = f"Error during crawling: {str(e)}"
        print(error_message)

        # ❌ Send failure email if error occurs
        send_email(
            subject="Crawler Run Failed ❌",
            body=error_message
        )
        raise

    finally:
        mongo_handler.close_connection()

def process_url(base_url, extracted_url):
    if not extracted_url:
        return extracted_url

    extracted_url = extracted_url.strip()
    if not extracted_url.startswith(("http://", "https://")):
        return urljoin(base_url, extracted_url)
    return extracted_url

if __name__ == "__main__":
    asyncio.run(extract_notices_and_events())
