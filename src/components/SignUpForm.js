import React, {useState} from "react";
import {Form, FloatingLabel, Button} from 'react-bootstrap';
import UserDataService from '../services/user';

export default function SignUpForm(props) {

    const [status, setStatus] = useState("active");

    const handleSignInSubmit = async e => {
        setStatus("loading");
        e.preventDefault();
        const f = document.getElementById("form-signup");
        const data = {
            firstname: f.querySelector("input[name=firstname]").value,
            lastname: f.querySelector("input[name=lastname]").value,
            email: f.querySelector("input[name=email]").value,
            password: f.querySelector("input[name=password]").value,
        }
        const res = await UserDataService.signUp(data);
        setStatus("success");
    }

    const toggleFormType = e => {
        e.preventDefault();
        props.switchType("signin");
    }

    return <div className="p-4 p-md-5 pt-md-2 border rounded-3 bg-light">
            {
                status === 'active' && 
                    <Form id="form-signup" onSubmit={handleSignInSubmit}>
                        <h3 className="text-center pb-2">Sign up now</h3>
                        <FloatingLabel controlId="floatingInput" label="First Name" className="mb-3" >
                            <Form.Control type="text" name="firstname" placeholder="First Name" />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Last Name" className="mb-3" >
                            <Form.Control type="text" name="lastname" placeholder="Last Name" />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3" >
                            <Form.Control type="email" name="email" placeholder="name@example.com" />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                            <Form.Control type="password" name="password" placeholder="Password" />
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingPassword" label="Retype Password" className="mb-3">
                            <Form.Control type="password" placeholder="Retype Password" />
                        </FloatingLabel>
                        <Button type="submit" className="w-100" size="lg" disabled={status === 'loading'} >
                            {status === 'loading' ? "Sign Up" : "Loading"}
                        </Button>
                        <hr className="my-4"/>
                        <small className="text-muted">
                            Sign in Instead?&nbsp; 
                            <a href="#" onClick={toggleFormType}>Click Here</a>
                        </small>
                    </Form>
            }
            {
                status === 'success' && 
                <small className="text-muted">
                    Your account has been created.  
                    <a href="#" onClick={toggleFormType}>Click Here</a> to sign in now.
                </small>
            }
        </div>
}