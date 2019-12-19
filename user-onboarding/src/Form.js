import * as Yup from 'yup'

import {Field, Form, withFormik} from 'formik'
import React, {useEffect, useState} from 'react'

import axios from 'axios'

const UserForm = () => {
    return (
        <div className="user-form">
        <Form>
        <Field type="text" name="name" placeholder="What is your name?"/><br></br>
        <Field type="email" name="email" placeholder="What is your email?"/><br></br>
        <Field type="password" name="password" placeholder="What is your password?"/><br></br>

        <label className="checkbox-container">Terms of Service
        <Field type="checkbox" name="terms"/>
        <span className="checkmark"/>
        
        </label>

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

    }
    
})(UserForm);

export default UserForm
