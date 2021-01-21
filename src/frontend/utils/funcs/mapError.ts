import { FieldError } from "../../generated/graphql";

export const mapError = (arr: FieldError[]) => {
  let errors = '';
  arr.forEach((error) => {
    errors += `${error.field}: ${error.message}`;
  });
  return errors;
};
