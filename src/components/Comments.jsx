import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
export default function Comments({ props }) {
  const [user, setUser] = useState([]);
  useEffect(() => {
    axios
      .get(`https://api.hnpwa.com/v0/item/${props}.json`)
      .then((response) => {
        setUser(response.data.comments);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [props]);
  console.log(user);
  return (
    <>
      <ol>
        {user.map((item) => (
          <li key={item.id}>
            <span className="usname">{item.user}</span> {item.content}
          </li>
        ))}
      </ol>
    </>
  );
}

Comments.propTypes = {
  props: PropTypes.number.isRequired,
};
