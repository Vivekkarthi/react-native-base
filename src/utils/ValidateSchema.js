import * as yup from 'yup';

const loginSchema = yup.object().shape({
  Email: yup.string().email().required(),
  Password: yup.string().min(6).max(24).required(),
});

const registerSchema = yup.object().shape({
  FirstName: yup
    .string()
    .min(2)
    .max(12)
    .matches(/^['a-zA-Z '‘’z -]+$/, 'Please enter valid first name')
    .required('First Name is required'),
  Surname: yup
    .string()
    .min(2)
    .max(12)
    .matches(/^['a-zA-Z '‘’z -]+$/, 'Please enter valid last name')
    .required('Last name is required'),
  PhoneNumber: yup
    .string()
    .matches(/^\d+$/, 'Please Enter Valid Phone Number')
    .matches(/^\d{3}\d{3}\d{4}$/, 'Phone Number needs to be 10 digits')
    .required('Phone number is required'),
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
  ConfirmPassword: yup
    .string()
    .oneOf([yup.ref('Password'), ''], 'Password & Confirm password must match')
    .required(),
});

export {loginSchema, registerSchema};
