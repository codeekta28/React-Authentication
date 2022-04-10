import React from "react";
import styles from "./ProfileForm.module.css";
import { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import contextValue from "../../store/CreateContext";

function ProfileForm() {
  const passRef = useRef();
  const history=useHistory();
  const authContext = useContext(contextValue);
  console.log("token", authContext.token);

  function changePasswordHandler(e) {
    e.preventDefault();
    const newPass = passRef.current.value;
    console.log("newPass", newPass);
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB51h-JX8SQ4gnACk6-kbZHA_8kfN2TkPU', {
      method: 'POST',
      body: JSON.stringify({
        idToken: authContext.token,
        password: newPass,
        returnSecureToken: false
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      // assumption: Always succeeds!


    });
history.replace("./")
  }

  return (
    <form className={styles.form} onSubmit={changePasswordHandler}>
      <div className={styles.control}>
        <label htmlFor="newPass">New Password</label>
        <input
          type="password"
          id="newPass"
          // autoComplete="on"
          minLength="7"
          ref={passRef}
        />
      </div>
      <div className={styles.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
