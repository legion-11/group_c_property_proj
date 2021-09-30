import React, { useState } from "react";
import {Button, Form} from "react-bootstrap";

const SignUp = props => {

  const initialUserState = {
    email: "",
    password: "",
    password2: "",
    firstname: "",
    lastname: "",
  };

  const [user, setUser] = useState(initialUserState);
  const [validated, setValidated] = useState(false);

  function validateForm() {
    return user.email.length > 0
      && user.password.length > 0
      && user.password === user.password2
      && user.firstname.length > 0
      && user.lastname.length > 0;
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    if (form.checkValidity()) {
      signUp()
    }
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const signUp = () => {
    props.signUp(user)
    props.history.push('/signIn');
  }

  return (
    <div className="SignUp" >
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" >
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            className="form-control"
            id="firstname"
            required
            value={user.firstname}
            onChange={handleInputChange}
            name="firstname"
          />
          <Form.Control.Feedback type="invalid">
            Please provide your name.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            className="form-control"
            id="lastname"
            required
            value={user.lastname}
            onChange={handleInputChange}
            name="lastname"
          />
          <Form.Control.Feedback type="invalid">
            Please provide your lastname.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            className="form-control"
            id="email"
            required
            value={user.email}
            onChange={handleInputChange}
            name="email"
          />
          <Form.Control.Feedback type="invalid">
            Please provide an email.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            className="form-control"
            id="password"
            required
            value={user.password}
            onChange={handleInputChange}
            name="password"
          />
          <Form.Control.Feedback type="invalid">
            Please provide password.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            className="form-control"
            id="password2"
            required
            value={user.password2}
            onChange={handleInputChange}
            isInvalid={user.password2 !== user.password && user.password2 !==""}
            name="password2"
          />
          <Form.Control.Feedback type="invalid">
            Passwords are different
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={!validateForm()}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default SignUp;