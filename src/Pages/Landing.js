import React, { useState } from "react";
import {Container, Row, Col} from 'react-bootstrap'
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";

export default function Landing({setUser}) {

    const [ formType, setFormType ] = useState("signin");

    const toggleFormType = e => {
        if(formType == 'signin') {
            setFormType("signup")
        }else{
            setFormType("signin")
        }
    }

    return (
        <section className="p-4">
            <Container>
                <Row>
                    <Col lg="7" className="mt-3">
                        <h1 className="fw-bold">Welcome To The Property Chain Project</h1>
                        <div className="mt-4">
                            <p>Build a reliable chain of real estate properties. Buy/Sell properties from the Blockchain.</p>
                        </div>
                        
                    </Col>
                    <Col lg="5" md="10">
                        {
                            formType == "signin" ?
                                <SignInForm setUser={setUser} switchType={toggleFormType}/> :
                                <SignUpForm switchType={toggleFormType}/>
                        }
                    </Col>
                </Row>
            </Container>
        </section>
    )
}