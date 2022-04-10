import React from "react";
import UserProfile from "../Components/UserProfile/UserProfile";
import { useContext } from "react";
import contextValue from "../store/CreateContext";

function UserProfilePage() {
  const authContext = useContext(contextValue);
  const isLoggedIn = authContext.isLoggedIn;
  return (
    <div>{isLoggedIn && <UserProfile />}
    {!isLoggedIn && <h1 style={{textAlign:"center"}}>Please Login first</h1>}
    </div>
    // <div><UserProfile/></div>
  );
}

export default UserProfilePage;
