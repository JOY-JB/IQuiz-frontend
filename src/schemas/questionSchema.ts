import * as yup from "yup";

export const questionSchema = yup.object().shape({
  text: yup.string().required("Question is required"),
  quizCategoryId: yup.string().required("Category is Required"),
});
