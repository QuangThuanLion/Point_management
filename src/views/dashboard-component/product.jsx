import React from 'react';
import { Card, CardBody, CardImg, CardSubtitle, CardTitle, Col } from 'reactstrap';
import { API_ENDPOINT } from '../../utils/constantApi';

function ProductComponent(props) {
    const { product } = props;
    const imagepath = `${API_ENDPOINT}/${product.image}`;

    return (
        <Col xs="12" md="4">
            {/*--------------------------------------------------------------------------------*/}
            {/*Card-1*/}
            {/*--------------------------------------------------------------------------------*/}
            <Card>
                <CardImg top width="100%" src={imagepath} style={{ height: "340px" }}/>
                <CardBody>
                    <CardTitle>Product Name: {product.name}</CardTitle>
                    <CardSubtitle>Point: {product.point}</CardSubtitle>
                </CardBody>
            </Card>
        </Col>
    );
}

export default ProductComponent;