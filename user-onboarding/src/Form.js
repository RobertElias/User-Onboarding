import * as Yup from "yup";

import { Field, Form, withFormik } from "formik";
import React, { useEffect, useState } from "react";

import axios from "axios";

const UserForm = ({ values, errors, touched, status })=>{
    
      
const [users, setUsers] = useState([]);
  useEffect(() => {
    status && setUsers(users => [...users, status]);
  }, [status]);

 

return(
    <div className="user-form">
    <br></br>
    <Form>
    <Field type="text" name="name" placeholder="What is your name?"/><br></br>
    {touched.name && errors.name && (<p className="errors">{errors.name}</p>)}
    <br></br>
    <Field type="text" name="email" placeholder="What is your email?"/><br></br>
    {touched.email && errors.email && (<p className="errors">{errors.email}</p>)}
    <br></br>
    <Field type="text" name="password" placeholder="What is your password?"/><br></br>
    {touched.password && errors.password && (<p className="errors">{errors.password}</p>)}
    <br></br>
    <Field
         
          as="select"
          name="choice"
          type="dropdownlist"
        >
          <option value="Choice">Choose A Role</option>
          <option value="computerscience">Computer Scienctist</option>
          <option value="softwaredevelopment">Software Development</option>
          <option value="mobiledesigner">Mobile Designer</option>
        </Field>
        {touched.choice && errors.choice && <p className="errors">{errors.choice}</p>}
    <label className="checkbox-container">Terms Of Service
    <Field 
    type="checkbox" 
    name="terms" 
    checked={values.terms}
    />
    {touched.terms && errors.terms && (<p className="errors">{errors.terms}</p>)}
    <span className="checkmark"/>
    </label>
    <button type="submit">Submit!</button>

    </Form>
    {users.map( (user, index) => (
        <ul key={index}>
            <li>Name: {user.name}</li>
            <li>Email: {user.email}</li>
            <li>Password: {user.password}</li>
            <li>Interest: {user.choice}</li>
            
        </ul>
    ))}
    

    </div>
);
};



const FormikUserForm = withFormik({
    mapPropsToValues({name, email, password, terms, choice}){
        return{
            name: name || "",
            email: email || "",
            password: password || "",
            terms: terms || false,
            choice: choice 
        };

    },
    validationSchema: Yup.object().shape({
        name: Yup.string().min(3, "Your name is too short ").required("Please enter a name!!"),
        email: Yup.string().email("Must be real Email").required("Please enter your email"),
        password: Yup.string().min(6, "Password must be 6 characters or longer").required("Password is required!!"),
        terms: Yup.boolean().oneOf([true], "Must check terms of service"),
        choice: Yup.string()
      .oneOf(["computerscience", "softwaredevelopment", "moviledesign"])
      .required("Please choose an option")       
      }),
      handleSubmit(values, { setStatus, resetForm }) {
        // values is our object with all of our data
        console.log(values);
        axios
          .post("https://reqres.in/api/users/", values)
          .then(res => {
            setStatus(res.data);
            resetForm();
            console.log(res);
          })
          .catch(err => console.log(err.response));
      }
      
})(UserForm);

export default FormikUserForm;

console.log("This is the HOC", FormikUserForm)