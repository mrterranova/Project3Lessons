import React, { useState } from 'react';
import  { Redirect } from 'react-router-dom';
import Layout from "../core/Layout";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import { authenticate, isAuth } from './helpers';

const Signin = ({ history }) => {
    const [values, setValues] = useState({
        name: 'Michal',
        email: 'michalterranova@mail.com',
        password: '123456',
        btnText: 'Submit'
    })

    const { email, password, btnText } = values

    const handleChange = (name) => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const handleSubmitForm = event => {
        event.preventDefault();
        setValues({ ...values, btnText: "Submitting" })
            axios({
                method: "POST",
                url: process.env.REACT_APP_API + '/signin',
                data: {email, password }
            }).then(response => {
                console.log("Signed in!", response)

                authenticate(response, () => {
                    setValues({ ...values, name: '', email: '', password: '', btnText: "Signed In" });
                })

                isAuth() && isAuth().role ==='admin' ? history.push('/admin-dash') : history.push('/private'); 

                //save user, token in cookie
                setValues({ ...values, name: '', email: '', password: '', btnText: "Signed In" });
                toast.success(`Hello ${response.data.user.name}. Welcome back!`)
            }).catch(error => {
                console.log('Error in Signup', error.response.data)
                setValues({ ...values, btnText: 'Submit' });
                toast.error(error.response.data.error)
            })
    }


    const signinForm = () => (
        <form>
            <div className="form-group" >
                <label className="text-muted">Email: </label>
                <input onChange={handleChange('email')} value={email} type="email" className="form-control" />
            </div>
            <div className="form-group" >
                <label className="text-muted">Password: </label>
                <input onChange={handleChange('password')} value={password} type="password" className="form-control" />
            </div>
            <div>
                <button className="btn btn-warning" onClick={handleSubmitForm} type="submit">{btnText}</button>
            </div>
        </form>
    )

    return (
        <Layout>
            <ToastContainer />
            {isAuth() ? <Redirect to="/" /> : null}
            <h1> Signin </h1>
            {signinForm()}
        </Layout>
    )
}

export default Signin;