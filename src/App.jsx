import { useState } from "react";

import Table from "./components/Table";
import Comments from "./components/Comments";

export default function App() {
  const [route, setRoute] = useState("/");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [activePage, setActivePage] = useState("");

  const navigateTo = (newRoute) => {
    setRoute(newRoute);
  };
  const handleItemSelect = (itemId) => {
    setSelectedItemId(itemId);
    navigateTo(`/comments/${itemId}`);
  };
  return (
    <>
      <header className="header">
        <ul className="main-nav">
          <li
            className={`nav-link ${
              activePage === "news" ? "nav-link-active" : ""
            }`}
          >
            <span
              onClick={() => {
                navigateTo("/news");
                setActivePage("news");
              }}
            >
              News
            </span>
          </li>
          <li
            className={`nav-link ${
              activePage === "shows" ? "nav-link-active" : ""
            }`}
          >
            <span
              onClick={() => {
                navigateTo("/shows");
                setActivePage("shows");
              }}
            >
              Shows
            </span>
          </li>
          <li
            className={`nav-link ${
              activePage === "jobs" ? "nav-link-active" : ""
            }`}
          >
            <span
              onClick={() => {
                navigateTo("/jobs");
                setActivePage("jobs");
              }}
            >
              Jobs
            </span>
          </li>
        </ul>
      </header>
      <div className="container">
        {route === "/" && (
          <Table
            apiEndpoint="https://api.hnpwa.com/v0/news/1.json"
            onItemSelect={handleItemSelect}
          />
        )}
        {route === "/news" && (
          <Table
            apiEndpoint="https://api.hnpwa.com/v0/news/1.json"
            onItemSelect={handleItemSelect}
          />
        )}
        {route === "/shows" && (
          <Table
            apiEndpoint="https://api.hnpwa.com/v0/show/1.json"
            onItemSelect={handleItemSelect}
          />
        )}
        {route === "/jobs" && (
          <Table
            apiEndpoint="https://api.hnpwa.com/v0/jobs/1.json"
            onItemSelect={handleItemSelect}
          />
        )}
        {route.startsWith("/comments/") && <Comments props={selectedItemId} />}
      </div>
    </>
  );
}
