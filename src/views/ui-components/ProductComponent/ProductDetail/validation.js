const handleValidation = (objectProduct) => {
    let formIsvalid = true;
    const { name, point } = objectProduct;
    let error = {};
    if (!name.trim()) {
      formIsvalid = false;
      error["name"] = "Product name can not be empty";
    }
    if (!Number(point)) {
      formIsvalid = false;
      error["point"] = "The point must be a number";
    }
    if (!point.toString().trim()) {
      formIsvalid = false;
      error["point"] = "Product point cannot be empty"
    }
    let result = [formIsvalid, error];
    return result;
  }
  
  export default handleValidation;