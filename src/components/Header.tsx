import React from "react";

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <div className="top-bar">
        <span className="location">台灣</span>
        <div className="search-container">
          <span className="scan-icon">📷</span>
          <input type="text" placeholder="搜索" className="search-input" />
          <button className="search-button">搜索</button>
        </div>
        <div className="user-info">
          <span className="user-avatar">👤</span>
          <span className="more-options">⋯</span>
        </div>
      </div>
      <div className="banner">
        <div className="banner-content">
          <h2>SPACING IWATOYAZU</h2>
          <p>豚拉面</p>
          <div className="banner-tags">
            <span className="tag new-listing">新上市</span>
            <span className="tag warm-winter">暖冬新品</span>
            <span className="tag rich-soup">濃湯入魂</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
