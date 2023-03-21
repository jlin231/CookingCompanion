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
import AllRecipePage from "./components/AllRecipesPage";
import AddIngredientsPage from "./components/AddIngredientsPage";
import EditDeleteIngredientsPage from "./components/EditDeleteIngredientsPage";
import FirstSplashPage from "./components/FirstSplashPage";

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
          <Route path="/recipes/explore">
            <AllRecipePage />
          </Route>
          <Route path="/recipes/:recipeId/ingredients/edit">
            <EditDeleteIngredientsPage />
          </Route>
          <Route path="/recipes/:recipeId/ingredients">
            <AddIngredientsPage />
          </Route>
          <Route path="/recipes/:recipeId/edit">
            <EditRecipePage />
          </Route>
          <Route path="/recipes/:recipeId">
            <SingleRecipePage />
          </Route>
          <Route path="/create/recipes">
            <CreateRecipePage />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/recipes">
            <SplashPage />
          </Route>
          <Route path="/">
            <FirstSplashPage />
          </Route>
        </Switch>
      )}
      
    </>
  );
}

export default App;
