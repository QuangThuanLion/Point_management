const handleValidation = (objectUser) => {
    let formIsvalid = true;
    const { name, phoneNumber, point } = objectUser;
    let error = {};
    if (!name.trim()) {
      formIsvalid = false;
      error["name"] = "User name can not be empty";
    }
    if (!Number(phoneNumber)) {
      formIsvalid = false;
      error["phoneNumber"] = "The phone number must be a number";
    }
    if (!phoneNumber.trim()) {
      formIsvalid = false;
      error["phoneNumber"] = "Phone number can not be empty";
    }
    if (!Number(point)) {
      formIsvalid = false;
      error["point"] = "The point must be a number";
    }
    if (!point.toString().trim()) {
      formIsvalid = false;
      error["point"] = "User point cannot be empty"
    }
    let result = [formIsvalid, error];
    return result;
  }
  
  export default handleValidation;