import './App.css';
import React, { useEffect, useState } from 'react';
import Start from "./components/Start/Start";
import BetGround from "./components/BetGround/BetGround";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("users"))) {
      dispatch({ type: "SET_USERS", payload: JSON.parse(localStorage.getItem("users")) })
    }
    else {
      fetch("https://s3-ap-southeast-1.amazonaws.com/he-public-data/bets7747a43.json")
        .then(response => { return response.json() })
        .then((data) => {
          data.forEach(element => {
            element["Win"] = "0";
            element["Loss"] = "0";
            element["Selected"] = false;
          });
          dispatch({ type: "FETCH_DATA", payload: data })
        })
        .catch(e => {
          console.log(e);
        })
    }
  }, [])
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Start />
          </Route>
          <Route extact path="/betGround">
            <BetGround />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
