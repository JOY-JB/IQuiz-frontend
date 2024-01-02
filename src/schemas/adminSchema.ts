import * as yup from "yup";

export const adminSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().required("email is required"),
  password: yup.string().required("password is required"),
});
