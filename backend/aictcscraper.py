import json
import asyncio
import re
from urllib.parse import urljoin
from crawl4ai import AsyncWebCrawler, CrawlerRunConfig, CacheMode
from crawl4ai.extraction_strategy import JsonCssExtractionStrategy
from mongodb_handler import MongoDBHandler
from crawler_config import urls

async def extract_notices_and_events():
    # Initialize MongoDB handler and collections
    mongo_handler = MongoDBHandler()
    collection_types = ["notices", "tenders", "upcoming_events", "recruitments", "admissions", "news", "research"]
    
    # Create collections if they don't exist
    for collection in collection_types:
        mongo_handler.create_collection_if_not_exists(collection)
    
    try:
        async with AsyncWebCrawler(verbose=True) as crawler:
            for site in urls:
                # Extract data from each site
                extraction_strategy = JsonCssExtractionStrategy(site["schema"], verbose=True)
                config = CrawlerRunConfig(cache_mode=CacheMode.BYPASS, extraction_strategy=extraction_strategy)
                
                # Run the crawler
                result = await crawler.arun(url=site["url"], config=config)
                
                if not result.success:
                    print(f"Crawl failed for {site['url']}: {result.error_message}")
                    continue
                
                # Process extracted data
                data = json.loads(result.extracted_content)
                
                # Apply site-specific filtering
                if site["url"] in ["https://www.nitt.edu/", "https://www.iitkgp.ac.in/"]:
                    data = data[:10]
                elif site["url"] == "https://www.iitk.ac.in/":
                    data = data[:4]
                
                # Special case handling for IIT Roorkee
                if site["url"] == "https://www.iitr.ac.in/":
                    for entry in data:
                        if "event_url" in entry:
                            entry["upcoming_Event_url"] = entry["event_url"]
                            del entry["event_url"]
                        elif "upcoming_Event_url" in entry and "window.open(" in entry["upcoming_Event_url"]:
                            match = re.search(r"window\.open\('([^']+)'\)", entry["upcoming_Event_url"])
                            if match:
                                entry["upcoming_Event_url"] = match.group(1)
                
                # Display extracted data for logging purposes
                print(f"Extracted {len(data)} items from {site['url']}")
                print(json.dumps(data, indent=2) if data else "No data found")
                
                # Initialize collections dictionary
                collections = {collection: [] for collection in collection_types}
                
                # URL field to collection mapping
                url_mappings = {
                    "notice_url": "notices",
                    "tender_url": "tenders",
                    "upcoming_Event_url": "upcoming_events",
                    "recruitment_url": "recruitments",
                    "research_url": "research",
                    "admission_url": "admissions",
                    "news_url": "news"
                }
                
                # Categorize data
                for entry in data:
                    for url_key, collection_name in url_mappings.items():
                        if url_key in entry:
                            # Process URL to ensure it's absolute
                            entry[url_key] = process_url(site["url"], entry[url_key])
                            collections[collection_name].append(entry)
                
                # Insert categorized data into MongoDB
                for collection_name, records in collections.items():
                    if records:
                        mongo_handler.insert_data(collection_name, records)
    except Exception as e:
        print(f"Error during crawling: {str(e)}")
    finally:
        mongo_handler.close_connection()

def process_url(base_url, extracted_url):
    """Convert relative URLs to absolute URLs"""
    if not extracted_url:
        return extracted_url
    
    extracted_url = extracted_url.strip()
    if not extracted_url.startswith(("http://", "https://")):
        return urljoin(base_url, extracted_url)
    
    return extracted_url

if __name__ == "__main__":
    asyncio.run(extract_notices_and_events())