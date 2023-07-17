//change Username, change Password, change User image for now, need to change email later, but email
//verification is not introtuced yet
import React, { useState } from "react";
import { encode as base64_encode } from "base-64";
import Navigation from "./components/Navigation";
import ".//styles/UserSettings.css";

const UserSettings = () => {
  //const [userimg, SetUserimg] = useState();
  var userimg: any;
  const onFileChange = async (e: any) => {
    const file = e.target.files[0];

    const readFileDataAsBase64 = (file: File) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
          resolve(event.target.result);
        };

        reader.onerror = (err) => {
          reject(err);
        };

        reader.readAsDataURL(file);
      });
    };

    userimg = await readFileDataAsBase64(file);
    console.log(userimg);
  };

  const onFileUpload = async (e: React.SyntheticEvent) => {
    const response = await fetch("http://localhost:8000/api/changeuserimg", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        userimg,
      }),
    });

    const content = await response.json();

    console.log(content);
  };

  return (
    <>
      <Navigation current={["", "", "", "", "", ""]} />
      <div className="User_settings">
        <div id="Change_userimg">
          Change User image
          <input type="file" id="fileChoose" onChange={onFileChange} />
          <button id="fileUpload" onClick={onFileUpload}>
            Upload
          </button>
        </div>
        {/* <div>Change email</div> */}
        <div id="Change_username">Change Username</div>
        <div id="Change_password">Change Password</div>
        <div id="Confirm_password">Confirm Password</div>
      </div>
    </>
  );
};

export default UserSettings;
