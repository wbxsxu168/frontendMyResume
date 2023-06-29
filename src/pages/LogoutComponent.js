import React from "react";
import { Redirect } from "react-router-dom";
import JwtAuthHandler from "../utils/JwtAuthHandler";

class LogoutComponent extends React.Component {
  render() {
    JwtAuthHandler.logoutUser();
    return <Redirect to="/" />;
  }
}
export default LogoutComponent;
