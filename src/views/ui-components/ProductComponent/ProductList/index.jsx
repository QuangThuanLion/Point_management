import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, CardTitle, Row } from "reactstrap";
import { getAllProducts } from "../../../../apis/productApi";
import {
  PRODUCT_DEFAULT_ITEMS_ON_PAGE,
  PRODUCT_FIRST_CURRENT_VALUE_ITEM,
  PRODUCT_FIRST_DEFAULT_LIMIT_PAGE,
  PRODUCT_FIRST_INDEX_PAGE,
} from "../../../../utils/constantApi";
import ProductItemComponent from "../ProductItem";
import PaginationComponent from "./pagination";

const ProductComponent = () => {
  const [listProduct, setListProduct] = useState([]);
  const [reload, setReload] = useState(false);

  const [totalPage, setTotalPage] = useState(null);
  const [limitPage, setLimitPage] = useState(PRODUCT_FIRST_DEFAULT_LIMIT_PAGE);
  const [currentValue, setCurrentValue] = useState(
    PRODUCT_FIRST_CURRENT_VALUE_ITEM
  );
  const [indexPage, setIndexPage] = useState(PRODUCT_FIRST_INDEX_PAGE);
  const [rootTotalPage, setRootTotalpage] = useState(null);

  useEffect(() => {
    setReload(false);
    async function fetchProductList(callBack){
      const requestAPI = await getAllProducts(0);
      try {
        const response = requestAPI.data;
        if (response.success) {
          let data = response.data;
          callBack(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    async function pagination(data){
      if (data.length > 0) {
        const totalPage = Math.ceil(data.length / PRODUCT_DEFAULT_ITEMS_ON_PAGE);
        setRootTotalpage(totalPage);
        if (totalPage <= 5) {
          if (indexPage + 4 > totalPage) {
            setCurrentValue(PRODUCT_FIRST_CURRENT_VALUE_ITEM);
            setIndexPage(PRODUCT_FIRST_INDEX_PAGE);
            setTotalPage(totalPage);
          }
        } else {
          if (indexPage === 1) {
            setTotalPage(5);
          } else {
            if (indexPage + 4 > totalPage) {
              setCurrentValue((totalPage - 4) * PRODUCT_FIRST_CURRENT_VALUE_ITEM);
              setIndexPage(totalPage - 4);
              setTotalPage(totalPage);
            } else {
              setTotalPage(indexPage + 4);
            }
          }
        }
      }
      const requestAPI = await getAllProducts(limitPage);
      try {
        const response = requestAPI.data;
        if (response.success) {
          let data = response.data;
          var dataArray = data.slice(data.length - 16, data.length);
          setListProduct(dataArray);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchProductList(pagination);
  }, [reload, limitPage, indexPage]);

  return (
    <div>
      <div style={{ textAlign: "right" }}>
        <Link to="/dashboard/product-add">
          <Button
            className="btn"
            color="success"
            size="lg"
            style={{ marginBottom: "10px", minWidth: "150px" }}
          >
            ADD PRODUCT
          </Button>
        </Link>
      </div>
      <CardTitle className="bg-light border-bottom p-3 mb-0">
        <i className="mdi mdi-apps mr-2"> </i>
        PRODUCT LIST
      </CardTitle>
      <br />
      <Row>
        {listProduct.map((product, key) => (
          <ProductItemComponent
            key={key}
            product={product}
            callBack={(booleanData) => setReload(booleanData)}
          />
        ))}
      </Row>
      <PaginationComponent
        totalPage={totalPage}
        setCurrentPage={(pageData) => setLimitPage(pageData)}
        setIndexPage={(indexPage) => setIndexPage(indexPage)}
        indexPage={indexPage}
        currentValue={currentValue}
        setCurrentValue={(value) => setCurrentValue(value)}
        limitPage={limitPage}
        rootTotalPage={rootTotalPage}
      />
    </div>
  );
};

export default ProductComponent;
