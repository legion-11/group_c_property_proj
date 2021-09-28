import logo from './logo.svg';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Row, Col, Button } from 'react-bootstrap'

function App() {
  return (
    <div className="App">
      <header className="header">
        <Navbar bg="dark">
          <Container fluid>
            <Navbar.Brand>
              <span className="text-primary">Land Chain Project</span>
            </Navbar.Brand>
          </Container>
        </Navbar>
        <section className="banner">
          <Container className="p-4">
            <Row>
              <Col sm="8">
                <h1>Welcome to the Land Chain Project</h1>
                <p>Link your property to the chain.</p>
                <hr/>
                <Button>Get Started</Button>
              </Col>
            </Row>
          </Container>
        </section>
      </header>
    </div>
  );
}

export default App;
