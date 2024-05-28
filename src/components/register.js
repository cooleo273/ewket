
import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'

import axios from 'axios'
import {useNavigate} from "react-router-dom"
import * as Yup from 'yup';
import Navbar from './Navbar';





function Register ()  {
  let navigate = useNavigate();

  const SignupSchema = Yup.object().shape({
    first_name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    last_name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    
  });
  return(
    <div className='AddStudentsContainer'>
    <Navbar/>
    
    <Formik
      initialValues={{
        first_name: '',
        last_name: '',
        username:'',
        password:'',
        role:'',
        gender:''
      }}
      onSubmit={async (value) => {
        axios.post("http://localhost:3002/auth", value).then((response)=>{
          navigate('/')
        })
       

      }}
      validationSchema = {SignupSchema}
    >
      {({ isSubmitting }) => (
        <Form id='login-form'>
          <div className='registration-wrapper'>
          <div className='wrapper-two'>
          <label htmlFor="firstName">First Name</label>
          <ErrorMessage name="first_name" component="span" />
          <Field name="first_name" placeholder="Jane" />

          <label htmlFor="lastName">Last Name</label>
          <ErrorMessage name="last_name" component="span" />
          <Field name="last_name" placeholder="Doe" />

          <label htmlFor="username">Username</label>
          <ErrorMessage name="username" component="span" />
          <Field name="username" placeholder="johndoe" />
        </div>
    
          <div className='wrapper-one'>
          <label htmlFor="password">Password</label>
          <ErrorMessage name="password" component="span" />
          <Field name="password" placeholder="ABC"  type="password"/>

          <label htmlFor="role">Role</label>
          <ErrorMessage name="role" component="span" />
          <Field name="role" placeholder="select" component='select'>
              <option value=''>select options</option>
              <option value='student'>Student</option>
              <option value='teacher'>Teacher</option>
          </Field>

          <label htmlFor="gender">Gender</label>
          <ErrorMessage name="gender" component="span" />
          <Field name="gender" placeholder="select options" component='select'>
            <option value=''>select options</option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
          </Field>
          </div>
          </div>
          <div>
          <button type="submit" disabled={isSubmitting}>
            Register
          </button>
          </div>
        </Form>
      )}
    </Formik>

    
  </div>
  )
}
 
;


export default Register;