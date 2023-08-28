import * as Yup from "yup";

export const roomSchema = Yup.object().shape({
  name: Yup.string().required(),
  capacity: Yup.number().required(),
  amenitites: Yup.string().required(),
});
