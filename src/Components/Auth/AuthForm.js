import axios from "axios";
import React, { useRef, useState } from "react";
import Loader from "../UI/Loader";
import styles from "./AuthForm.module.css";
import { useContext } from "react";
import contextValue from "../../store/CreateContext";
import { useHistory } from "react-router-dom";

function AuthForm() {
  const history=useHistory();
  const authContext = useContext(contextValue);
  // states
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const [authStatus, setAuthStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const heading = isLogin ? "Login" : "Sign Up";
  const firstBtnText = isLogin ? "Login" : "Create An Account";
  const secondBtnText = isLogin
    ? "Create New Account"
    : "Login With Existing account";
  const emailRef = useRef();
  const passRef = useRef();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  function formSubmitHandler(e) {
    e.preventDefault();
    const emailData = emailRef.current.value;
    const passData = passRef.current.value;
    setLoading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB51h-JX8SQ4gnACk6-kbZHA_8kfN2TkPU";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB51h-JX8SQ4gnACk6-kbZHA_8kfN2TkPU";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: emailData,
        password: passData,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errrorMessage = "Authentication Failed";
            if (data && data.error && data.error.message) {
              errrorMessage = data.error.message;
            }
            throw new Error(errrorMessage);
          });
        }
      })
      .then((data) => {
        // we are doing this for automatic logout
        const expireLoginTime=data.expiresIn;
        const expireLoginTimeMilliseconds=+expireLoginTime*1000;
        // adding expire time to current time
        const dateObjExpTime=new Date(new Date().getTime()+expireLoginTimeMilliseconds)
        // console.log("dateObj",dateObjExpTime);
        authContext.login(data.idToken,dateObjExpTime.toISOString());
        history.replace("./")
        
      })
      .catch((error) => {
        // console.log("throw error", error.message);
        setError(error.message);
      });
  }

  return (
    <section className={styles.auth}>
      <h1>{heading}</h1>
      {/* {authStatus && <h1>{authStatus}</h1>} */}
      {error && <h3 className={styles.error}>{error}</h3>}
      <form onSubmit={formSubmitHandler}>
        <div className={styles.control}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" ref={emailRef} required />
        </div>
        <div className={styles.control}>
          <label htmlFor="pass">Password</label>
          <input
            type="password"
            name="password"
            id="pass"
            ref={passRef}
            autoComplete="on"
            required
          />
        </div>
        <div className={styles.actions}>
          <button>{firstBtnText}</button>
          {/* if not loading than show button */}
          {!loading && (
            <button
              type="button"
              className={styles.toggle}
              onClick={switchAuthModeHandler}
            >
              {secondBtnText}
            </button>
          )}
          {loading && <p>Sending Request....</p>}
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
// console.log("email,pass",emailData,passData);
// try {
//   const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=
// AIzaSyB51h-JX8SQ4gnACk6-kbZHA_8kfN2TkPU`;
//  const response=await axios.post(url,{
//    method:"POST",
//    body:JSON.stringify({
//      email:emailData,
//      password:passData,
//      returnSecureToken:true,
//    }),
//    header:{
//      'Content-Type':'application/json'
//    }
//  })
// }catch (error) {
//   console.log("error",error.message);
// }

// Fetch api

// if (isLogin) {
// } else {
//   fetch(
//     "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB51h-JX8SQ4gnACk6-kbZHA_8kfN2TkPU",
//     {
//       method: "POST",
//       body: JSON.stringify({
//         email: emailData,
//         password: passData,
//         returnSecureToken: true,
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   ).then((res) => {
//     setTimeout(() => {
//       setLoading(false);
//       emailRef.current.value = "";
//       passRef.current.value = "";
//     }, 2000);
//     if (res.ok) {

//     } else {
//       return res.json().then((data) => {
//         // show an error modal
//         setError(data.error.message);
//         setTimeout(() => {
//           setError(null);
//           setLoading(false);
//         }, 3000);
//       });
//     }
//   });
