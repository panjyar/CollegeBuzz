export const scrollToTabContent = () => {
    setTimeout(() => {
      const tabContentElement = document.querySelector(".tab-content");
      if (tabContentElement) {
        tabContentElement.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        console.error("Tab content element not found");
      }
    }, 100);
  };
  
  export const handleViewAll = (handleTabChange, tabName) => {
    if (handleTabChange) {
      handleTabChange(tabName);
      scrollToTabContent();
    }
  };