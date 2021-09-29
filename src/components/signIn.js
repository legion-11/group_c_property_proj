import React, { useState } from "react";

const SignIn = props => {

    const initialUserState = {
        username: "",
        password: "",
    };

    const [user, setUser] = useState(initialUserState);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const login = () => {
        props.login(user)
        // props.history.push('/');
    }

    return (
        <div className="submit-form">
            <div>
                <div className="form-group">
                    <label htmlFor="user">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        required
                        value={user.name}
                        onChange={handleInputChange}
                        name="username"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="text"
                        className="form-control"
                        id="password"
                        required
                        value={user.id}
                        onChange={handleInputChange}
                        name="password"
                    />
                </div>

                <button onClick={login} className="btn btn-success">
                    Login
                </button>
            </div>
        </div>
    );
};

export default SignIn;