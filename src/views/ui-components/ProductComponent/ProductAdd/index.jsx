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
import { postUploadImage } from "../../../../apis/imageApi";
import { postCreateProduct } from "../../../../apis/productApi";
import productDefault from "../../../../assets/images/big/productDefault.png";
import { IMAGE_URL_PRODUCT_DEFAULT } from "../../../../utils/constantApi";
import { AlertCreateProductSuccess } from "../../../../utils/functionConstant";
import Styles from "./styles";
import handleValidation from "./validation";

const ProductAddComponent = (props) => {
  const [product, setProduct] = useState({
    name: "",
    point: "",
  });
  const [upload, setUpload] = useState(null);
  const [error, setError] = useState({
    name: null,
    point: null,
  })

  function changeProductImage() {
    var file = document.querySelector("input[type=file]").files[0];
    var id_image_product = document.getElementById("id_image_product");
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

  useEffect(() => {
    async function validation() {
      const [, error] = handleValidation(product);
      setError(error);
    }
    validation();
  }, [product])

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
    async function createProduct() {
      const [formIsvalid, error] = handleValidation(product);
      setError(error);
      if (formIsvalid) {
        let data = {
          ...product,
          id: product._id,
          imagePath: imageChange !== null ? imageChange : IMAGE_URL_PRODUCT_DEFAULT,
        };
        const requestAPI = await postCreateProduct(data);
        try {
          const responseAPI = requestAPI.data;
          if (responseAPI.success) {
            AlertCreateProductSuccess();
            setTimeout(() => {
              const { history } = props;
              history.push("/dashboard/product");
            }, 1500);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    createProduct();
  };

  return (
    <div>
      <CardTitle className="bg-light border-bottom p-3 mb-0">
        <i className="mdi mdi-apps mr-2"> </i>
        ADD PRODUCT INFORMATION
      </CardTitle>
      <br />
      <Row>
        <Col sm="4">
          <Card style={{ minHeight: "410px" }}>
            <CardImg
              top
              width="100%"
              src={productDefault}
              id="id_image_product"
              style={{ height: "340px" }}
            />
            <CardBody>
              <CardSubtitle>
                <input
                  type="file"
                  name="productImage"
                  onChange={changeProductImage}
                />
              </CardSubtitle>
            </CardBody>
          </Card>
        </Col>
        <Col sm="8">
          <Card body style={{ minHeight: "410px" }}>
            <Form style={{ margin: "auto 0px" }}>
              <FormGroup>
                <Label for="name">Product Name</Label>
                <span style={Styles.required}> *</span>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  onChange={(event) =>
                    setProduct({
                      ...product,
                      name: event.target.value,
                    })
                  }
                  className="hidden_detail_product"
                  placeholder="Product Name"
                />
                <span style={Styles.error}>{error.name}</span>
              </FormGroup>
              <FormGroup>
                <Label for="point">Points</Label>
                <span style={Styles.required}> *</span>
                <Input
                  type="number"
                  name="point"
                  id="points_product"
                  onChange={(event) =>
                    setProduct({
                      ...product,
                      point: event.target.value,
                    })
                  }
                  className="hidden_detail_product"
                  placeholder="Points"
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

export default ProductAddComponent;
