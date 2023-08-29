import React, { SyntheticEvent, useEffect, useRef, useState } from "react";

const LoginForm = (props: any) => {
  const refForm = useRef(null);

  let email_valid = false;
  let password_valid = false;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [message, setMessage] = useState("");

  let form_login: HTMLElement = document.getElementById("login_form");
  let email_login: HTMLElement = document.getElementById("email");
  let password_login: HTMLElement = document.getElementById("password");

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
    //setMessage(content.message);
    if (await content) {
      form_login = document.getElementById("login_form");
      email_login = document.getElementById("email");
      password_login = document.getElementById("password");

      if (email_login && password_login) {
        console.log("SUBMITTED");

        checkInputs(content.message);

        if (email_valid && password_valid) {
          console.log("Success");
          handleClick();
        }
      }
    }
  };

  // useEffect(() => {

  //   // console.log(form_login);

  // });

  function checkInputs(message: string) {
    if (message === "user not found") {
      setErrorFor(email_login, "User not found");
    } else if (message === "incorrect password") {
      setSuccessFor(email_login);
      setErrorFor(password_login, "Incorrect password");
    } else if (message === "success") {
      //setSuccessFor(email_login);
      email_valid = true;
      //setSuccessFor(password_login);
      password_valid = true;
    } else if (message === "could not login") {
      setErrorFor(email_login, "");
      setErrorFor(password_login, "Could not log in");
    } else {
      setErrorFor(email_login, "");
      setErrorFor(password_login, "empty");
    }
  }

  function setErrorFor(input: any, message: any) {
    const inputControl = input.parentElement;

    inputControl.querySelector("small").innerText = message;

    inputControl.className = "input-control error";
  }

  function setSuccessFor(input: any) {
    const inputControl = input.parentElement;

    inputControl.querySelector("small").innerText = "";

    inputControl.className = "input-control success";
  }

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
