import React, { SyntheticEvent, useRef, useState } from "react";

const SignupForm = (props: any) => {
  const refForm = useRef(null);

  const handleClick = () => {
    props.setshow_Sign_up_Form();

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

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const content = await response.json();

    console.log(content);
    handleClick();
  };

  return (
    <div id="sign_up_form" className="pop-up">
      <form
        // action="/"
        // method="POST"
        id="form_sign_up"
        className="pop-up-content"
        // later do this: noValidate
        onSubmit={submit}
        ref={refForm}
      >
        <button type="button" className="close" onClick={handleClick}>
          &times;
        </button>
        <div className="container">
          <div className="input-control">
            <input
              type="text"
              placeholder="Username"
              name="username"
              id="username_sign_up"
              onChange={(e) => setUsername(e.target.value)}
              required //for now, change to something prettier later
            />
            <small></small>
          </div>
          &nbsp;
          <div className="input-control">
            <input
              type="email"
              placeholder="Email"
              name="email"
              id="email_sign_up"
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
              id="password_sign_up"
              required //for now, change to something prettier later
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="on"
            />
            <small></small>
          </div>
          <button type="submit" id="submit_sign_up">
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
