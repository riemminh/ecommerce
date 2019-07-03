import { isEmail, isEmpty, isLength, equals } from "validator";
import isEmptyType from "./is-empty";

const validatorRegister = data => {
  let errors = {};

  data.name = data.name ? data.name : "";
  data.email = data.email ? data.email : "";
  data.password = data.password ? data.password : "";
  data.password2 = data.password2 ? data.password2 : "";
  data.about = data.about ? data.about : "";

  if (!isLength(data.name, { min: 4 })) {
    errors.name = "Name must be between 4 characters";
  }
  if (isEmpty(data.name)) {
    errors.name = "is required filed";
  }
  if (!isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (isEmpty(data.email)) {
    errors.email = "is required filed";
  }
  if (isEmpty(data.password)) {
    errors.password = "is required filed";
  }
  if (isEmpty(data.password2)) {
    errors.password2 = "is required filed";
  }
  if (!equals(data.password, data.password2)) {
    errors.password2 = "Password must match";
  }
  if (isEmpty(data.about)) {
    errors.about = "is required filed";
  }

  return {
    errors,
    isValid: isEmptyType(errors)
  };
};

export default validatorRegister;
