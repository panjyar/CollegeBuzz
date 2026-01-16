# crawler_config.py
# IIT Kanpur , IIT BHU , IIT Hyderabad , IIT Mandi , IIT Patna , IIT Gandhinagar , IIT Jodhpur , IIT Indore , IIT Ropar , IIT Bhubnaneswar , IIT Tirupati , IIT Bhilai , IIT Dharwad , IIT Goa , IIT Jammu , IIT Palakakd 
# name all NIT college name NIT Tirchy NIT Surathkal NIT Warangal NIT Calicut NIT Durgapur NIT Silchar NIT Agartala NIT Hamirpur NIT Jamshedpur NIT Raipur NIT Kurukshetra NIT Delhi NIT Uttarakhand NIT Sikkim NIT Meghalaya NIT Nagaland NIT Arunachal Pradesh NIT Mizoram NIT Manipur NIT Puducherry NIT Jammu and Kashmir NIT Nagaland NIT Arunachal Pradesh NIT Mizoram NIT Manipur NIT Puducherry NIT Jammu and Kashmir NIT Nagaland NIT Arunachal Pradesh

urls = [
    {
    "url": "https://nitc.ac.in/noticeboard/admissions, https://nitc.ac.in/noticeboard/recruitments, https://nitc.ac.in/purchase-section/tenders",
    "schema": {
        "name": "NIT Calicut Website Data",
        "baseSelector": "body",  
        "fields": [
            {
                "name": "section_titles",
                "selector": "h6.xc-page-title-underline",
                "type": "text",
                "multiple": True
            },
            {
                "name": "items",
                "selector": "ul.xc-calendar-list-v4 li",
                "type": "nested",
                "multiple": True,
                "fields": [
                    {
                        "name": "item_title",
                        "selector": "div.xc-c-name p.c-name",
                        "type": "text"
                    },
                    {
                        "name": "item_url",
                        "selector": "div.xc-c-name a",
                        "type": "attribute",
                        "attribute": "href"
                    },
                    {
                        "name": "is_new",
                        "selector": "div.xc-c-name p.c-name img",
                        "type": "exists"
                    }
                ]
            },
            
            {
                "name": "tender_departments",
                "selector": "div.xc-academic-calendar-box p.xc-calendar-year",
                "type": "text",
                "multiple": True
            },
            {
                "name": "tender_items",
                "selector": "ul.xc-calendar-list li",
                "type": "nested",
                "multiple": True,
                "fields": [
                    {
                        "name": "tender_title",
                        "selector": "div.xc-c-name p.c-name",
                        "type": "text"
                    },
                    {
                        "name": "tender_url",
                        "selector": "div.xc-c-name a",
                        "type": "attribute",
                        "attribute": "href"
                    },
                    {
                        "name": "tender_download_url",
                        "selector": "div.xc-c-action a.xc-c-download",
                        "type": "attribute",
                        "attribute": "href"
                    }
                ]
            }
        ]
    }
}
,
    {
  "url": "https://www.nitk.ac.in/",
  "schema": {
    "name": "NITK Website Data",
    "baseSelector": "div.gdlr-core-pbf-column",
    "fields": [
      # News and Updates section
      {"name": "news_titles", "selector": "div.gdlr-core-pbf-column", "type": "text", "multiple": True},
      {"name": "news_dates", "selector": "div.gdlr-core-pbf-column", "type": "text", "multiple": True},
      {"name": "news_urls", "selector": "div.gdlr-core-blog-item-holder div.gdlr-core-blog-widget-content h3.gdlr-core-blog-title a", "type": "attribute", "attribute": "href", "multiple": True},
      
      # Announcements section
      {"name": "announcement_titles", "selector": "div.gdlr-core-block-item-title:contains('Announcements') + div.gdlr-core-blog-item-holder div.gdlr-core-blog-widget-content h3.gdlr-core-blog-title a", "type": "text", "multiple": True},
      {"name": "announcement_dates", "selector": "div.gdlr-core-block-item-title:contains('Announcements') + div.gdlr-core-blog-item-holder div.gdlr-core-blog-widget-content div.gdlr-core-blog-info-wrapper span.gdlr-core-blog-info-date a", "type": "text", "multiple": True},
      {"name": "announcement_urls", "selector": "div.gdlr-core-block-item-title:contains('Announcements') + div.gdlr-core-blog-item-holder div.gdlr-core-blog-widget-content h3.gdlr-core-blog-title a", "type": "attribute", "attribute": "href", "multiple": True},
      
      # Upcoming Events section
      {"name": "event_titles", "selector": "div.gdlr-core-event-item-holder div.gdlr-core-event-item-list h3.gdlr-core-event-item-title a", "type": "text", "multiple": True},
      {"name": "event_start_dates", "selector": "div.gdlr-core-event-item-holder div.gdlr-core-event-item-list div.gdlr-core-event-item-info-wrap span.gdlr-core-event-item-info:nth-of-type(1) span.gdlr-core-tail", "type": "text", "multiple": True},
      {"name": "event_end_dates", "selector": "div.gdlr-core-event-item-holder div.gdlr-core-event-item-list div.gdlr-core-event-item-info-wrap span.gdlr-core-event-item-info:nth-of-type(2) span.gdlr-core-tail", "type": "text", "multiple": True},
      {"name": "event_day", "selector": "div.gdlr-core-event-item-holder div.gdlr-core-event-item-list span.gdlr-core-event-item-info.gdlr-core-type-start-date-month span.gdlr-core-date", "type": "text", "multiple": True},
      {"name": "event_month", "selector": "div.gdlr-core-event-item-holder div.gdlr-core-event-item-list span.gdlr-core-event-item-info.gdlr-core-type-start-date-month span.gdlr-core-month", "type": "text", "multiple": True}
    ]
  }
},
    
    {
    "url": "https://iitpkd.ac.in/",
    "schema": {
      "name": "IIT Palakkad Events",
      "baseSelector": "div.events-news",
      "fields": [
        {"name": "upcoming_Event_title", "selector": "span.field-content a", "type": "text"},
        {"name": "upcoming_Event_date", "selector": "div.views-field.date div.field-content", "type": "text"},
        {"name": "upcoming_Event_month","selector": "div.views-field.month div.field-content","type": "text"},
        {"name": "upcoming_Event_url", "selector": "span.field-content a", "type": "attribute", "attribute": "href"}
      ]
    }
  },
    
    {
  "url": "https://www.iitjammu.ac.in/",
  "schema": {
    "name": "IIT Jammu Information",
    "baseSelector": "div.row ng-star-inserted div.col-md-3 , div.container div.row  ul", 
    "fields": [
      {"name": "news","selector": "div.ng-star-inserted a h3","type": "text"},
      {"name": "news_url","selector": "div.ng-star-inserted a","type": "attribute","attribute": "href"},
      {"name": "news","selector": "ul div.ng-star-inserted a ","type": "text"},
      {"name": "news_url","selector": "ul div.ng-star-inserted a ","type": "attribute", "attribute": "href"}
    ]
  }
},
    

     {
  "url": "https://www.iitgoa.ac.in/",
  "schema": {
    "name": "IIT Goa Information",
    "baseSelector": "div.row", 
    "fields": [
      {"name": "admission","selector": "div.row center span a","type": "text"},
      {"name": "admission_url","selector": "div.row center span a","type": "attribute","attribute": "href"},
      
      {"name": "news","selector": "div[style*='background-color: rgb(0 104 146)'] p a","type": "text"},
      {"name": "news_url","selector": "div[style*='background-color: rgb(0 104 146)'] p a","type": "attribute","attribute": "href"},
      
      {"name": "news","selector": "div[style*='height:300px; background-color:white; overflow-y:auto;padding:10px'] p a","type": "text"},
      {"name": "news_url","selector": "div[style*='height:300px; background-color:white; overflow-y:auto;padding:10px'] p a","type": "attribute","attribute": "href"},
      
      {"name": "research","selector": "div.col-sm-4:nth-child(2) div[style*='height:300px; background-color:white;'] p a","type": "text"},
      {"name": "research_url","selector": "div.col-sm-4:nth-child(2) div[style*='height:300px; background-color:white;'] p a","type": "attribute","attribute": "href"},
      
      {"name": "upcoming_Event_title","selector": "div[style*='background-color:#cccccc;padding: 20px;height:300px;'] p a","type": "text"},
      {"name": "upcoming_Event_url","selector": "div[style*='background-color:#cccccc;padding: 20px;height:300px;'] p a","type": "attribute","attribute": "href"},
      
      {"name": "admssion","selector": "div[style*='padding: 10px; border:1px solid #cccccc;background-color:white;font-size:15px;'] marquee a","type": "text"},
      {"name": "admission_url","selector": "div[style*='padding: 10px; border:1px solid #cccccc;background-color:white;font-size:15px;'] marquee a","type": "attribute","attribute": "href"}
    ]
  }
},
    {
  "url": "https://iitdh.ac.in/",
  "schema": {
    "name": "IIT Dharwad Information",
    "baseSelector": "#block-base-homepageannouncements div.body ul li, #block-base-views-block-news-block-1 div.view-wrapper > div , div#block-base-views-block-events-block-3 div.view-wrapper > div , div#block-base-views-block-gallery-block-1 .view-wrapper > div",
    "fields": [
      {"name": "recruitment_title","selector": "div.body ul li a","type": "text","multiple": True},
      {"name": "recruitment_url","selector": "div.body ul li a","type": "attribute","attribute": "href","multiple": True},
      {"name": "news_title","selector": "div.views-field-title .title a","type": "text","multiple": True},
      {"name": "news_url","selector": "div.views-field-title .title a","type": "attribute","attribute": "href","multiple": True},
      {"name": "news","selector": "div.views-field-title .title a","type": "text","multiple": True},
      {"name": "news_url","selector": "div.views-field-title .title a","type": "attribute","attribute": "href","multiple": True},
      {"name": "upcoming_event_title","selector": "div.views-field-title .title a","type": "text","multiple": True},
      {"name": "upcoming_event_url","selector": "div.views-field-title .title a","type": "attribute","attribute": "href","multiple": True},
      {"name": "upcoming_Event_date","selector": ".views-field-field-date-ran .field_date_ran","type": "text","multiple": True}
    ]
  }
}

    ,
    {
  "url": "https://www.iitbhilai.ac.in/",
  "schema": {
    "name": "IIT Bhilai Information",
    "baseSelector": "div.well.welltheme li , div.well.wellpaleyellow ul li, div.col-md-8 div.row div.col-md-11.col-sm-11.col-xs-11",
    "fields": [
      {"name": "news_title","selector": "div.well.welltheme li a b","type": "text"},
      {"name": "news_url","selector": "div.well.welltheme li a","type": "attribute","attribute": "href"},
      {"name": "upcoming_Event_title","selector": "div.well.wellpaleyellow ul li a","type": "text","multiple": True},
      {"name": "upcoming_Event_url","selector": "div.well.wellpaleyellow ul li a","type": "attribute","attribute": "href","multiple": True},
      {"name": "research","selector": "div.col-md-8 div.row div.col-md-11.col-sm-11.col-xs-11 a","type": "text","multiple": True},
      {"name": "research_url","selector": "div.col-md-8 div.row div.col-md-11.col-sm-11.col-xs-11 a","type": "attribute", "attribute": "href","multiple": True}
    ]
  }
}

    ,
   {
  "url": "https://www.iittp.ac.in/",
  "schema": {
    "name": "IIT trirupati Information",
    "baseSelector": "div.marquee-container, div.scrollbar2, div.scrollbar3, section.event.pt-80", 
    "fields": [
      {"name": "admission","selector": "div.marquee div.initial-child-container div.child a","type": "text"},
      {"name": "admission_url","selector": "div.marquee div.initial-child-container div.child a","type": "attribute","attribute": "href"},

      {"name": "news","selector": "div.scrollbar2 div.event-item.mb-10.hover-zoomin div.text h6 a","type": "text"},
      {"name": "news_url","selector": "div.scrollbar2 div.event-item.mb-10.hover-zoomin div.text h6 a","type": "attribute","attribute": "href"},

      {"name": "upcoming_Event_title","selector": "section.event.pt-80 div.event-item h3 a","type": "text"},
      {"name": "upcoming_Event_date","selector": "section.event.pt-80 div.event-item div.date strong","type": "text"},
      {"name": "upcoming_Event_url","selector": "section.event.pt-80 div.event-item h3 a","type": "attribute","attribute": "href"},

      {"name": "recruitment_title","selector": "div.scrollbar3 div.event-item.mb-10.hover-zoomin h6 a","type": "text"},
      {"name": "recruitment_url","selector": "div.scrollbar3 div.event-item.mb-10.hover-zoomin h6 a","type": "attribute","attribute": "href"}
    ]
  }
}
,
    
  {
  "url": "https://www.iitbbs.ac.in/",
  "schema": {
    "name": "IIT Bhubaneswar Information",
    "baseSelector": "div.elementor-column, section.elementor-section",
    "fields": [
      # Admission related announcements
      {"name": "admission", "selector": "div.elementor-element-7f2e9d6 article.elementor-post.category-admission-news h3.elementor-post__title a", "type": "text", "multiple": True},
      {"name": "admission_url", "selector": "div.elementor-element-7f2e9d6 article.elementor-post.category-admission-news h3.elementor-post__title a", "type": "attribute", "attribute": "href", "multiple": True},
      
      # # Research Section - Adjust selectors to better target the slide elements
      # {"name": "research", "selector": "section#research .elementor-carousel-image-overlay.e-overlay-animation-fade", "type": "text", "multiple": True},
      # {"name": "research_url", "selector": "section#research .swiper-slide a", "type": "attribute", "attribute": "href", "multiple": True},
      
      # Upcoming Events/Seminars/Workshops - Using section ID
      {"name": "upcoming_Event_title", "selector": "section#campusbulletin h6.elementor-heading-title a", "type": "text", "multiple": True},
      {"name": "upcoming_Event_url", "selector": "section#campusbulletin h6.elementor-heading-title a", "type": "attribute", "attribute": "href", "multiple": True},
    ]
  }
},
    {
    "url": "https://www.iiti.ac.in/",
    "schema": {
      "name": "IIT Indore Events",
      "baseSelector": "div.tz-event-container div.tz-event-wrapper div.tz-event-style-4:not(.news)",
      "fields": [
        {"name": "upcoming_Event_title", "selector": "div.tz-content-event-item p", "type": "text", "multiple": True},
        {"name": "upcoming_Event_date", "selector": "div.tz-content-event-item strong", "type": "text", "multiple": True},
        {"name": "upcoming_Event_url", "selector": "div.tz-content-event-item div.anchorread a", "type": "attribute", "attribute": "href", "multiple": True}
      ]
    }
  },
  {
    "url": "https://www.iiti.ac.in/",
    "schema": {
      "name": "IIT Indore News",
      "baseSelector": "div.tz-event-container div.tz-event-wrapper div.tz-event-style-4.news",
      "fields": [
        {"name": "news", "selector": "div.tz-content-event-item p", "type": "text", "multiple": True},
        {"name": "news_url", "selector": "div.newsdetails a", "type": "attribute", "attribute": "href", "multiple": True}
      ]
    }
  }
    
    ,{
  "url": "https://iitj.ac.in/",
  "schema": {
    "name": "IIT Jodhpur Admission Information",
    "baseSelector": "div.container-fluid div.row marquee",
    "fields": [
      {"name": "admission","selector": "a","type": "text",},
      {"name": "admission_url","selector": "a","type": "attribute","attribute": "href",}
    ]
  }
},
{
  "url": "https://iitj.ac.in/",
  "schema": {
    "name": "IIT Jodhpur Research Highlights",
    "baseSelector": "div#gallryTab3 div.module-border-wrap div.tab-content div.tab-pane div.row div.padleft-right",
    "fields": [
      {"name": "research","selector": "div a span","type": "text","multiple": True},
      {"name": "research_url","selector": "div a","type": "attribute","attribute": "href","multiple": True}
    ]
  }
},
{
  "url": "https://iitj.ac.in/",
  "schema": {
    "name": "IIT Jodhpur News",
    "baseSelector": "div#newsTab3 div.module-border-wrap div.tab-content div.tab-pane div.mydivs marquee div div.row",
    "fields": [
      {"name": "news","selector": "div.col-lg-8 p b a span","type": "text","multiple": True},
      {"name": "news_url","selector": "div.col-lg-8 p b a","type": "attribute","attribute": "href","multiple": True}
    ]
  }
},
{
  "url": "https://iitj.ac.in/",
  "schema": {
    "name": "IIT Jodhpur Announcements",
    "baseSelector": "div#latestTab3 div.module-border-wrap div.tab-content div.tab-pane table tr",
    "fields": [
      {"name": "admission","selector": "td:last-child a","type": "text","multiple": True},
      {"name": "admission_url","selector": "td:last-child a:nth-child(1)","type": "attribute","attribute": "href","multiple": True}
    ]
  }
},{
  "url": "https://iitj.ac.in/",
  "schema": {
    "name": "IIT Jodhpur Events",
    "baseSelector": "div#newsTab3 div.module-border-wrap div.tab-content div.tab-pane div.mydivs1 div div.row table tr",
    "fields": [
      {"name": "upcoming_Event_title","selector": "td:first-child span a:last-child","type": "text","multiple": True},
      {"name": "upcoming_Event_url","selector": "td:first-child span a:last-child","type": "attribute","attribute": "href","multiple": True},
      {"name": "upcoming_Event_year","selector": "td:last-child p time em","type": "text","multiple": True},
      {"name": "upcoming_Event_month","selector": "td:last-child p time strong","type": "text","multiple": True},
      {"name": "upcoming_Event_date","selector": "td:last-child p time span","type": "text","multiple": True}
    ]
  }
}
,
{
        "url": "https://www.iitgn.ac.in/",
        "schema": {
            "name": "IIT Gandhinagar ",
            "baseSelector": "section.homesection .slider--columns ul.slides li",
            "fields": [
                {"name": "upcoming_Event_title", "selector": "div.feature h5", "type": "text"},
                {"name": "upcoming_Event_date", "selector": "div.feature p:nth-of-type(2)", "type": "text"},
                {"name": "upcoming_Event_url", "selector": "div.feature a[href]", "type": "attribute", "attribute":"href"}
            ]
        }
    }
     ,{
  "url": "https://www.iitp.ac.in/",
  "schema": {
    "name": "IIT Patna Information",
    "baseSelector": "div.home-update, div.noticeboard, div.flexslider",
    "fields": [
      {"name": "admission","selector": "div.home-update div.js-conveyor-3 marquee ul li p a","type": "text"},
      {"name": "admission_url","selector": "div.home-update div.js-conveyor-3 marquee ul li p a","type": "attribute","attribute": "href"},
      
      {"name": "notice_title","selector": "div.noticeboard div.mod-articlesnews div.mod-articlesnews__item h4.slider-title a","type": "text"},
      {"name": "notice_url","selector": "div.noticeboard div.mod-articlesnews div.mod-articlesnews__item h4.slider-title a","type": "attribute","attribute": "href"},
      
      {"name": "research","selector": "div#custom100 ul.slides li p a","type": "text"},
      {"name": "research_url","selector": "div#custom100 ul.slides li p a","type": "attribute","attribute": "href"},
      
      {"name": "news","selector": "div#custom102 ul.slides li p a","type": "text"},
      {"name": "news_url","selector": "div#custom102 ul.slides li p a","type": "attribute","attribute": "href"},
      
      {"name": "news","selector": "div.noticeboard.newww h2:contains('In the News') + div div.mod-articlesnews div.mod-articlesnews__item h4.slider-title a","type": "text"},
      {"name": "news_url","selector": "div.noticeboard.newww h2:contains('In the News') + div div.mod-articlesnews div.mod-articlesnews__item h4.slider-title a","type": "attribute","attribute": "href"}
    ]
  }
}
    ,{
        "url": "https://www.iitmandi.ac.in/",
        "schema": {
            "name": "IIT Mandi Information",
            "baseSelector": "div.col-lg-4:first-child, div#announcement, div#admissions, div#career",
            "fields": [
                {"name": "news", "selector": "ul.demo1 li.news-item div.pr-3 p a.text-iit", "type": "text"},
                {"name": "news_url", "selector": "ul.demo1 li.news-item div.pr-3 p a.text-iit", "type": "attribute", "attribute": "href"},
                
                {"name": "news", "selector": "div#announcement li.news-item a.text-iit", "type": "text"},
                {"name": "news_url", "selector": "div#announcement li.news-item a.text-danger", "type": "attribute", "attribute": "href"},
                
                {"name": "admission", "selector": "div#admissions li.news-item a.text-iit", "type": "text"},
                {"name": "admission_url", "selector": "div#admissions li.news-item a.text-iit", "type": "attribute", "attribute": "href"},
                
                {"name": "recruitment_title", "selector": "div#career li.news-item a.text-iit", "type": "text"},
                {"name": "recruitment_url", "selector": "div#career li.news-item a.text-iit", "type": "attribute", "attribute": "href"},
            ]
        }
    },
    {
        "url": "https://iith.ac.in/",
        "schema": {
            "name": "IITH Information",
            "baseSelector": "div.col-lg-4:nth-child(1), div.col-lg-4:nth-child(2), div.listrecent div.col-lg-4",
            "fields": [
                {"name": "news", "selector": "div.col-lg-4:nth-child(1) h2.h5 a", "type": "text"},
                {"name": "news_url", "selector": "div.col-lg-4:nth-child(1) h2.h5 a", "type": "attribute", "attribute": "href", "prefix": "https://iith.ac.in"},
                {"name": "upcoming_Event_title", "selector": "div.col-lg-4:nth-child(2) h2.h5 a", "type": "text"},
                {"name": "upcoming_Event_date", "selector": "div.col-lg-4:nth-child(2) h3.h5 small.text-muted", "type": "text"},
                {"name": "upcoming_Event_url", "selector": "div.col-lg-4:nth-child(2) h2.h5 a", "type": "attribute", "attribute": "href", "prefix": "https://iith.ac.in"},
                {"name": "news", "selector": "div.listrecent div.col-lg-4 h2.h5.card-title a", "type": "text"},
                {"name": "news_url", "selector": "div.listrecent div.col-lg-4 h2.h5.card-title a", "type": "attribute", "attribute": "href", "prefix": "https://iith.ac.in"}
            ]
        }
    },
    {
        "url": "https://www.iitk.ac.in/",
        "schema": {
            "name": "IIT Kanpur Information",
            "baseSelector": "div[style*='display: inline-block'], ul.admission-news > li.news-adm",
            "fields": [
                {"name": "research", "selector": "div[style*='display: inline-block'] a.verticalcard", "type": "text"},
                {"name": "research_url", "selector": "div[style*='display: inline-block'] a.verticalcard", "type": "attribute", "attribute": "href", "prefix": "https://www.iitk.ac.in"},
                {"name": "admission", "selector": "ul.admission-news > li.news-adm a", "type": "text"},
                {"name": "admission_url", "selector": "ul.admission-news > li.news-adm a", "type": "attribute", "attribute": "href"}
            ]
        }
    },
    {
        "url": "https://www.iitr.ac.in/",
        "schema": {
            "name": "IIT Roorkee Announcements",
            "baseSelector": "div.ui.half-width-container > div.first.light-blue > div.ui.slider > div.ui.image-card, div.second > div.ui.list > div.listItem",
            "fields": [
                {"name": "news", "selector": "div.ui.image-card div.content div.ui.sub-heading", "type": "text"},
                {"name": "news_description", "selector": "div.ui.image-card div.content div.ui.intro-text.justify", "type": "text"},
                {"name": "news_url", "selector": "div.ui.image-card div.content a.ui.button", "type": "attribute", "attribute": "href"},
                {"name": "upcoming_Event_title", "selector": "div.event-item > div.info > div.ui.sub-heading", "type": "text"},
                {"name": "upcoming_Event_date", "selector": "div.event-item > div.info > div.ui.one-liner-captions", "type": "text"},
                {"name": "upcoming_Event_url", "selector": "div.event-item", "type": "attribute", "attribute": "onclick", "extractRegex": "window\\.open\\('([^']+)'\\)"}
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
                {"name": "upcoming_Event_date", "selector": ".d-flex.align-items-center.mb-3  p.mb-0 ", "type": "text"}
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
                {"name": "news_url", "selector": ".field-content a", "type": "attribute", "attribute": "href"}
            ]
        }
    },
    {
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
                {"name": "admission", "selector": ".col-lg-4 span a", "type": "text"},
                {"name": "admission_url", "selector": ".col-lg-8 p a", "type": "attribute", "attribute": "href"},
                {"name": "upcoming_Event_date", "selector": "span.fz18", "type": "text"},
                {"name": "upcoming_Event_title", "selector": "p.mb-0 span.w-75", "type": "text"},
                {"name": "upcoming_Event_url", "selector": "p.mb-0 span.text-right a", "type": "attribute", "attribute": "href"}
            ]
        }
    },
    {
        "url": "https://www.nitt.edu/",
        "schema": {
            "name": "NIT Trichy Updates",
            "baseSelector": ".wpb_column.col-md-4 ul.list-unstyled li , div.author",
            "fields": [
                {"name": "admission", "selector": "a", "type": "text"},
                {"name": "admission_url", "selector": "a", "type": "attribute", "attribute": "href"},
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
                {"name": "admission", "selector": " li a span", "type": "text"},
                {"name": "admission_url", "selector": "li a", "type": "attribute", "attribute": "href"},
                {"name": "upcoming_Event_title", "selector": "div.wpem-event-title h3", "type": "text"},
                {"name": "upcoming_Event_url", "selector": "a.wpem-event-action-url", "type": "attribute", "attribute": "href"},
                {"name": "upcoming_Event_date", "selector": "span.wpem-event-date-time-text", "type": "text"}
            ]
        }
    }
]