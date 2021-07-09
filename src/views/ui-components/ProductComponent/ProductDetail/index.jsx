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
  Row
} from "reactstrap";
import { postUploadImage } from "../../../../apis/imageApi";
import { getProductById, postUpdateProduct } from "../../../../apis/productApi";
import { API_ENDPOINT } from "../../../../utils/constantApi";
import { AlertUpdateProductSuccess } from "../../../../utils/functionConstant";
import Styles from "./styles";
import handleValidation from "./validation";

const ProductDetailComponent = (props) => {
  const [updateProduct, setUpdateProduct] = useState(false);
  const [product, setProduct] = useState({});
  const [image, setImage] = useState("");
  const [upload, setUpload] = useState(null);
  const [error, setError] = useState({
    name: null,
    point: null,
  })

  useEffect(() => {
    const { match } = props;
    if (match !== null) {
      const id = match.params.id;
      async function getProduct() {
        const requestAPI = await getProductById(id);
        const responseAPI = requestAPI.data;
        if (responseAPI.success) {
          const { image } = responseAPI.data;
          setProduct(responseAPI.data);
          if (image !== null) {
            const requestImage = `${API_ENDPOINT}/${image}`;
            setImage(requestImage);
          }
        }
      }
      getProduct();
    }
  }, [props]);

  useEffect(() => {
    var typeInput = document.querySelectorAll(".hidden_detail_product");
    if (!updateProduct) {
      for (var i = 0; i < typeInput.length; i++) {
        typeInput[i].setAttribute("disabled", "disabled");
      }
    }
  });

  const changeStatusProductUpdate = () => {
    var typeInput = document.querySelectorAll(".hidden_detail_product");
    if (!updateProduct) {
      for (var i = 0; i < typeInput.length; i++) {
        typeInput[i].removeAttribute("disabled");
      }
    }
    setUpdateProduct(true);
  };

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

  const onChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    let objectProduct = {
      ...product,
      [name]: value,
    }
    if (value.trim()) {
      var keys = Object.keys(error);
      for (var i = 0; i < keys.length; i++) {
        if (name === keys[i]) {
          const [, error] = handleValidation(objectProduct);
          setError(error);
          break;
        }
      }
    } else {
      const [, error] = handleValidation(objectProduct);
      setError(error);
    }
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const onUpDateProduct = async (event) => {
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
    async function updateProduct() {
      const [formIsvalid, error] = handleValidation(product);
      setError(error);
      if(formIsvalid){
        let data = {
          ...product,
          id: product._id,
          imagePath: imageChange !== null ? imageChange : product.image,
        };
        const requestAPI = await postUpdateProduct(data);
        try{
            const responseAPI = requestAPI.data;
            if(responseAPI.success){
              setProduct(responseAPI.data)
              return AlertUpdateProductSuccess();
            }
        } catch(error){
          console.log(error)
        }
      }
    }
    updateProduct();
  };

  return (
    <div>
      <CardTitle className="bg-light border-bottom p-3 mb-0">
        <i className="mdi mdi-apps mr-2"> </i>
        {!updateProduct
          ? "DETAIL PRODUCT INFORMATION"
          : "UPDATE PRODUCT INFORMATION"}
      </CardTitle>
      <br />
      <Row>
        <Col sm="4">
          <Card style={{ minHeight: "410px" }}>
            <CardImg
              top
              width="100%"
              src={image}
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
                  value={product.name || ""}
                  onChange={onChange}
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
                  id="point"
                  onChange={onChange}
                  value={product.point || ""}
                  className="hidden_detail_product"
                  placeholder="Points"
                />
                <span style={Styles.error}>{error.point}</span>
              </FormGroup>
              <Button
                className="btn"
                color="success"
                size="lg"
                onClick={
                  !updateProduct ? changeStatusProductUpdate : onUpDateProduct
                }
                //onClick={changeStatusProductUpdate}
              >
                {!updateProduct ? "Edit" : "Save"}
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetailComponent;
