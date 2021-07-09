import { Select } from "antd";
import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { postNotification } from "../../../apis/notificationApi";
import { getAllUser } from "../../../apis/userApi";
import {
  AlertSendNotificationFailed,
  AlertSendNotificationSuccess,
} from "../../../utils/functionConstant";
import Styles from "./styles";

const NotificationsComponent = () => {
  const [children, setChildren] = useState([]);
  let [data, setdata] = useState([]);
  const [response, setResponse] = useState({
    title: null,
    content: null,
    userList: [],
  });

  useEffect(() => {
    async function fetchUserList() {
      const requestAPI = await getAllUser(0);
      try {
        const response = requestAPI.data;
        if (response.success) {
          let data = response.data;
          setdata(data);
          showOptionUser(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserList();
  }, []);

  function showOptionUser(data) {
    const children = [];
    if (data.length > 0) {
      for (let i = 1; i < data.length; i++) {
        children.push(
          <Select.Option key={i} value={data[i].name + "," + data[i]._id}>
            {data[i].name} - {data[i].phoneNumber}
          </Select.Option>
        );
      }
    }
    children.unshift(
      <Select.Option
        key={0}
        value={0}
        style={{ fontWeight: "600" }}
      >
        SELECT ALL ( {data.length} USER )
      </Select.Option>
    );
    setChildren(children);
  }

  function handleChange(value) {
    let checkSelect = false;
    if (value.length > 0) {
      for (const index in value) {
        if (value[index].toString() === "0") {
          value.splice(0, index);
          value.splice(index + 1, value.length);
          checkSelect = true;
          break;
        }
      }
    }

    checkSelect
      ? setResponse({
        ...response,
        userList: data.map(({ _id }) => _id),
      })
      : setResponse({
        ...response,
        userList: value.map((index) => {
          return index.substr(index.indexOf(",") + 1, index.length);
        }),
      });
  }

  const onSave = () => {
    async function sendNotification() {
      const requestApi = await postNotification(response);
      try {
        const responseApi = requestApi.data;
        if (responseApi.success) {
          AlertSendNotificationSuccess();
        } else {
          AlertSendNotificationFailed();
        }
      } catch (error) {
        console.log(error);
      }
    }
    sendNotification();
  };

  return (
    <div>
      <CardTitle className="bg-light border-bottom p-3 mb-0">
        <i className="mdi mdi-apps mr-2"> </i>
        NOTIFICATIONS MANAGEMENT
      </CardTitle>
      <br />
      <Row>
        <Col>
          <Card body>
            <Form>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  onChange={(event) =>
                    setResponse({
                      ...response,
                      title: event.target.value,
                    })
                  }
                  placeholder="Title"
                />
              </FormGroup>
              <FormGroup>
                <Label for="title">User</Label>
                <Select
                  mode="multiple"
                  placeholder="Search To Select"
                  onChange={handleChange}
                  style={{ width: "100%" }}
                >
                  {children}
                </Select>
              </FormGroup>
              <FormGroup>
                <Label for="content">Content</Label>
                <Input
                  type="textarea"
                  name="content"
                  id="content"
                  onChange={(event) =>
                    setResponse({
                      ...response,
                      content: event.target.value,
                    })
                  }
                  style={Styles}
                  placeholder="Content"
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

export default NotificationsComponent;
