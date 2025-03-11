import json
import asyncio
from urllib.parse import urljoin
from crawl4ai import AsyncWebCrawler, CrawlerRunConfig, CacheMode
from crawl4ai.extraction_strategy import JsonCssExtractionStrategy

async def extract_notices_and_events():
    urls = [
        {
            "url": "https://www.cit.ac.in",
            "schema": {
                "name": "CIT Notices and Events",
                "baseSelector": "#myTabContent .tab-pane ul li , div.bxslider.bx-nav-top > div.border-1px.border-left-theme-color-2-6px",
                "fields": [
                    {"name": "notice_title", "selector": "#tab1 a", "type": "text"},
                    {"name": "notice_url", "selector": "#tab1 a", "type": "attribute", "attribute": "href"},
                    {"name": "tender_title", "selector": "#tab2 a", "type": "text"},
                    {"name": "notice_url", "selector": "#tab2 a", "type": "attribute", "attribute": "href"},
                    {"name": "upcoming_Event_title", "selector": ".testimonial p a", "type": "text"},
                    {"name": "upcoming_Event_url", "selector": ".testimonial p a", "type": "attribute", "attribute": "href"},
                    {"name": "event_date", "selector": ".event-date li.font-18", "type": "text"},
                    {"name": "event_year", "selector": ".event-date li.font-14", "type": "text"}
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
                    {"name": "event_date", "selector": ".d-flex.align-items-center.mb-3  p.mb-0 ", "type": "text"},
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
                {"name": "newsss", "selector": ".news-card-title", "type": "text"},
                {"name": "newsss_url", "selector": ".news-card-more a", "type": "attribute", "attribute": "href"}
            ]
        }
        }
        ,{
        "url": "https://www.iitg.ac.in/",
        "schema": {
           "name": "IITG Notices and Events",
               "baseSelector": "#myTabContent .tab-pane ul li , div.bxslider.bx-nav-top > div.border-1px.border-left-theme-color-2-6px",
                "fields": [
                    {"name": "admission_title", "selector": "#tab1 a", "type": "text"},
                    {"name": "admission_url", "selector": "#tab1 a", "type": "attribute", "attribute": "href"},
                    {"name": "recruitment_title", "selector": "#tab2 a", "type": "text"},
                    {"name": "recruitment_url", "selector": "#tab2 a", "type": "attribute", "attribute": "href"},
                    {"name": "upcoming_Event_title", "selector": ".testimonial p a", "type": "text"},
                    {"name": "upcoming_Event_url", "selector": ".testimonial p a", "type": "attribute", "attribute": "href"},
                    {"name": "event_date", "selector": ".event-date li.font-18", "type": "text"},
                    {"name": "event_year", "selector": ".event-date li.font-14", "type": "text"}
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
            {
                "name": "upcoming_event_date",
                "selector": "span.fz18",
                "type": "text"
            },
            {
                "name": "upcoming_event_title",
                "selector": "p.mb-0 span.w-75",
                "type": "text"
            },
            {
                "name": "upcoming_event_url",
                "selector": "p.mb-0 span.text-right a",
                "type": "attribute",
                "attribute": "href"
            }
        ]
    }
}
,
    {
    "url": "https://www.nitt.edu/",
    "schema": {
        "name": "NIT Trichy Updates",
        "baseSelector": ".wpb_column.col-md-4",
        "fields": [
            {
                "name": "section_title",
                "selector": "h2.after",
                "type": "text"
            },
            {
                "name": "notices",
                "selector": "ul.list-unstyled li",
                "type": "nested_list",
                "fields": [
                    {
                        "name": "title",
                        "selector": "a",
                        "type": "text"
                    },
                    {
                        "name": "url",
                        "selector": "a",
                        "type": "attribute",
                        "attribute": "href"
                    },
                    {
                        "name": "is_new",
                        "selector": "img[alt='NEW']",
                        "type": "exists"
                    },
                    {
                        "name": "target",
                        "selector": "a",
                        "type": "attribute",
                        "attribute": "target"
                    }
                ]
            }
        ]
    }
    },

    {
    "url": "https://vit.ac.in/",
    "schema": {
        "name": "VIT News and Events",
        "baseSelector": ".exad-nt-news ul li",
        "fields": [
            {
                "name": "title",
                "selector": "a span p, a span",
                "type": "text"
            },
            {
                "name": "url",
                "selector": "a",
                "type": "attribute",
                "attribute": "href"
            },
            {
                "name": "target",
                "selector": "a",
                "type": "attribute",
                "attribute": "target"
            },
            {
                "name": "is_new",
                "selector": "img[src*='new3.webp']",
                "type": "exists"
            }
        ]
    }
}
    ]
    
    def process_url(base_url, extracted_url):
            if extracted_url and not extracted_url.startswith("http"):
                return urljoin(base_url, extracted_url.strip())
            return extracted_url
    

    async with AsyncWebCrawler(verbose=True) as crawler:
        for site in urls:
            extraction_strategy = JsonCssExtractionStrategy(site["schema"], verbose=True)
            config = CrawlerRunConfig(cache_mode=CacheMode.BYPASS, extraction_strategy=extraction_strategy)
            
            result = await crawler.arun(url=site["url"], config=config)
            
            if not result.success:
                print(f"Crawl failed for {site['url']}: {result.error_message}")
                continue

            data = json.loads(result.extracted_content)
            for entry in data:
                if "url" in entry:
                    entry["url"] = process_url(site["url"], entry["url"])
            for entry in data:
                if "news_url" in entry:
                    entry["news_url"] = process_url(site["url"], entry["news_url"])
                if "url" in entry:  
                    entry["url"] = process_url(site["url"], entry["url"])
            for entry in data:
                if "upcoming_Event_url" in entry:
                    entry["upcoming_Event_url"] = process_url(site["url"], entry["upcoming_Event_url"])
                if "url" in entry:  
                    entry["url"] = process_url(site["url"], entry["url"])
            for entry in data:
                if "recruitment_url" in entry:
                    entry["recruitment_url"] = process_url(site["url"], entry["recruitment_url"])
                if "url" in entry:  
                    entry["url"] = process_url(site["url"], entry["url"])
            for entry in data:
                if "research_url" in entry:
                    entry["research_url"] = process_url(site["url"], entry["research_url"])
                if "url" in entry:  
                    entry["url"] = process_url(site["url"], entry["url"])

            

            print(f"Extracted {len(data)} notices and events from {site['url']}")
            print(json.dumps(data, indent=2) if data else "No data found")

# Run the async function
asyncio.run(extract_notices_and_events())