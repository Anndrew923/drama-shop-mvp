import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// 引入頁面組件
import HomePage from "./pages/HomePage";
import TheaterPage from "./pages/TheaterPage";
import BenefitsPage from "./pages/BenefitsPage";
import ProfilePage from "./pages/ProfilePage";

// 引入底部導航
import BottomNav from "./components/BottomNav";

function App() {
  return (
    <Router>
      <div className="App">
        <main className="app-main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/theater" element={<TheaterPage />} />
            <Route path="/benefits" element={<BenefitsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
