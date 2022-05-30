import * as yup from 'yup';

const loginSchema = yup.object().shape({
  PhoneNumber: yup.string().required('Login ID is required'),
  Password: yup.string().max(10).required(),
});

const registerSchema = yup.object().shape({
  Name: yup.string().min(2).max(20).trim().required('Name is required'),
  Email: yup.string().email().max(20).trim().required(),
  PhoneNumber: yup
    .string()
    .trim()
    .matches(/^\d+$/, 'Please Enter Valid Mobile Number')
    .matches(/^\d{3}\d{3}\d{4}$/, 'Mobile number needs to be 10 digits')
    .required('Mobile is required'),
  Password: yup
    .string()
    .trim()
    .max(10)
    // .min(6)
    // .max(24)
    // .matches(
    //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
    //   'Must Contain 8 Characters, \nOne Uppercase, One Lowercase, \nOne Number and one special case Character',
    // )
    .required(),
  ControllerId: yup.string().max(8).required('Controller ID is required'),
});

const addUserSchema = yup.object().shape({
  Name: yup.string().min(2).max(20).trim().required('Name is required'),
  Email: yup.string().email().max(40).trim().required(),
  PhoneNumber: yup
    .string()
    .trim()
    .matches(/^\d+$/, 'Please Enter Valid Mobile Number')
    .matches(/^\d{3}\d{3}\d{4}$/, 'Mobile number needs to be 10 digits')
    .required('Mobile is required'),
  Password: yup.string().trim().required(),
});

const resetPassSchema = yup.object().shape({
  Email: yup.string().email().max(40).required(),
});

const controllerPasswordSchema = yup.object().shape({
  Password: yup.string().max(5).required(),
});

export {
  loginSchema,
  registerSchema,
  resetPassSchema,
  addUserSchema,
  controllerPasswordSchema,
};
