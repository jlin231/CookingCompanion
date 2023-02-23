import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import SplashPage from "./components/SplashPage";
import SingleRecipePage from "./components/SingleRecipePage";
import CreateRecipePage from "./components/CreateRecipePage";
import EditRecipePage from "./components/EditRecipePage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/create/recipes">
            <CreateRecipePage />
          </Route>
          <Route path="/recipes/:recipeId/edit">
            <EditRecipePage />
          </Route>
          <Route path="/recipes/:recipeId">
            <SingleRecipePage />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/">
            <SplashPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
