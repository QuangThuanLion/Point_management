import React, { useState } from "react";
import {
    Button,
    Card,
    CardTitle,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Row
} from "reactstrap";
import { postChangePassword } from "../../../apis/userApi";
import { ACCESS_TOKEN } from "../../../utils/constantApi";
import { changePasswordSuccess, showConfirmIsNotCorrectPassword, showInvalidPassword } from "../../../utils/functionConstant";
import Styles from "./styles";

const ChangePasswordComponent = (props) => {
  const [user, setUser] = useState({
    oldPassword: "",
    id: "",
    newPassword: "",
  });

  const onSave = () => {
      const { newPassword } = user;
      let confirmPass = document.getElementById("confirmPassword").value;
      if(confirmPass !== newPassword ){
        showConfirmIsNotCorrectPassword();
      } else {
        if(localStorage.getItem(ACCESS_TOKEN)){
            const { id } = JSON.parse(localStorage.getItem(ACCESS_TOKEN));
            if(id !== null){
                const data = {
                    ...user,
                    id
                }
                async function changePassWord(){
                    const requestAPI = await postChangePassword(data);
                    const responseAPI = requestAPI.data;
                    if(responseAPI.success){
                        changePasswordSuccess();
                        setTimeout(() => {
                            const { history } = props;
                            history.push("/dashboard");
                        }, 1500);
                    } else {
                        showInvalidPassword();
                    }
                }
                changePassWord();
            }
          }
      }
  }

  return (
    <div style={Styles}>
      <CardTitle className="bg-light border-bottom p-3 mb-0">
        <i className="mdi mdi-apps mr-2"> </i>
        CHANGE PASSWORD
      </CardTitle>
      <br />
      <Row>
        <Col>
          <Card body>
            <Form>
              <FormGroup>
                <Label for="oldPassword">Old Password</Label>
                <Input
                  type="password"
                  name="oldPassword"
                  id="oldPassword"
                  value={user.oldPassword || ""}
                  onChange={(event) =>
                    setUser({
                      ...user,
                      oldPassword: event.target.value,
                    })
                  }
                  placeholder="Old Password"
                />
              </FormGroup>
              <FormGroup>
                <Label for="newPassword">New Password</Label>
                <Input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  onChange={(event) =>
                    setUser({
                      ...user,
                      newPassword: event.target.value,
                    })
                  }
                  value={user.newPassword || ""}
                  placeholder="New Passord"
                />
              </FormGroup>
              <FormGroup>
                <Label for="confirmPassword">Confirm Passowrd</Label>
                <Input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm Passord"
                />
              </FormGroup>
              <Button
                className="btn"
                color="success"
                size="lg"
                onClick={onSave}
              >
                Save
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ChangePasswordComponent;
