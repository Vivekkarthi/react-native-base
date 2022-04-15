import * as yup from 'yup';

const loginSchema = yup.object().shape({
  Email: yup.string().email().required(),
  Password: yup.string().min(6).max(24).required(),
});

const registerSchema = yup.object().shape({
  Name: yup
    .string()
    .min(2)
    .max(12)
    .matches(/^['a-zA-Z '‘’z -]+$/, 'Please enter valid name')
    .required('Name is required'),
  Email: yup.string().email().required(),
  Password: yup
    .string()
    .min(6)
    .max(24)
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
      'Must Contain 8 Characters, \nOne Uppercase, One Lowercase, \nOne Number and one special case Character',
    )
    .required(),
  ControllerId: yup.string().required('Controller ID is required'),
});

const resetPassSchema = yup.object().shape({
  Email: yup.string().email().required(),
});

export {loginSchema, registerSchema, resetPassSchema};
