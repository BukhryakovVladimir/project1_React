import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Dropdown from "./Dropdown";
import "../styles/p1.css";

const Navigation = (props: any) => {
  const [show_Login_Form, setshow_Login_Form] = useState(false);
  const [show_Sign_up_Form, setshow_Sign_up_Form] = useState(false);
  const [show_Dropdown, setshow_Dropdown] = useState(false);
  const [username, setUsername] = useState("");

  console.log(username); // remove later
  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:8000/api/user", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const content = await response.json();

      setUsername(content.username);
    })();
  });

  return (
    <div lang="en" dir="ltr">
      <div>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Channels</title>
        <link rel="stylesheet" href="p1.css" />
      </div>

      <div>
        <div className="divHeader">
          <table cellSpacing="0" cellPadding="0" id="header">
            <tbody>
              <tr>
                <td id="logo_td">
                  <img id="logo" src="./corona_logo.png" alt="" />
                </td>
                <td id="channel">
                  <Link to="/Channels" className={props.current[0]}>
                    Channels
                  </Link>
                </td>
                <td id="game">
                  <Link to="/Games" className={props.current[1]}>
                    Games
                  </Link>
                </td>
                <td id="follow">
                  <Link to="/Followed" className={props.current[2]}>
                    Followed
                  </Link>
                </td>
                <td id="clip">
                  <Link to="/Clips" className={props.current[3]}>
                    Clips
                  </Link>
                </td>
                <td id="video">
                  <Link to="/Videos" className={props.current[4]}>
                    Videos
                  </Link>
                </td>
                <td id="more">
                  <Link to="/More" className={props.current[5]}>
                    More
                  </Link>
                </td>
                {username === "" || typeof username === "undefined" ? (
                  <>
                    <td id="login">
                      <button
                        onClick={() => setshow_Login_Form(!show_Login_Form)}
                      >
                        Log in
                      </button>
                    </td>
                    <td id="sign_up">
                      <button
                        onClick={() => setshow_Sign_up_Form(!show_Sign_up_Form)}
                      >
                        Sign up
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td id="dropdown">
                      {/* <Link
                        to={window.location.pathname}
                        onClick={() => {
                          logout();
                          window.location.reload();
                        }}
                      > */}
                      <button
                        id="dropdown_button"
                        onClick={() => setshow_Dropdown(!show_Dropdown)}
                      >
                        <img
                          id="userimage"
                          src="./default_userimage.png"
                          alt=""
                        />
                      </button>
                      {/* </Link> */}
                    </td>
                  </>
                )}
              </tr>
            </tbody>
          </table>
        </div>

        {show_Login_Form ? (
          <LoginForm setshow_Login_Form={setshow_Login_Form} />
        ) : null}
        {show_Sign_up_Form ? (
          <SignupForm setshow_Sign_up_Form={setshow_Sign_up_Form} />
        ) : null}
        {show_Dropdown ? (
          <Dropdown username={username} setshow_Dropdown={setshow_Dropdown} />
        ) : null}
      </div>
    </div>
  );
};

export default Navigation;
