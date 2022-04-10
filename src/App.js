import logo from "./logo.svg";
import { Switch, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import UserProfilePage from "./pages/UserProfilePage";
import Layout from "./Components/Layout/Layout";
import { useContext } from "react";
import contextValue from "./store/CreateContext";

function App() {
  const authContext = useContext(contextValue);
  const isLoggedIn = authContext.isLoggedIn;
  return (
    <>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/home">
            <HomePage />
          </Route>
          {!isLoggedIn && (
            <Route path="/auth">
              <AuthPage />
            </Route>
          )}
          <Route path="/user-profile">
            <UserProfilePage />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Layout>
    </>
  );
}

export default App;
