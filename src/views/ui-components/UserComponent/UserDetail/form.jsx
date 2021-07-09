import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardSubtitle, Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row
} from "reactstrap";
import { postUploadImage } from "../../../../apis/imageApi";
import { postUpdateUser } from "../../../../apis/userApi";
import defaultUser from "../../../../assets/images/users/userDefault.png";
import { API_ENDPOINT } from "../../../../utils/constantApi";
import { AlertUpdateSuccess } from "../../../../utils/functionConstant.js";
import handleValidation from "./validation";
import Styles from "./styles";

function FormComponent(props) {
  const { user, changeButton } = props;
  const [userForm, setUserForm] = useState({});
  const [upload, setUpload] = useState(null);
  const [imagePath, setImagePath] = useState(null);
  const [error, setError] = useState({
    name: null,
    point: null,
    phoneNumber: null
  })
  useEffect(() => {
    const { imagePath } = user;
    if (typeof imagePath === "undefined") {
      setImagePath(defaultUser);
    } else {
      const requestImage = `${API_ENDPOINT}/${imagePath}`;
      setImagePath(requestImage);
    }
    setUserForm(user);
  }, [user]);

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
    async function upateUser() {
      const [formIsvalid, error] = handleValidation(userForm);
      setError(error);
      if (formIsvalid) {
        var data = {
          ...userForm,
          id: userForm._id,
          imagePath: imageChange !== null ? imageChange : setUserForm.imagePath,
        };
        const requestURL = await postUpdateUser(data);
        try {
          const response = requestURL.data;
          if (response.success) {
            AlertUpdateSuccess();
          }
        } catch (error) {
          console.log(error);
        }
        props.callBack(false);
      }
    }
    upateUser();
  };

  function changeStatusUpdate() {
    let typeInput = document.getElementsByClassName("hidden_detail");
    for (var i = 0; i < typeInput.length; i++) {
      typeInput[i].removeAttribute("disabled");
    }
    document.getElementById("email").setAttribute("disabled", "disabled");
    props.callBack(true);
  }

  const onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    let objectUser = {
      ...userForm,
      [name]: value,
    }
    if (value.trim()) {
      var keys = Object.keys(error);
      for (var i = 0; i < keys.length; i++) {
        if (name === keys[i]) {
          const [, error] = handleValidation(objectUser);
          setError(error);
          break;
        }
      }
    } else {
      const [, error] = handleValidation(objectUser);
      setError(error);
    }
    setUserForm({
      ...userForm,
      [name]: value,
    });
  };

  function changeUserImage() {
    var file = document.querySelector("input[type=file]").files[0];
    var id_image_user = document.getElementById("id_image_user");
    var reader = new FileReader();
    reader.onload = function () {
      id_image_user.src = reader.result;
    };
    if (file) {
      reader.readAsDataURL(file);
      setUpload(file);
    } else {
      id_image_user.src = "";
    }
  }

  return (
    <Row>
      <Col sm="4">
        <Card style={{ minHeight: "547px" }}>
          <CardImg
            top
            width="100%"
            src={imagePath}
            style={{ height: "450px"}}
            id="id_image_user"
          />
          <CardBody>
            <CardSubtitle>
              <input
                type="file"
                name="userImage"
                onChange={changeUserImage}
              />
            </CardSubtitle>
          </CardBody>
        </Card>
      </Col>
      <Col sm="8">
        <Card body style={{height: "547px"}}>
          <Form style={{margin: "auto 0px"}}>
            <FormGroup>
              <Label for="username">User Name</Label>
              <span style={Styles.required}> *</span>
              <Input
                type="text"
                name="name"
                id="username"
                value={userForm.name ? userForm.name : ""}
                onChange={onChange}
                className="hidden_detail"
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
                value={userForm.email || ""}
                onChange={onChange}
                className="hidden_detail"
                placeholder="Email"
              />
            </FormGroup>
            <FormGroup>
              <Label for="phoneNumber">Phone Number</Label>
              <span style={Styles.required}> *</span>
              <Input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                value={userForm.phoneNumber || ""}
                onChange={onChange}
                className="hidden_detail"
                placeholder="Phone Number"
              />
              <span style={Styles.error}>{error.phoneNumber}</span>
            </FormGroup>
            <FormGroup>
              <Label for="sex">Gender</Label>
              <span style={Styles.required}> *</span>
              <Input
                type="select"
                name="sex"
                value={userForm.sex === "" || null ? "none" : userForm.sex}
                onChange={onChange}
                id="sex"
                className="hidden_detail"
              >
                <option vale="Male">Male</option>
                <option value="Female">Female</option>
                <option value="None">None</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="point_user">Point</Label>
              <span style={Styles.required}> *</span>
              <Input
                type="text"
                name="point"
                id="point_user"
                value={userForm.point || ""}
                onChange={onChange}
                className="hidden_detail"
                placeholder="Point"
              />
              <span style={Styles.error}>{error.point}</span>
            </FormGroup>
            <Button
              className="btn"
              color="success"
              size="lg"
              onClick={!changeButton ? changeStatusUpdate : onSave}
            >
              {!changeButton ? "Edit" : "Save"}
            </Button>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}

export default FormComponent;
