import React from "react";

const MainNav: React.FC = () => {
  const navItems = [
    { label: "美食", icon: "🍴", color: "#ff6b6b" },
    { label: "住宿", icon: "🏢", color: "#61dafb" },
    { label: "景點", icon: "🌴", color: "#4CAF50" },
    { label: "追蹤", icon: "👻", color: "#9C27B0" },
    { label: "演出", icon: "🎤", color: "#FFC107" },
  ];

  return (
    <nav className="main-nav">
      {navItems.map((item, index) => (
        <div key={index} className="nav-item">
          <div className="nav-icon" style={{ backgroundColor: item.color }}>
            {item.icon}
          </div>
          <span className="nav-label">{item.label}</span>
        </div>
      ))}
    </nav>
  );
};

export default MainNav;
