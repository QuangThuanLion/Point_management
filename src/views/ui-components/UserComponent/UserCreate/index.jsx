import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { postUploadImage } from "../../../../apis/imageApi";
import { postCreateUser } from "../../../../apis/userApi";
import userDefault from "../../../../assets/images/users/userDefault.png";
import { IMAGE_URL_USER_DEAFULT } from "../../../../utils/constantApi";
import { AlertCreateSuccess, showEmailAlreadyExists } from "../../../../utils/functionConstant";
import Styles from "./styles";
import handleValidation from "./validation";

const UserAddComponent = (props) => {
  const [user, setUser] = useState({
    name: "",
    point: "",
    email: "",
    password: "",
    phoneNumber: "",
    sex: "Male",
  });
  const [upload, setUpload] = useState(null);
  const [error, setError] = useState({
    name: null,
    point: null,
    email: null,
    password: null,
    phoneNumber: null
  })

  function changeUserImage() {
    var file = document.querySelector("input[type=file]").files[0];
    var card_avatar_show = document.getElementById("card_avatar_show");
    var reader = new FileReader();
    reader.onload = function () {
      card_avatar_show.src = reader.result;
    };
    if (file) {
      reader.readAsDataURL(file);
      setUpload(file);
    } else {
      card_avatar_show.src = "";
    }
  }

  function showCardImage() {
    let xhtml = (
      <CardImg
        style={{ height: "450px", marginTop: "15%" }}
        top
        width="100%"
        src={userDefault}
        id="card_avatar_show"
      />
    );
    return xhtml;
  }

  const onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    let objectUser = {
      ...user,
      [name]: value,
    }
    if(value.trim()){
      var keys = Object.keys(error);
      for(var i = 0; i < keys.length; i++){
        if(name === keys[i]){
          const [, error ] = handleValidation(objectUser);
          setError(error);
          break;
        }
      }
    } else {
      const [, error ] = handleValidation(objectUser);
      setError(error);
    }
    setUser({
      ...user,
      [name]: value,
    });
  };

  const onSave = async (event) => {
    event.preventDefault();
    let imageChange = null;
    if (upload !== null) {
      const formData = new FormData();
      formData.append("file", upload);
      const requestAPI = await postUploadImage(formData);
      const responseAPI = requestAPI.data;
      if (responseAPI.success) {
        const { path } = responseAPI.data;
        imageChange = path;
      }
    }
    async function createUser() {
      const [ formIsvalid, error ] = handleValidation(user);
      setError(error);
      if(formIsvalid){
        var data = {
          ...user,
          imagePath: imageChange !== null ? imageChange : IMAGE_URL_USER_DEAFULT
        }
        const requestURL = await postCreateUser(data);
        try {
          const responseURL = requestURL.data;
          console.log(responseURL)
          if (responseURL.success) {
            AlertCreateSuccess();
            setTimeout(() => {
              const { history } = props;
              history.push("/dashboard/user");
            }, 1500);
          } else {
            showEmailAlreadyExists();
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    createUser();
  };

  return (
    <div>
      <CardTitle className="bg-light border-bottom p-3 mb-0">
        <i className="mdi mdi-apps mr-2"> </i>
        CREATE USER
      </CardTitle>
      <br />
      <Row>
        <Col sm="4">
          <Card style={{ minHeight: "670px" }}>
            {showCardImage()}
            <CardBody style={{ textAlign: "center" }}>
              <CardSubtitle>
                <input type="file" name="avatar" onChange={changeUserImage} />
              </CardSubtitle>
            </CardBody>
          </Card>
        </Col>
        <Col sm="8">
          <Card body style={{minHeight: "670px"}}>
            <Form style={{margin: "auto 0px"}}>
              <FormGroup>
                <Label for="name">User Name</Label>
                <span style={Styles.required}> *</span>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  onChange={onChange}
                  value={user.name}
                  placeholder="User Name"
                />
                <span style={Styles.error}>{error.name}</span>
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <span style={Styles.required}> *</span>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  onChange={onChange}
                  value={user.email}
                  placeholder="Email"
                />
                <span style={Styles.error}>{error.email}</span>
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <span style={Styles.required}> *</span>
                <Input
                  type="password"
                  name="password"
                  id="Password"
                  onChange={onChange}
                  value={user.password}
                  placeholder="Password"
                />
                <span style={Styles.error}>{error.password}</span>
              </FormGroup>
              <FormGroup>
                <Label for="phoneNumber">Phone Number</Label>
                <span style={Styles.required}> *</span>
                <Input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  onChange={onChange}
                  value={user.phoneNumber}
                  placeholder="Phone Number"
                />
                <span style={Styles.error}>{error.phoneNumber}</span>
              </FormGroup>
              <FormGroup>
                <Label for="sex">Gender</Label>
                <Input
                  type="select"
                  name="sex"
                  onChange={onChange}
                  id="exampleSelect"
                  value={user.sex}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="point">Point</Label>
                <span style={Styles.required}> *</span>
                <Input
                  type="text"
                  name="point"
                  id="point"
                  value={user.point}
                  onChange={onChange}
                  placeholder="Point"
                />
                <span style={Styles.error}>{error.point}</span>
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

export default UserAddComponent;
