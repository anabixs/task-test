import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
export default function Comments({ props }) {
  const [user, setUser] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    axios
      .get(`https://api.hnpwa.com/v0/item/${props}.json`)
      .then((response) => {
        setUser(response.data.comments);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [props]);
  console.log(user);
  const renderOtherComments = (comments) => {
    if (!comments || comments.length === 0) {
      return null;
    }

    return (
      <ul>
        {comments.map((item) => (
          <li key={item.id}>
            <span className="usname">{item.user}</span> {item.content}
            <span className="podcomment">
              {renderOtherComments(item.comments)}
            </span>
          </li>
        ))}
      </ul>
    );
  };
  return (
    <>
      <ol>
        {!isLoaded && <p>Loading...</p>}
        {isLoaded && user <= 0 ? (
          <h2>No comments</h2>
        ) : (
          user.map((item) => (
            <li key={item.id}>
              <span className="usname">{item.user}</span> {item.content}
              <span className="podcomment">
                {renderOtherComments(item.comments)}
              </span>
            </li>
          ))
        )}
      </ol>
    </>
  );
}

Comments.propTypes = {
  props: PropTypes.number.isRequired,
};
