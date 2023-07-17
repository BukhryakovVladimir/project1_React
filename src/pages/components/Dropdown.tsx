import React, { useRef } from "react";
import "../styles/dropdown.css";
import { Link } from "react-router-dom";

const Dropdown = (props: any) => {
  const refForm = useRef(null);

  const handleClick = () => {
    props.setshow_Dropdown();

    document.removeEventListener("mousedown", handleOutsideClick, false);
    document.removeEventListener("keydown", closeOnEscape, false);
  };

  const handleOutsideClick = (e: any) => {
    if (!refForm.current.contains(e.target)) {
      handleClick();
    }
  };

  const closeOnEscape = (e: any) => {
    if (e.key === "Escape") {
      handleClick();
    }
  };

  document.addEventListener("mousedown", handleOutsideClick, false);
  document.addEventListener("keydown", closeOnEscape, false);

  const logout = async () => {
    await fetch("http://localhost:8000/api/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
  };

  return (
    <div id="login_form" className="dropdown_pop-up">
      <div className="dropdown_pop-up-content" id="form" ref={refForm}>
        <div className="dropdown_container">
          <button id="dropdown_username">{props.username}</button>
          <Link id="dropdown_UserSettings" to="/User_Settings">
            User settings
          </Link>
          <button
            id="dropdown_logout"
            onClick={() => {
              logout();
              handleClick();
              window.location.reload();
            }}
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
