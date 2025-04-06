import json
import asyncio
from urllib.parse import urljoin
from crawl4ai import AsyncWebCrawler, CrawlerRunConfig, CacheMode
from crawl4ai.extraction_strategy import JsonCssExtractionStrategy
from mongodb_handler import MongoDBHandler

async def extract_notices_and_events():
    urls = [
        {
    "url": "https://www.iitr.ac.in/",
    "schema": {
        "name": "IIT Madras Announcements",
        "baseSelector": "div.ui.half-width-container > div.first.light-blue > div.ui.slider > div.ui.image-card , div.second > div.ui.list > div.listItem > div.event-item",
        "fields": [
           
            {"name": "upcoming_Event_title", "selector": "div.info > div.ui.sub-heading", "type": "text"},
            {"name": "upcoming_Event_url", "selector": "div.event-item", "type": "attribute", "attribute": "href"},
            {"name": "upcoming_Event_date", "selector": "div.info > div.ui.one-liner-captions", "type": "text"},
            # {"name": "upcoming_Event_year", "selector": ".event-date li.font-14", "type": "text"}
           
            {"name": "research", "selector": ".ui.sub-heading", "type": "text"},
            {"name": "research_url", "selector": "a.ui.button", "type": "attribute", "attribute": "href"}
        ] 
    }
    },
        {
            "url": "https://www.cit.ac.in",
            "schema": {
                "name": "CIT Notices and Events",
                "baseSelector": "#myTabContent .tab-pane ul li , div.bxslider.bx-nav-top > div.border-1px.border-left-theme-color-2-6px",
                "fields": [
                    
                    {"name": "notice_title", "selector": "#tab1 a", "type": "text"},
                    {"name": "notice_url", "selector": "#tab1 a", "type": "attribute", "attribute": "href"},
                    
                    {"name": "tender_title", "selector": "#tab2 a", "type": "text"},
                    {"name": "tender_url", "selector": "#tab2 a", "type": "attribute", "attribute": "href"},
                    
                    {"name": "upcoming_Event_title", "selector": ".testimonial p a", "type": "text"},
                    {"name": "upcoming_Event_url", "selector": ".testimonial p a", "type": "attribute", "attribute": "href"},
                    {"name": "upcoming_Event_date", "selector": ".event-date li.font-18", "type": "text"},
                    {"name": "upcoming_Event_year", "selector": ".event-date li.font-14", "type": "text"}
                ]
            }
        },
        {
            "url": "https://www.nita.ac.in",
            "schema": {
                "name": "NITA Notices and Upcoming Event",
                "baseSelector": "div.event_box, div.notice-board ",
                "fields": [
                    
                    {"name": "notice_title", "selector": "a#ContentPlaceHolder1_Repeater_Announcement_hyprAnnmnt_0", "type": "text"},
                    {"name": "notice_url", "selector": "a#ContentPlaceHolder1_Repeater_Announcement_hyprAnnmnt_0", "type": "attribute", "attribute": "href"},
                   
                    {"name": "upcoming_Event_title", "selector": "a#ContentPlaceHolder1_Repeater_Events_EvnthlALb1_0", "type": "text"},
                    {"name": "upcoming_Event_url", "selector": "a#ContentPlaceHolder1_Repeater_Events_EvnthlALb1_0", "type": "attribute", "attribute": "href"},
                    {"name": "upcoming_Event_date", "selector": ".d-flex.align-items-center.mb-3  p.mb-0 ", "type": "text"},
                ]
            }
        },
        {
        "url": "https://www.iitb.ac.in",
        "schema": {
            "name": "IITB Announcements",
            "baseSelector": "div.view-content.row >div.views-row > div.views-field.views-field-nothing",
            "fields": [
                
                {"name": "news", "selector": ".field-content a", "type": "text"},
                {"name": "news_url", "selector": ".field-content a", "type": "attribute", "attribute": "href"},
               
                # {"name": "newsss", "selector": ".news-card-title", "type": "text"},
                # {"name": "newsss_url", "selector": ".news-card-more a", "type": "attribute", "attribute": "href"}
            ]
        }
        }
        ,{
        "url": "https://www.iitg.ac.in/",
        "schema": {
           "name": "IITG Notices and Events",
               "baseSelector": "#myTabContent .tab-pane ul li , div.bxslider.bx-nav-top > div.border-1px.border-left-theme-color-2-6px",
                "fields": [
                   
                    {"name": "admission", "selector": "#tab1 a", "type": "text"},
                    {"name": "admission_url", "selector": "#tab1 a", "type": "attribute", "attribute": "href"},
                    
                    {"name": "recruitment_title", "selector": "#tab2 a", "type": "text"},
                    {"name": "recruitment_url", "selector": "#tab2 a", "type": "attribute", "attribute": "href"},
                    
                    {"name": "upcoming_Event_title", "selector": ".testimonial p a", "type": "text"},
                    {"name": "upcoming_Event_url", "selector": ".testimonial p a", "type": "attribute", "attribute": "href"},
                    {"name": "upcoming_Event_date", "selector": ".event-date li.font-18", "type": "text"},
                    {"name": "upcoming_Event_year", "selector": ".event-date li.font-14", "type": "text"}
                ]
        }
    },
    {
    "url": "https://www.iitm.ac.in/",
    "schema": {
        "name": "IIT Madras Announcements",
        "baseSelector": "div.row.display__flexbox > div.col-sm-4 , div.main-region",
        "fields": [
           
            {"name": "news", "selector": "a h3", "type": "text"},
            {"name": "news_url", "selector": ".col-sm-4 a.block__element", "type": "attribute", "attribute": "href", "prefix": "https://www.iitm.ac.in"},
           
            {"name": "research", "selector": ".col-sm-6.col-sm-6 h4.section__cardheading", "type": "text"},
            {"name": "research_url", "selector": ".col-sm-6.col-sm-6 a.block__element", "type": "attribute", "attribute": "href"}
        ] 
    }
    },
    {
    "url": "https://www.iitkgp.ac.in/",
    "schema": {
        "name": "IIT Kharagpur Updates",
        "baseSelector": "div.upcoming-events div.item.bg-white.border.p-4 , div.owl-stage-outer  div.row.align-items-center",
        "fields": [
          
            {"name" : "admission", "selector": ".col-lg-4 span a" , "type" : "text"},
            {"name" : "admission_url" , "selector" :".col-lg-8 p a" , "type" : "attribute" , "attribute" : "href"},
           
            {"name": "upcoming_Event_date","selector": "span.fz18", "type": "text" },
            {"name": "upcoming_Event_title", "selector": "p.mb-0 span.w-75","type": "text"},
            {"name": "upcoming_Event_url","selector": "p.mb-0 span.text-right a","type": "attribute","attribute": "href"}
        ]
    }
    },
    {
    "url": "https://www.nitt.edu/",
    "schema": {
        "name": "NIT Trichy Updates",
        "baseSelector": ".wpb_column.col-md-4 ul.list-unstyled li , div.author ", ## make for upcomming event
        "fields": [
               
                {"name": "admission","selector": "a","type": "text"},
                {"name": "admission_url","selector": "a","type": "attribute","attribute": "href"} ,
                
                {"name": "upcoming_Event_title", "selector": "h3.upcoming-header a", "type": "text"},
                {"name": "upcoming_Event_url", "selector": "h3.upcoming-header a", "type": "attribute", "attribute": "href"},
                {"name": "upcoming_Event_date", "selector": "figure.date", "type": "text"}
        ]
    }
    },

    {
    "url": "https://vit.ac.in/",
    "schema": {
        "name": "VIT News and Events",
        "baseSelector": ".exad-nt-news ul li, div.elementor-swiper div.elementor-testimonial div.event_listing.post-96677",
        "fields": [
           
            {"name": "admission","selector": " li a span","type": "text"},
            {"name": "admission_url","selector": "li a","type": "attribute","attribute": "href"},
           
            {"name": "upcoming_Event_title", "selector": "div.wpem-event-title h3", "type": "text"},
            {"name": "upcoming_Event_url", "selector": "a.wpem-event-action-url", "type": "attribute", "attribute": "href"},
            {"name": "upcoming_Event_date", "selector": "span.wpem-event-date-time-text", "type": "text"} 
        ]
    }
    }
    ]

    
    
    def process_url(base_url, extracted_url):
        if extracted_url and not extracted_url.startswith("http"):
            return urljoin(base_url, extracted_url.strip())
        return extracted_url

    mongo_handler = MongoDBHandler()

    # Ensure required collections exist in MongoDB
    required_collections = ["notices", "tenders", "upcoming_events", "recruitments", "admissions", "news", "research"]
    
    for collection in required_collections:
        mongo_handler.create_collection_if_not_exists(collection)
        # Clear existing data from each collection before inserting new data
        mongo_handler.clear_collection(collection)

    async with AsyncWebCrawler(verbose=True) as crawler:
        for site in urls:
            extraction_strategy = JsonCssExtractionStrategy(site["schema"], verbose=True)
            config = CrawlerRunConfig(cache_mode=CacheMode.BYPASS, extraction_strategy=extraction_strategy)
            
            result = await crawler.arun(url=site["url"], config=config)
            
            if not result.success:
                print(f"Crawl failed for {site['url']}: {result.error_message}")
                continue

            data = json.loads(result.extracted_content)

            # Apply filtering first
            if site["url"] in ["https://www.nitt.edu/", "https://www.iitkgp.ac.in/"]:
                data = data[:10]

            collections = {
                "notices": [],
                "tenders": [],
                "upcoming_events": [],
                "recruitments": [],
                "admissions": [],
                "news": [],
                "research": []
            }

            for entry in data:
                if "notice_url" in entry:
                    entry["notice_url"] = process_url(site["url"], entry["notice_url"])
                    collections["notices"].append(entry)
                if "tender_url" in entry:
                    entry["tender_url"] = process_url(site["url"], entry["tender_url"])
                    collections["tenders"].append(entry)
                if "upcoming_Event_url" in entry:
                    entry["upcoming_Event_url"] = process_url(site["url"], entry["upcoming_Event_url"])
                    collections["upcoming_events"].append(entry)
                if "recruitment_url" in entry:
                    entry["recruitment_url"] = process_url(site["url"], entry["recruitment_url"])
                    collections["recruitments"].append(entry)
                if "research_url" in entry:
                    entry["research_url"] = process_url(site["url"], entry["research_url"])
                    collections["research"].append(entry)
                if "admission_url" in entry:
                    entry["admission_url"] = process_url(site["url"], entry["admission_url"])
                    collections["admissions"].append(entry)
                if "news_url" in entry:
                    entry["news_url"] = process_url(site["url"], entry["news_url"])
                    collections["news"].append(entry)

            print(f"Extracted {len(data)} notices and events from {site['url']}")
            print(json.dumps(data, indent=2) if data else "No data found")

            # Insert into MongoDB without clearing again (already cleared at the beginning)
            for collection_name, records in collections.items():
                if records:
                    mongo_handler.insert_data(collection_name, records)

    mongo_handler.close_connection()

asyncio.run(extract_notices_and_events())