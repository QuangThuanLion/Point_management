import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Routers, Route, Switch } from "react-router-dom";
import "./assets/scss/style.css";
import LoginComponent from "./components/loginPage/login";
import indexRoutes from "./routes/index.jsx";
import AuthenticationHeader from "./services/authHeader";

ReactDOM.render(
  <Routers>
    <Switch>
      {indexRoutes.map((prop, key) => {
        if (AuthenticationHeader() !== null) {
          return (
            <Route path={prop.path} key={key} component={prop.component} />
          );
        }
        return <Route path="/" key="login" component={LoginComponent}/>;
      })}
    </Switch>
  </Routers>,
  document.getElementById("root")
);