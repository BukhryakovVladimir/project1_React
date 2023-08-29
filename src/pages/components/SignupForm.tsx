import React, { SyntheticEvent, useEffect, useRef, useState } from "react";

const SignupForm = (props: any) => {
  const refForm = useRef(null);

  const [username, setUsername] = useState(""); //chagne later so that useffect called less often
  const [email, setEmail] = useState(""); // this too
  const [password, setPassword] = useState("");

  const [usernameExists, setUsernameExists] = useState();
  const [emailExists, setEmailExists] = useState();

  let email_valid = false;
  let username_valid = false;
  let password_valid = false;

  let form_sign_up: HTMLElement = null;
  let username_sign_up: HTMLElement = null;
  let email_sign_up: HTMLElement = null;
  let password_sign_up: HTMLElement = null;

  let usernameValue: string = "";
  let emailValue: string = "";
  let passwordValue: string = "";

  const handleClick_valid = () => {
    if (username_valid && email_valid && password_valid) {
      props.setshow_Sign_up_Form(false);

      document.removeEventListener("mousedown", handleOutsideClick, false);
      document.removeEventListener("keydown", closeOnEscape, false);
    }
  };

  const handleClick_escape = () => {
    props.setshow_Sign_up_Form(false);

    document.removeEventListener("mousedown", handleOutsideClick, false);
    document.removeEventListener("keydown", closeOnEscape, false);
  };

  const handleOutsideClick = (e: any) => {
    if (!refForm.current.contains(e.target)) {
      handleClick_escape();
    }
  };

  const closeOnEscape = (e: any) => {
    if (e.key === "Escape") {
      handleClick_escape();
    }
  };

  useEffect(() => {
    form_sign_up = document.querySelector("#sign_up_form");
    username_sign_up = document.querySelector("#username_sign_up");
    email_sign_up = document.querySelector("#email_sign_up");
    password_sign_up = document.querySelector("#password_sign_up");

    // console.log(form_sign_up);
    // console.log(email_sign_up);
    // console.log(username_sign_up);
    // console.log(password_sign_up);

    if (username_sign_up || email_sign_up || password_sign_up) {
      form_sign_up.addEventListener("submit", (e) => {
        e.preventDefault();

        usernameValue = (username_sign_up as HTMLInputElement).value.trim();
        emailValue = (email_sign_up as HTMLInputElement).value.trim();
        passwordValue = (password_sign_up as HTMLInputElement).value.trim();

        checkInputs();

        if (email_valid && username_valid && password_valid)
          HTMLFormElement.prototype.submit.call(form_sign_up);
      });
    }
  });

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
      setUsernameExists(await response.json());
      // console.log(
      //   JSON.stringify({
      //     username,
      //   })
      // );
    })();
  }, [username]);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:8000/api/findemail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email,
        }),
      });
      setEmailExists(await response.json());
      // console.log(
      //   JSON.stringify({
      //     email,
      //   })
      // );
    })();
  }, [email]);

  function checkInputs() {
    // console.log(usernameExists);
    // console.log(emailExists);
    // console.log(passwordValue);

    if (emailValue.length <= 255) {
      if (emailValue === "") {
        setErrorFor(email_sign_up, "Email can't be empty");
        email_valid = false;
      } else if (!isEmail(emailValue)) {
        setErrorFor(email_sign_up, "Email is invalid");
        email_valid = false;
      } else {
        if (emailValue === emailExists) {
          setErrorFor(email_sign_up, "Email already taken");
          email_valid = false;
        } else {
          setSuccessFor(email_sign_up);
          email_valid = true;
        }
      }
    } else {
      setErrorFor(email_sign_up, "Email is too long");
      email_valid = false;
    }

    //should rewrite using switch(usernameValue) or other way because it looks awful now
    if (usernameValue.length >= 3 && usernameValue.length <= 30) {
      if (/^[A-Za-z0-9_]*$/.test(usernameValue)) {
        if (usernameValue === usernameExists) {
          setErrorFor(username_sign_up, "Username already taken");
          username_valid = false;
        } else {
          setSuccessFor(username_sign_up);
          username_valid = true;
        }
      } else {
        setErrorFor(
          username_sign_up,
          "Only letters, numbers and _ are allowed"
        );
        username_valid = false;
      }
    } else {
      setErrorFor(
        username_sign_up,
        "Username must be between 3 and 30 characters"
      );
      username_valid = false;
    }

    if (passwordValue.length >= 8) {
      if (
        /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]*$/.test(passwordValue)
      ) {
        setSuccessFor(password_sign_up);
        password_valid = true;
      } else {
        setErrorFor(
          password_sign_up,
          "Password must contain letters and numbers(special characters !@#$%^&* are allowed)"
        );
        password_valid = false;
      }
    } else {
      setErrorFor(password_sign_up, "Password must be at least 8 characters");
      password_valid = false;
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

  function isEmail(email: any) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  }

  document.addEventListener("mousedown", handleOutsideClick, false);
  document.addEventListener("keydown", closeOnEscape, false);

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
    handleClick_valid();
  };

  return (
    <div id="sign_up_form" className="pop-up">
      <form
        // action="/"
        // method="POST"
        id="form_sign_up"
        className="pop-up-content"
        noValidate //did this later
        onSubmit={submit}
        ref={refForm}
      >
        <button type="button" className="close" onClick={handleClick_escape}>
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
              //required //for now, change to something prettier later
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
              autoComplete="email"
              //required //for now, change to something prettier later
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
              autoComplete="password"
              //required //for now, change to something prettier later
              onChange={(e) => setPassword(e.target.value)}
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
