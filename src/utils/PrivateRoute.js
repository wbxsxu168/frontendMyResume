import React  from "react";
import { Route, Redirect } from "react-router-dom";
import JwtAuthHandler from "./JwtAuthHandler";

export var PrivateRoute = ({ component: Component, ...rest }) => {
  console.log({ ...rest });
  console.log(rest);

  return (
    <Route
      {...rest}
      render={(props) =>
        JwtAuthHandler.isLoggedIn() ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};
