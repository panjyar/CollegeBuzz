export const categories = ["admissions", "news", "recruitments", "research", "upcoming_events", "notices", "tenders"];

export const fieldMappings = {
  admissions: { title: "admission", link: "admission_url" },
  news: { title: "news", link: "news_url" },
  recruitments: { title: "recruitment_title", link: "recruitment_url" },
  research: { title: "research", link: "research_url", author: "research_author" },
  upcoming_events: { title: "upcoming_Event_title", link: "upcoming_Event_url", date: "upcoming_Event_date", year: "upcoming_Event_year", location: "upcoming_Event_location" },
  notices: { title: "notice_title", link: "notice_url" },
  tenders: { title: "tender_title", link: "tender_url" },
};