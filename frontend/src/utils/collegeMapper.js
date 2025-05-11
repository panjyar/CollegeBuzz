export const collegeMapping = {
    "www.cit.ac.in": "CIT Kokrajhar",
    "www.nita.ac.in": "NIT Agartala",
    "www.iitb.ac.in": "IIT Bombay",
    "www.iitg.ac.in": "IIT Guwahati",
    "www.iitm.ac.in": "IIT Madras",
    "www.iitkgp.ac.in": "IIT Kharagpur",
    "www.nitt.edu": "NIT Trichy",
    "vit.ac.in": "VIT",
    "www.ceed.iitb.ac.in": "IIT Bombay",
    "www.uceed.iitb.ac.in": "IIT Bombay",
    "www.scrs.in": "NIT Agartala",
    "https://erp.iitkgp.ac.in": "IIT Kharagpur",
    "https://neindiabroadcast.com/": "NE India",
    "www.iitbhilai.ac.in": "IIT Bhilai",
    "www.iitmandi.ac.in": "IIT Mandi",
    "iitgoa.ac.in": "IIT Goa",
    "iitj.ac.in": "IIT Joadpur",
    "iitbhilai.ac.in": "IIT Bhilai",
    "www.iitbhu.ac.in": "IIT BHU",
    "iitbbs.ac.in": "IIT Bhubaneswar",
    "iitp.ac.in": "IIT Patna",
    "www.iitr.ac.in": "IIT Roorkee",
    "iith.ac.in": "IIT Hyderabad",
    "iith.ac.in": "IIT Hyderabad",
    "iitpkd.ac.in": "IIT Palakkad",
    "www.nitk.ac.in": "NIT Karnataka",
    "pib.gov.in": "IIT Roorkee",
    "www.india.com": "IIT Roorkee",
    "www.devdiscourse.com": "IIT Roorkee",
    "indianexpress.com": "IIT Roorkee",
    "www.cityairnews.com": "IIT Roorkee",
    "www.indiatoday.in": "IIT Roorkee",
    "www.msn.com": "IIT Roorkee",
    "www.freepressjournal.in": "IIT Roorkee",
    "www.sakshipost.com": "IIT Roorkee",
    "www.hindustantimes.com": "IIT Roorkee",
    "www.medicalbuyer.co.in": "IIT Roorkee",
    "news.careers360.com": "IIT Roorkee",
    "www.shiksha.com": "IIT Roorkee",
    "www.educationtimes.com": "IIT Roorkee",
    "www.indiatoday.in": "IIT Roorkee",
    "news.careers360.com": "IIT Roorkee",
    "timesofindia.indiatimes.com": "IIT Roorkee",
    "www.india.com": "IIT Roorkee",
    "files.iittp.ac.in": "IIT Tirupati",
    "www.iitdh.ac.in": "IIT Dharwad",
    "iitg.ac.in": "IIT Guwahati",
    "events.iitgn.ac.in": "IIT Gandhinagar",
    "erp.iitkgp.ac.in": "IIT Kharagpur",
    "www.iiti.ac.in": "IIT Indore",
    "ahead.iitr.ac.in": "IIT Roorkee",
    "news.iitgn.ac.in": "IIT Gandhinagar",
    "icabsb-2025.in": "IIT Roorkee",
    "events.iiti.ac.in": "IIT Indore",
    
  };
  
  export const getCollegeName = (url) => {
    if (!url) return "Unknown";
    try {
      const urlObj = new URL(url);
      const hostname = urlObj.hostname;
  
      if (collegeMapping[hostname]) return collegeMapping[hostname];
  
      for (const [urlPart, name] of Object.entries(collegeMapping)) {
        if (hostname.includes(urlPart)) return name;
      }
  
      return hostname;
    } catch (error) {
      return "Unknown";
    }
  };