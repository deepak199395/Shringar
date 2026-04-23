import * as Yup from "yup";

const phoneRegExp = /^[6-9]\d{9}$/;
const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
export const validationSchema = Yup.object({
  FullName: Yup.string()
    .min(3, "Too short")
    .required("Full Name is required"),

  phoneNumber: Yup.string()
    .matches(phoneRegExp, "Invalid phone number")
    .required("Phone number is required"),

  Email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),

  Password: Yup.string()
    .matches(passwordRegExp, "Min 6 chars, include number")
    .required("Password is required"),

  Dob: Yup.date().required("Date of Birth required"),

  age: Yup.number()
    .min(10, "Too young")
    .max(100, "Invalid age")
    .required("Age required"),

  Gender: Yup.string().required("Select gender"),

  Address: Yup.string().required("Address required"),
  City: Yup.string().required("City required"),
  State: Yup.string().required("State required"),
  Country: Yup.string().required("Country required"),

  Pincode: Yup.string()
    .matches(/^[1-9][0-9]{5}$/, "Invalid pincode")
    .required("Pincode required"),
});