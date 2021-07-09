import React, { useEffect, useState } from "react";
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
import { getUserById, postUpdateUser } from "../../../../apis/userApi";
import {
  API_ENDPOINT,
  ERROR_MESSAGE_RESPONSE,
} from "../../../../utils/constantApi";
import { AlertUpdateSuccess } from "../../../../utils/functionConstant";
import defaultUser from "../../../../assets/images/users/userDefault.png";
import { postUploadImage } from "../../../../apis/imageApi";
import Styles from "./styles";
import handleValidation from "./validation";

const UserUpdateComponent = (props) => {
  const [user, setUser] = useState({});
  const [upload, setUpload] = useState(null);
  const [imagePath, setImagePath] = useState(null);
  const [error, setError] = useState({
    name: null,
    point: null,
    phoneNumber: null
  })

  useEffect(() => {
    const { match } = props;
    if (match !== null) {
      var id = match.params.id;
      async function findUserById() {
        const requestURL = await getUserById(id);
        const response = requestURL.data;
        if (response.success) {
          const data = response.data;
          const { imagePath } = data;
          if (typeof imagePath === "undefined") {
            setImagePath(defaultUser);
          } else {
            const requestImage = `${API_ENDPOINT}/${imagePath}`;
            setImagePath(requestImage);
          }
          setUser(data);
        }
      }
      findUserById();
      document.getElementById("email").setAttribute("disabled", "disabled");
    }
  }, [props]);

  const onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    let objectUser = {
      ...user,
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
    setUser({
      ...user,
      [name]: value,
    });
  };

  const onUpdate = async (event) => {
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
    function updateUserById() {
      return new Promise(function (resolve, reject) {
        const [formIsvalid, error] = handleValidation(user);
        setError(error);
        if(formIsvalid){
          var data = {
            ...user,
            id: user._id,
            imagePath: imageChange !== null ? imageChange : user.imagePath,
          };
          const requestURL = postUpdateUser(data);
          requestURL.then(function (response) {
            const result = response.data;
            if (result.success) {
              resolve(result);
            } else {
              reject(ERROR_MESSAGE_RESPONSE);
            }
          });
        }
      });
    }
    updateUserById()
      .then((response) => {
        setUser(response.data);
        AlertUpdateSuccess();
      })
      .catch((reject) => {
        console.log({ reject });
      });
  };

  function changeUserImage() {
    var file = document.querySelector("input[type=file]").files[0];
    var id_image_product = document.getElementById("id_image_user");
    var reader = new FileReader();
    reader.onload = function () {
      id_image_product.src = reader.result;
    };
    if (file) {
      reader.readAsDataURL(file);
      setUpload(file);
    } else {
      id_image_product.src = "";
    }
  }

  return (
    <div>
      <CardTitle className="bg-light border-bottom p-3 mb-0">
        <i className="mdi mdi-apps mr-2"> </i>
        UPDATE USER INFORMATION
      </CardTitle>
      <br />
      <Row>
        <Col sm="4">
          <Card style={{ minHeight: "547px" }}>
            <CardImg
              top
              width="100%"
              src={imagePath}
              style={{ height: "450px" }}
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
                <Label for="name">User Name</Label>
                <span style={Styles.required}> *</span>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  onChange={onChange}
                  value={user.name || ""}
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
                  value={user.email || ""}
                  placeholder="Email"
                />
              </FormGroup>
              <FormGroup>
                <Label for="phoneNumber">Phone Number</Label>
                <span style={Styles.required}> *</span>
                <Input
                  type="number"
                  name="phoneNumber"
                  id="phoneNumber"
                  onChange={onChange}
                  value={user.phoneNumber || ""}
                  placeholder="Phone Number"
                />
                <span style={Styles.error}>{error.phoneNumber}</span>
              </FormGroup>
              <FormGroup>
                <Label for="exampleSelesexct">Gender</Label>
                <span style={Styles.required}> *</span>
                <Input
                  type="select"
                  name="sex"
                  id="sex"
                  value={user.sex}
                  onChange={onChange}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="None">None</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="point">Point</Label>
                <span style={Styles.required}> *</span>
                <Input
                  type="number"
                  name="point"
                  id="point"
                  onChange={onChange}
                  value={user.point || ""}
                  placeholder="Point"
                />
                <span style={Styles.error}>{error.point}</span>
              </FormGroup>
              <Button
                className="btn"
                color="success"
                size="lg"
                type="submit"
                onClick={onUpdate}
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

export default UserUpdateComponent;
