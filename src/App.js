import React from 'react';
import { Recipes } from './views/Recipes';
import { RecipeView } from './views/RecipeView';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Recipes} />
          <Route path="/:id" exact component={RecipeView} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
