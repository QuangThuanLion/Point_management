const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return re.test(email);
}

const handleValidation = (objectUser) => {
  let formIsvalid = true;
  const { name, email, password, phoneNumber, point } = objectUser;
  let error = {};
  if (!name.trim()) {
    formIsvalid = false;
    error["name"] = "User name can not be empty";
  }
  if (!validateEmail(email)) {
    formIsvalid = false;
    error["email"] = "The email must be a valid email address";
  }
  if (!email.trim()) {
    formIsvalid = false;
    error["email"] = "Email adddress can not be empty";
  }
  if (!password.trim()) {
    formIsvalid = false;
    error["password"] = "Password can not be empty";
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
  if (!point.trim()) {
    formIsvalid = false;
    error["point"] = "User point cannot be empty"
  }
  let result = [ formIsvalid, error ];
  return result;
}

export default handleValidation;