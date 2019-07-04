import { isEmpty, isLength } from "validator";
import isEmptyType from "./is-empty";

const productValidate = data => {
  let errors = {};

  data.name = data.name ? data.name : "";
  data.description = data.description ? data.description : "";
  data.price = data.price ? data.price : "";
  data.category = data.category ? data.category : "";

  if (!isLength(data.name, { min: 4 })) {
    errors.name = "Name must be between 4 characters";
  }
  if (isEmpty(data.name)) {
    errors.name = "is required filed";
  }
  if (isEmpty(data.description)) {
    errors.description = "is required filed";
  }
  if (isEmpty(data.category)) {
    errors.category = "is required filed";
  }

  return {
    errors,
    isValid: isEmptyType(errors)
  };
};

export default productValidate;
