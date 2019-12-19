import * as Yup from 'yup'

import {Field, Form, withFormik} from 'formik'

import React from 'react'

const UserForm = (errors, touched) => {
    return (
        <div className="user-form">
        <Form>
        <Field type="text" name="name" placeholder="What is your name?"/><br></br>
        {touched.name && errors.name && (<p className="errors">{errors.name}</p>)}
        <Field type="email" name="email" placeholder="What is your email?"/><br></br>
        {touched.email && errors.email && (<p className="errors">{errors.email}</p>)}
        <Field type="password" name="password" placeholder="What is your password?"/><br></br>

        <label className="checkbox-container">Terms of Service
        <Field type="checkbox" name="terms"/>
        <span className="checkmark"/>
        </label>
        <button type="submit">Submit</button>
        </Form>
        </div>
    )
}
const FormikUserForm = withFormik({
    mapPropsToValues({name, email, password, terms}){
        return{
            name: name || "",
            email: email || "",
            password: password || "",
            terms: terms || false,
        };
    },
    validateYupSchema: Yup.object().shape({
      name: Yup.string().min(3, "Your name is too short").required("Please enter your name!!"),
      email: Yup.string().email("Must be a valid email").required("Email is required"),
      password: Yup.string().min(6, "Password must be 6 characters or longer").required("Password is required"),
      Yup.boolean().oneOf([true], "Must check terms of service")
    })
    handleSubmit(values, { setStatus, resetForm }) {
        console.log("submitting", values);
        axios
          .post("https://reqres.in/api/users/", values)
          .then(res => {
            console.log("success", res);
            setStatus(res.data);
            resetForm();
          })
          .catch(err => console.log(err.response));
      }
    
})(UserForm);

export default FormikUserForm
