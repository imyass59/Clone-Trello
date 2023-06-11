import React, { useState } from 'react'
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { Helmet } from 'react-helmet';
import { Button, IconButton, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from "yup";
import { NavLink } from 'react-router-dom';


export default function Authentication() {
  const [section,setSection] = useState("Login");

  const SubmitForm = async () => {
    console.log("Form :" + section)
  }

  const pwdRegex = `^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+={}\[\]|\\:;"'<,>.?/]).+$`;

  const schemaLogin = yup.object().shape({
    email : yup.string().email('Please enter a valid email').required('Email is required'),
    password : yup.string().min(8,"Invalid password").matches(pwdRegex,'Invalid password').required("Password is required")
  })
  const loginForm = useFormik({
    initialValues : {
      email : '',
      password : ''
    },
    validationSchema : schemaLogin,
    onSubmit : SubmitForm
  })

  const RegisterForm = useFormik({
    initialValues : {
      email : '',
      password : '',
      confirmPassword : ''
    }
  });
  return (
    <>
      <Helmet>
        <title>Trello | {section}</title>
      </Helmet>
      <div className='flex justify-center items-center w-full h-full flex-col max-w-md mx-auto gap-6 px-4 py-4 md:px-0 md:py-0'>
        <div className='flex justify-center items-center gap-2'>
          <LockPersonIcon style={{
            width : "80px",
            height : "80px",
            color : "#0092CA"
          }} />
          <span className='text-4xl font-semibold text-[#393E46]'>{section}</span>
        </div>
        <div className='flex flex-col w-full gap-6'>
          <form onSubmit={loginForm?.handleSubmit} autoComplete='off' className='flex justify-center items-center gap-4 flex-col w-full'>
            <TextField
              required
              id='email'
              label="Email"
              className='w-full'
              type='text'
              value={loginForm?.values.email}
              onChange={loginForm?.handleChange}
              onBlur={loginForm?.handleBlur}
              error={loginForm?.errors.email && loginForm?.touched?.email}
              helperText={(loginForm?.errors.email && loginForm?.touched?.email) ? loginForm?.errors.email : null}
            />
            <TextField
              required
              label="Password"
              id='password'
              className='w-full'
              type='password'
              value={loginForm?.values.password}
              onChange={loginForm?.handleChange}
              onBlur={loginForm?.handleBlur}
              error={loginForm?.errors.password && loginForm?.touched?.password}
              helperText={(loginForm?.errors?.password && loginForm?.touched?.password) ? loginForm?.errors?.password : null}
            />
            <Button className='w-full' type='submit' style={{
              backgroundColor : "#0092CA"
            }} variant="contained" size="medium">
              {section}
            </Button>
          </form>
          <p className='flex justify-center items-center flex-col md:flex-row gap-1 break-words'>
            <span>{section==="Login" ? "I dont have account ?" : "Already have account ?"}</span>
            <button onClick={() => section==="Login" ? setSection("Sign up") : setSection("Login") } className={'text-[#0092CA] hover:underline'}>
              {section==="Login" ? "Create account" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </>
  )
}
