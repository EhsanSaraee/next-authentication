import * as yup from 'yup';

export const authSchema = yup.object({
   email: yup.string().email('Invalid email').required('Email is required'),
   password: yup
      .string()
      .required('Password is required')
      .max(10, 'Password must be less than 10 characters'),
});
