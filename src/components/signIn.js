import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";

const SignIn = props => {

  const initialUserState = {
    username: "",
    password: "",
  };

  const [user, setUser] = useState(initialUserState);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    if (form.checkValidity()) {
      login()
    }
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const login = () => {
    props.login(user)
    props.history.push('/');
  }

  function formNotEmpty() {
    return user.username.length > 0 && user.password.length > 0;
  }

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          className="form-control"
          id="username"
          required
          value={user.username}
          onChange={handleInputChange}
          name="username"
        />
        <Form.Control.Feedback type="invalid">
          Please provide an email.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
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

      <Button variant="primary" type="submit" disabled={!formNotEmpty()}>
        Submit
      </Button>
    </Form>
  );
};

export default SignIn;
