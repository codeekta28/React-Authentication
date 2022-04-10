import React from "react";
import { Link } from "react-router-dom";
import styles from "./MainNavigation.module.css";
import { useContext } from "react";
import contextValue from "../../store/CreateContext";
import { useHistory } from "react-router-dom";

function MainNavigation() {
  const history=useHistory()
  const authContext = useContext(contextValue);
  const isLoggedIn = authContext.isLoggedIn;
function logoutHandler(){
  authContext.logout()
  history.replace("/auth")

}

  return (
    <header className={styles.header}>
      <Link to="/">
        <div className={styles.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/user-profile">profile</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
