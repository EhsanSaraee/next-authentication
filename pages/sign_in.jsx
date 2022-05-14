import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { errorHelper } from 'utils/tools';
import { TextField, Button } from '@material-ui/core';

const SignIn = () => {
   const [formType, setFormType] = useState(false);
   const [loading, setLoading] = useState(false);

   const formik = useFormik({
      initialValues: {
         email: '',
         password: '',
      },
      validationSchema: yup.object({
         email: yup
            .string()
            .email('Invalid Email')
            .required('Email is required'),
         password: yup.string().required('Password is required'),
      }),
      onSubmit: (values) => {
         console.log(values);
      },
   });

   return (
      <div>
         <h1>{formType ? 'Sign Up' : 'Sign In'}</h1>
         {loading ? (
            'Loading'
         ) : (
            <form className="mt-3" onSubmit={formik.handleSubmit}>
               <div className="form-group">
                  <TextField
                     style={{ width: '100%' }}
                     name="email"
                     label="Email"
                     variant="outlined"
                     {...formik.getFieldProps('email')}
                     {...errorHelper(formik, 'email')}
                  />
               </div>
               <div className="form-group">
                  <TextField
                     style={{ width: '100%' }}
                     name="password"
                     label="Password"
                     variant="outlined"
                     {...formik.getFieldProps('password')}
                     {...errorHelper(formik, 'password')}
                  />
               </div>
               <div className="mb-3">
                  <Button
                     type="submit"
                     variant="contained"
                     color="primary"
                     size="small"
                  >
                     {formType ? 'Sign Up' : 'Sign In'}
                  </Button>
               </div>
               <div className="mb-3">
                  <Button
                     variant="contained"
                     color="secondary"
                     size="small"
                     onClick={() => setFormType(!formType)}
                  >
                     {formType
                        ? 'Already registered? click here'
                        : 'Not registered? click here'}
                  </Button>
               </div>
            </form>
         )}
      </div>
   );
};

export default SignIn;
