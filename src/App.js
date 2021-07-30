import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Cart from './Cart'
import Home from './Home'

export default function App() {
  return (
    <Router>
      <div>
       <Switch>  
          <Route path="/Cart/:teamName/:teamPicpath/:teamPic/:teamPrice/:vendor/:category" component={Cart} /> 
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
 