import './navbar.css';
import React, { Component } from 'react';
import {Nav, Navbar, Form, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Navigbar extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">DB.JAAP</Navbar.Brand>
        <Nav className="mr-auto">

          <li className="acceuil"><Link to="/accueil">Acceuil</Link></li>

        </Nav>

          <Form inline>
            <Button>Connexion</Button>
          </Form>

      </Navbar>
    </>
        

    );
  }
}
export default Navigbar;