# crawler_config.py
# IIT Kanpur , IIT BHU , IIT Hyderabad , IIT Mandi , IIT Patna , IIT Gandhinagar , IIT Jodhpur , IIT Indore , IIT Ropar , IIT Bhubnaneswar , IIT Tirupati , IIT Bhilai , IIT Dharwad , IIT Goa , IIT Jammu , IIT Palakakd , IIT 
urls = [
    {
  "url": "https://iitj.ac.in/",
  "schema": {
    "name": "IIT Jodhpur Admission Information",
    "baseSelector": "div.container-fluid div.row marquee",
    "fields": [
      {
        "name": "admission",
        "selector": "a",
        "type": "text",
      },
      {
        "name": "admission_url",
        "selector": "a",
        "type": "attribute",
        "attribute": "href",
      }
    ]
  }
},
{
  "url": "https://iitj.ac.in/",
  "schema": {
    "name": "IIT Jodhpur Research Highlights",
    "baseSelector": "div#gallryTab3 div.module-border-wrap div.tab-content div.tab-pane div.row div.padleft-right",
    "fields": [
      {
        "name": "research",
        "selector": "div a span",
        "type": "text",
        "multiple": True
      },
      {
        "name": "research_url",
        "selector": "div a",
        "type": "attribute",
        "attribute": "href",
        "multiple": True
      }
    ]
  }
},
{
  "url": "https://iitj.ac.in/",
  "schema": {
    "name": "IIT Jodhpur News",
    "baseSelector": "div#newsTab3 div.module-border-wrap div.tab-content div.tab-pane div.mydivs marquee div div.row",
    "fields": [
      {
        "name": "news",
        "selector": "div.col-lg-8 p b a span",
        "type": "text",
        "multiple": True
      },
      {
        "name": "news_url",
        "selector": "div.col-lg-8 p b a",
        "type": "attribute",
        "attribute": "href",
        "multiple": True
      }
    #   {
    #     "name": "news_title",
    #     "selector": "div.col-lg-8 p:nth-of-type(2)",
    #     "type": "text",
    #     "multiple": True
    #   },
    ]
  }
},
{
  "url": "https://iitj.ac.in/",
  "schema": {
    "name": "IIT Jodhpur Announcements",
    "baseSelector": "div#latestTab3 div.module-border-wrap div.tab-content div.tab-pane table tr",
    "fields": [
      {
        "name": "admission",
        "selector": "td:last-child a",
        "type": "text",
        "multiple": True
      },
      {
        "name": "admission_url",
        "selector": "td:last-child a:nth-child(1)",
        "type": "attribute",
        "attribute": "href",
        "multiple": True
      }
    ]
  }
},{
  "url": "https://iitj.ac.in/",
  "schema": {
    "name": "IIT Jodhpur Events",
    "baseSelector": "div#newsTab3 div.module-border-wrap div.tab-content div.tab-pane div.mydivs1 div div.row table tr",
    "fields": [
      {
        "name": "upcoming_Event_title",
        "selector": "td:first-child span a:last-child",
        "type": "text",
        "multiple": True
      },
      {
        "name": "upcoming_Event_url",
        "selector": "td:first-child span a:last-child",
        "type": "attribute",
        "attribute": "href",
        "multiple": True
      },
      {
        "name": "upcoming_Event_year",
        "selector": "td:last-child p time em",
        "type": "text",
        "multiple": True
      },
      {
        "name": "upcoming_Event_date",
        "selector": "td:last-child p time strong",
        "type": "text",
        "multiple": True
      },
      {
        "name": "upcoming_Event_date",
        "selector": "td:last-child p time span",
        "type": "text",
        "multiple": True
      }
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