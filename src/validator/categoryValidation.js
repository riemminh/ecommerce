import { isEmpty, isLength } from "validator";
import isEmptyType from "./is-empty";

const categoryValidate = data => {
  let errors = {};
  data.name = data.name ? data.name : "";
  if (!isLength(data.name, { min: 3 })) {
    errors.name = "Name must be between 3 characters";
  }
  if (isEmpty(data.name)) {
    errors.name = "is required filed";
  }

  return {
    errors,
    isValid: isEmptyType(errors)
  };
};

export default categoryValidate;
