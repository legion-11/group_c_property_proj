import React, { useState } from "react";
import {Container, Row, Col} from 'react-bootstrap'

export default function Landing({setUser}) {

    return (
        <section className="p-4">
            <Container>
                <Row>
                    <Col lg="7" className="mt-3">
                        <h1 className="fw-bold">View all Properties</h1>
                        <div className="mt-4">
                        </div>
                        
                    </Col>
                </Row>
            </Container>
        </section>
    )
}