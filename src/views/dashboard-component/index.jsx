import React, { useEffect, useState } from "react";
import {
  Button, Card,
  CardBody, CardTitle, Col, Row, Table
} from "reactstrap";
import { getAllProducts } from "../../apis/productApi";
import { getRankUserPoint } from "../../apis/userApi";
import AuthenticationHeader from "../../services/authHeader";
import ProductComponent from "./product";
import UserComponent from "./user";

const DashBoardComponent = () => {

  const [listProduct, setListProduct] = useState([]);
  const [listUser, setListUser] = useState([]);

  useEffect(() => {
    if(AuthenticationHeader()){
    }
  })

  useEffect(() => {
    async function fetchListUser() {
      const requestAPI = await getRankUserPoint(5);
      const response = requestAPI.data;
      if (response.success) {
        setListUser(response.data);
      }
    }
    async function fetchListProduct() {
      const requestAPI = await getAllProducts(0);
      const response = requestAPI.data;
      if (response.success) {
        const { data } = response;
        var arrayProduct = data.slice(data.length - 6, data.length);
        setListProduct(arrayProduct.reverse());
      }
    }
    fetchListUser();
    fetchListProduct();
  }, [])

  return (
    <div>
      <Button
        className="btn"
        color="success"
        size="lg"
        style={{ fontSize: "18px", fontWeight: "bold" }}
      >
        WELLCOME TO ADMINISTRATOR
      </Button>
      <br />
      <br />
      <Row>
        <Col sm={12}>
          <Card>
            <CardBody>
              <div className="d-flex align-items-center">
                <div>
                  <CardTitle style={{fontWeight: "bold"}}>Top 5 User With The Highest Score</CardTitle>
                </div>
              </div>
              <Table className="no-wrap v-middle" responsive>
                <thead>
                  <tr className="border-0">
                    <th className="border-0">User Name</th>
                    <th className="border-0">Email</th>
                    <th className="border-0">Phone Number</th>
                    <th className="border-0">Gender</th>
                    <th className="border-0">Point</th>
                  </tr>
                </thead>
                <tbody>
                {listUser.map((user, key) => (
                  <UserComponent key={key} user={user}/>
                ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <CardTitle className="bg-light border-bottom p-3 mb-0" >
        <i className="mdi mdi-apps mr-2"> </i>
        NEW PRODUCT
      </CardTitle>
      <br />
      <Row>
        {listProduct.map((product, key) => (
          <ProductComponent key={key} product={product}/>
        ))}
      </Row>
    </div>
  );
};

export default DashBoardComponent;
