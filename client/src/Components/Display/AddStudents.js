import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'

import axios from 'axios'
import {useNavigate} from "react-router-dom"
import * as Yup from 'yup';
import Header from './Header';



function AddStudents ()  {
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
    <Header/>
    <Formik
      initialValues={{
        first_name: '',
        last_name: '',
        username:'',
        password:'',
      }}
      onSubmit={async (value) => {
        axios.post("http://localhost:3001/auth", value).then((response)=>{
          console.log(value);
        })

      }}
      validationSchema = {SignupSchema}
    >
      {({ isSubmitting }) => (
        <Form>
          
          <label htmlFor="firstName">First Name</label>
          <ErrorMessage name="first_name" component="span" />
          <Field name="first_name" placeholder="Jane" />

          <label htmlFor="lastName">Last Name</label>
          <ErrorMessage name="last_name" component="span" />
          <Field name="last_name" placeholder="Doe" />

          <label htmlFor="username">Username</label>
          <ErrorMessage name="username" component="span" />
          <Field name="username" placeholder="johndoe" />

    

          <label htmlFor="password">Password</label>
          <ErrorMessage name="password" component="span" />
          <Field name="password" placeholder="ABC"  type="password"/>

          <button type="submit" disabled={isSubmitting}>
            Register
          </button>
        </Form>
      )}
    </Formik>
  </div>
  )
}
 
;


export default AddStudents;