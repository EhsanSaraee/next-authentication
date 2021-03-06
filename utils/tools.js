import { hash, compare } from 'bcryptjs';

export const errorHelper = (formik, value) => ({
   error: formik.errors[value] && formik.touched[value] ? true : false,
   helperText:
      formik.errors[value] && formik.touched[value]
         ? formik.errors[value]
         : null,
});

export const hashPassword = async (password) => await hash(password, 10);

export const checkPassword = async (enteredPassword, hashedPassword) =>
   await compare(enteredPassword, hashedPassword);
