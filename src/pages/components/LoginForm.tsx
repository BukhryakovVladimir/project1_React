import React, { SyntheticEvent, useRef, useState } from "react";

const LoginForm = (props: any) => {
  const refForm = useRef(null);

  const handleClick = () => {
    props.setshow_Login_Form(false);

    document.removeEventListener("mousedown", handleOutsideClick, false);
    document.removeEventListener("keydown", closeOnEscape, false);
    window.location.reload();
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const content = await response.json();

    console.log(content);
    handleClick();
  };

  return (
    <div id="login_form" className="pop-up">
      <form
        className="pop-up-content"
        id="form"
        onSubmit={submit}
        ref={refForm}
      >
        <button type="button" className="close" onClick={handleClick}>
          &times;
        </button>
        <div className="container">
          <div className="input-control">
            <input
              type="email"
              placeholder="Email"
              name="email"
              id="email"
              required //for now, change to something prettier later
              onChange={(e) => setEmail(e.target.value)}
            />
            <small></small>
          </div>
          &nbsp;
          <div className="input-control">
            <input
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              required //for now, change to something prettier later
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="on"
            />
            <small></small>
          </div>
          <button type="submit" id="submit_login">
            Log in
          </button>
          <label className="small_link">
            {/* <a href="#">Forgot password?</a> */}
            {/* CHANGE HREF LATER!!!!  */}
          </label>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
