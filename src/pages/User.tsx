import React, { useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import ".//styles/user.css";
const User = (props: any) => {
  const username = props.username.slice(22);
  const [content, setContent] = useState();
  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:8000/api/finduser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          username,
        }),
      });
      setContent(await response.json());
      console.log(content);
    })();
  }, []);

  //use function from backend called USER to get user name, if let username == to that username, than display the user page
  //else return 404 page

  //console.log(username);
  return (
    <>
      {/* {console.log(content, username)} */}
      <Navigation current={["", "", "", "", "", ""]} />
      {content === username ? (
        <div lang="en" dir="ltr">
          <div>
            <meta charSet="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <title>Channels</title>
            <link rel="stylesheet" href="p1.css" />
          </div>
          <div id="user">{content}</div>
        </div>
      ) : (
        <img id="no_such_user" src="./no_such_user.jpg" alt="" />
      )}
    </>
  );
};

export default User;
