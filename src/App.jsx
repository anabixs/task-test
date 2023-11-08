import { useState } from "react";

import Table from "./components/Table";
import Comments from "./components/Comments";

export default function App() {
  const [route, setRoute] = useState("/");
  const [selectedItemId, setSelectedItemId] = useState(null);

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
          <li>
            <span onClick={() => navigateTo("/news")}>News</span>
          </li>
          <li>
            <span onClick={() => navigateTo("/shows")}>Shows</span>
          </li>
          <li>
            <span onClick={() => navigateTo("/jobs")}>Jobs</span>
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
