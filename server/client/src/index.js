// import "./App.css";
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { render } from "react-dom";
import Nav from "./components/Nav";
import App from './components/App';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";
import Home from './components/Home'
import Preview from './components/PreviewWOD'
import Workout from './components/WorkoutPage'
import LandingPage from "./components/LandingPage";

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

render(
  <Provider store={store}>
    <Router>
      <Fragment>
        <Nav />
        <App>
          <Switch>
           <Route exact path="/" component={LandingPage} />
           <Route exact path="/home" component={Home} />
           <Route exact path="/preview" component={Preview} />
           <Route exact path="/workout" component={Workout} />
          </Switch>
        </App>
      </Fragment>
    </Router>
  </Provider>,
  document.getElementById("root")
);