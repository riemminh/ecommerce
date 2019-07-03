import { isEmail, isEmpty, isLength, equals } from "validator";
import isEmptyType from "./is-empty";

const loginValidate = data => {
  let errors = {};

  data.email = data.email ? data.email : "";
  data.password = data.password ? data.password : "";

  if (!isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (isEmpty(data.email)) {
    errors.email = "is required filed";
  }
  if (isEmpty(data.password)) {
    errors.password = "is required filed";
  }

  return {
    errors,
    isValid: isEmptyType(errors)
  };
};

export default loginValidate;
