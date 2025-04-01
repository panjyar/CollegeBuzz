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
    "https://erp.iitkgp.ac.in/": "IIT Kharagpur"
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