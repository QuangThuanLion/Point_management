import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Col
} from "reactstrap";
import Swal from "sweetalert2";
import { API_ENDPOINT } from "../../../../utils/constantApi";
import { getDeleteProductById } from "../../../../apis/productApi";
import { AlertDeleteProductSuccess, AlertDeleteProductFailed } from "../../../../utils/functionConstant";
import Styles from "./styles";

function ProductItemComponent(props) {
  const { product } = props;
  const image = `${API_ENDPOINT}/${product.image}`;

  const showMessageBeforeDeleteProduct = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#28a745  ",
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Yes, Delete It!",
    }).then((result) => {
      if (result.isConfirmed) {
        async function deleteProductById() {
          const { _id } = product;
          const requestAPI = await getDeleteProductById(_id);
          const response = requestAPI.data;
          if (response.success) {
            AlertDeleteProductSuccess();
            props.callBack(true);
          } else {
            AlertDeleteProductFailed();
          }
        }
        deleteProductById();
      }
    });
  };

  return (
    <Col xs="12" md="3">
      <Card>
        <CardImg top width="100%" src={image} style={{ height: "300px" }} />
        <CardBody>
          <CardTitle>Product Name: {product.name}</CardTitle>
          <CardSubtitle>Point: {product.point}</CardSubtitle>
          <CardText style={Styles.styleCartText}>
            <Link to={`/dashboard/product-detail/${product._id}`}>
              <Button className="btn" color="secondary" style={Styles.styleButton}>
                Detail
              </Button>
            </Link>
            <Link to={`/dashboard/product-update/${product._id}`}>
              <Button className="btn" color="primary" style={Styles.styleButton}>
                Update
              </Button>
            </Link>
            <Button
              className="btn"
              color="warning"
              style={Styles.styleButton}
              onClick={showMessageBeforeDeleteProduct}
            >
              Delete
            </Button>
            <Link to={`/dashboard/changeGift/${product._id}`}>
              <Button
                className="btn"
                color="success"
                style={Styles.styleButton}
              >
                Point
              </Button>
            </Link>
          </CardText>
        </CardBody>
      </Card>
    </Col>
  );
}

export default ProductItemComponent;
