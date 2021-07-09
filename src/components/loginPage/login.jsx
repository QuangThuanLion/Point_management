import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Button, CardText, Form, FormGroup, Input, Label } from "reactstrap";
import * as LOGING_API from "../../apis/logingApi.js";
import AuthenticationHeader from "../../services/authHeader.js";
import {
  ACCESS_TOKEN,
  ERROR_MESSAGE_RESPONSE
} from "../../utils/constantApi.js";
import { AlertShowInvalidUserName } from "../../utils/functionConstant.js";
import Styles from "./styles.js";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.body.style.backgroundColor = "#0099FF";
  });

  const onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  const submitLoginForm = (event) => {
    event.preventDefault();
    var data = {
      email: email,
      password: password,
    };
    async function loging() {
      const requestURL = LOGING_API.loging(data);
      requestURL
        .then((response) => {
          const checkUser = response.data;
          if (checkUser.success) {
            const dataReponse = checkUser.data;
            let date = new Date();
            localStorage.setItem(
              ACCESS_TOKEN,
              JSON.stringify({
                id: dataReponse.id,
                email: dataReponse.email,
                accessToken: dataReponse.accessToken,
                expiresIn: date.getTime() + dataReponse.expiresIn
              })
            );
            window.location.href = "/dashboard";
          } else {
            const message = checkUser.message;
            AlertShowInvalidUserName(message);
          }
        })
        .catch((error) => {
          console.log(error);
          console.log(ERROR_MESSAGE_RESPONSE);
        });
    }
    loging();
  };

  return (
    <div style={Styles.styleContainer}>
      {AuthenticationHeader() !== null ? <Redirect to="/dashboard" /> : null}
      <Form style={Styles.styleForm} onSubmit={submitLoginForm}>
        <CardText style={Styles.styleCardText}>Sign In</CardText>
        <FormGroup>
          <Label for="exampleEmail" style={Styles.styleLabel}>
            Email Address
          </Label>
          <Input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={onChange}
            placeholder="Enter Email"
          />
        </FormGroup>
        <FormGroup>
          <Label
            for="examplePassword"
            style={{ fontWeight: "bold", color: "#000000" }}
          >
            Password
          </Label>
          <Input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={onChange}
            placeholder="Enter Password"
          />
        </FormGroup>
        <Button block color="info" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default LoginComponent;
