import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
export default function Table({ apiEndpoint, onItemSelect }) {
  const [list, setList] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(1);
  const [isLoaded, setisLoaded] = useState(false);
  const tableStyle = {
    borderCollapse: "collapse",
    width: "100%",
  };

  const cellStyle = {
    border: "1px solid #ccc",
    padding: "8px",
    textAlign: "left",
    verticalAlign: "top",
    maxWidth: "300px",
    cursor: "pointer",
  };
  useEffect(() => {
    axios
      .get(apiEndpoint)
      .then((response) => {
        setList(response.data);
        setisLoaded(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [apiEndpoint]);
  if (typeof apiEndpoint !== "string") {
    console.error("apiEndpoint is missing or not a string.");
    return null;
  }
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(-sortDirection);
    } else {
      setSortColumn(column);
      setSortDirection(1);
    }
  };
  const sortedList = [...list].sort((a, b) => {
    if (sortColumn) {
      const valueA = a[sortColumn];
      const valueB = b[sortColumn];

      return valueA < valueB
        ? -sortDirection
        : valueA > valueB
        ? sortDirection
        : 0;
    }
    return 0;
  });
  const handleItemSelect = (itemId) => {
    onItemSelect(itemId);
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: "short", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };
  console.log(list);
  return (
    <>
      {isLoaded ? (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={cellStyle} onClick={() => handleSort("id")}>
                id
              </th>
              <th style={cellStyle} onClick={() => handleSort("time")}>
                Time
              </th>
              <th style={cellStyle} onClick={() => handleSort("title")}>
                Title
              </th>
              <th style={cellStyle} onClick={() => handleSort("domain")}>
                Domain
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedList.map((note) => (
              <tr key={note.id}>
                <td style={cellStyle} onClick={() => handleItemSelect(note.id)}>
                  {note.id}
                </td>
                <td style={cellStyle}>{formatDate(note.time)}</td>
                <td style={cellStyle}>{note.title}</td>
                <td style={cellStyle}>{note.domain}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
Table.propTypes = {
  apiEndpoint: PropTypes.string.isRequired,
  onItemSelect: PropTypes.func.isRequired,
};
