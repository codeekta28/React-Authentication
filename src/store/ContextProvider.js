import React, { useCallback, useEffect, useState } from "react";
import contextValue from "./CreateContext";
import { calculateRemainingTime, retriveStoredToken } from "../Helper/Helper";

let logoutTimer;
// to clear set Initerval

// user should only check local storage token for auto Logged in only when it is within the timeiterval of expiration if user was logged in 3 hours b4 then it should not see local storage token to be logged in
function ContextProvider(props) {
  const storeData = retriveStoredToken();
  // if storedData contain token ie if it satisfy the condition than only set it to initial token bcoz in other condition storedData is null according to function
  let initialToken;
  if (storeData) {
    initialToken = storeData.token;
  }
  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token;
  // this converts from truthy or falsy value to boolian true or false

  const logoutHandler=useCallback(()=> {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    // to clear the interval
   if(logoutTimer){
       clearTimeout(logoutTimer)
   }
  },[])
//   here u could think to keep logoutTimer in dependency as its value could change but it is global variable and defined outside of the rendering function so outside of the re rendering process

  function loginHandler(token, expirationTime) {
    // console.log("This is Login", token);
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);
    const remainTime = calculateRemainingTime(expirationTime);
    logoutTimer= setTimeout(logoutHandler, remainTime);
  }
  useEffect(()=>{
      if(storeData){
          logoutTimer=setTimeout(logoutHandler,storeData.timeLeft)
          console.log("time left",storeData.timeLeft);
      }

  },[storeData,logoutHandler])
//   we should define logoutHandler as it is a function used inside effect but there are chances it can get into infinite loop so better to keep it as callback so that it run just once

  const authValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <contextValue.Provider value={authValue}>
      {props.children}
    </contextValue.Provider>
  );
}

export default ContextProvider;
