import React, { useState } from "react";

const ContentTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState("關注");

  const tabs = ["關注", "推薦", "商家", "附近"];
  const contentCards = [
    {
      title: "新奇體驗",
      description: "新聞店家 發現新驚喜",
      image:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300&h=200&fit=crop&auto=format&q=80",
    },
    {
      title: "當地人推薦",
      description: "精選推薦 含200家當地特色餐廳",
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop&auto=format&q=80",
    },
    {
      title: "特色推薦",
      description: "熱門商家 等特色美食體驗",
      image:
        "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300&h=200&fit=crop&auto=format&q=80",
    },
  ];

  return (
    <div className="content-section">
      <div className="tabs-nav">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {activeTab === "關注" && (
          <div className="cards-container">
            {contentCards.map((card, index) => (
              <div key={index} className="content-card">
                <img src={card.image} alt={card.title} className="card-image" />
                <div className="card-text">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentTabs;
