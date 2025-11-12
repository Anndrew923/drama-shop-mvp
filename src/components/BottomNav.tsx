import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "首頁", path: "/" },
    { label: "劇場", path: "/theater" },
    { label: "福利", path: "/benefits" },
    { label: "我的", path: "/profile" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bottom-nav">
      {navItems.map((item, index) => (
        <button
          key={index}
          className={`nav-item ${isActive(item.path) ? "active" : ""}`}
          onClick={() => navigate(item.path)}
        >
          <span className="item-label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
