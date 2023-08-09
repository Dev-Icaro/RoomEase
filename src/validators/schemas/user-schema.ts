import * as Yup from "yup";

export const userSchema = Yup.object().shape({
  username: Yup.string().required(),
  email: Yup.string().required().email(),
  password: Yup.string().required(),
});
