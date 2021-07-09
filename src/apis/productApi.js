import ProductService from "../services/productService";
import { API_ENDPOINT } from "../utils/constantApi";

const API_URL_GET_ALL_PRODUCTS = "products/find/all";
const API_URL_FIND_PRODUCT_BY_ID = "products/find";
const API_URL_UPDATE_PRODUCT_BY_ID = "products/update"
const API_URL_CREATE_PRODUCT = "products/create"
const API_URL_DELETE_PRODUCT = "products/delete"

export const getAllProducts = (limit) => {
    return ProductService.getAllProduct(`${API_ENDPOINT}/${API_URL_GET_ALL_PRODUCTS}/${limit}`);
}

export const getProductById = (id) => {
    return ProductService.getProductById(`${API_ENDPOINT}/${API_URL_FIND_PRODUCT_BY_ID}/${id}`)
}

export const postUpdateProduct = (data) => {
    return ProductService.postUpdateProductById(`${API_ENDPOINT}/${API_URL_UPDATE_PRODUCT_BY_ID}`, data)
}

export const postCreateProduct = (data) => {
    return ProductService.postCreateProdudct(`${API_ENDPOINT}/${API_URL_CREATE_PRODUCT}`, data)
}

export const getDeleteProductById = (id) => {
    return ProductService.getDeleteProduct(`${API_ENDPOINT}/${API_URL_DELETE_PRODUCT}/${id}`)
}