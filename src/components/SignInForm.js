import React, {useState} from "react";
import {Form, FloatingLabel, Button} from 'react-bootstrap';
import UserDataService from '../services/user';
import {useHistory} from "react-router-dom";


export default function SignInForm({setUser, switchType}) {
    const history = useHistory();
    
    const handleSignInSubmit = async e => {
        e.preventDefault();
        const f = document.getElementById("form-signin");
        const data = {
          username: f.querySelector("input[name=username]").value,
            password: f.querySelector("input[name=password]").value,
        }
        const res = await UserDataService.signIn(data);
        setUser(res.data.user);
        history.push("/properties")
    }

    const toggleFormType = e => {
        e.preventDefault();
        switchType("signup");
    }

    return (
        <Form autoComplete="off" id="form-signin" className="p-4 p-md-5 pt-md-2 border rounded-3 bg-light" onSubmit={handleSignInSubmit}>
            <h3 className="text-center pb-2">Sign In</h3>
            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3" >
                <Form.Control type="email" name="username" placeholder="name@example.com" />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                <Form.Control type="password" name="password" placeholder="Password" />
            </FloatingLabel>
            <Button type="submit" className="w-100" size="lg" >Sign In</Button>
            <hr className="my-4"/>
            <small className="text-muted">
                Create a new account?&nbsp; 
                <a href="#" onClick={toggleFormType}>Click Here</a>
            </small>
        </Form>
    )
}