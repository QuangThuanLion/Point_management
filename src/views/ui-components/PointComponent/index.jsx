import { Select } from 'antd';
import React, { useEffect, useState } from "react";
import {
  Button,
  Card, CardImg, CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row
} from "reactstrap";
import { getProductById } from "../../../apis/productApi";
import { getAllUser, postChangeGift } from "../../../apis/userApi";
import { API_ENDPOINT, ERROR_MESSAGE_RESPONSE } from "../../../utils/constantApi";
import { changeProductToPointSuccess } from "../../../utils/functionConstant";

const PointComponent = (props) => {
  const [productImage, setproductImage] = useState(null);
  const [listUser, setListUser] = useState([]);
  const [product, setProduct] = useState({});
  const [userId, setUserId] = useState();

  useEffect(() => {
    const { match } = props;
    if (match !== null) {
      const { id } = match.params;
      async function getProduct() {
        const requestAPI = await getProductById(id);
        const responseAPI = requestAPI.data;
        if (responseAPI.success) {
          setProduct(responseAPI.data);
          const { image } = responseAPI.data;
          if (image !== null) {
            const requestImage = `${API_ENDPOINT}/${image}`;
            setproductImage(requestImage);
          }
        }
      }
      getProduct();
    }
  }, [props]);

  useEffect(() => {
    async function fetchUserList() {
      const requestAPI = await getAllUser(0);
      try {
        const response = requestAPI.data;
        if (response.success) {
          let data = response.data;
          setListUser(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserList();
  }, [props]);

  let showUserList = listUser.map((user, key) => {
    var result = [];
    if (listUser.length > 0) {
      const { name, _id } = user;
      result = (
        <Select.Option key={key} value={_id}>{name}</Select.Option>
      );
    };
    return result;
  })

  const handleOnChange = (value) => {
    setUserId(value);
  }

  const onSubmitForm = (event) => {
    event.preventDefault();
    let description = document.getElementById("description").value;
    var data = {
      id_user: userId,
      id_product: product._id,
      description
    }
    async function changeProductToPoint() {
      const requestAPI = await postChangeGift(data);
      const response = requestAPI.data;
      if (response.success) {
        changeProductToPointSuccess();
      } else {
        console.log(ERROR_MESSAGE_RESPONSE);
      }
    }
    changeProductToPoint();
  }

  return (
    <div>
      <CardTitle className="bg-light border-bottom p-3 mb-0">
        <i className="mdi mdi-apps mr-2"> </i>
        CHANGE PRODUCT TO POINT
      </CardTitle>
      <br />
      <Row>
        <Col sm="4">
          <Card style={{ minHeight: "410px" }}>
            <CardImg
              top
              width="100%"
              src={productImage}
              id="id_image_product"
              style={{ height: "410px" }}
            />
          </Card>
        </Col>
        <Col sm="8">
          <Card body style={{ minHeight: "410px" }}>
            <Form style={{ margin: "auto 0px" }} onSubmit={onSubmitForm}>
              <FormGroup>
                <Label for="title">User Name</Label>
                <Select
                  showSearch
                  style={{ width: "100%" }}
                  onChange={handleOnChange}
                  placeholder="Search To Select"
                  optionFilterProp="children"
                >
                  {showUserList}
                </Select>
              </FormGroup>
              <FormGroup>
                <Label for="description">Description</Label>
                <Input
                  type="textarea"
                  name="description"
                  id="description"
                  style={{ height: "200px" }}
                  className="hidden_detail_product"
                  placeholder="Description"
                />
              </FormGroup>
              <Button
                className="btn"
                color="success"
                size="lg"
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

export default PointComponent;
