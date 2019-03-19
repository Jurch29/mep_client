import React, { Component } from 'react';
import './voyages.css';
import {Col, ListGroup, Tab, Row} from 'react-bootstrap';
import { Link } from 'react-router-dom';


class Voyages extends Component {

  /*constructor() {
    super();
  }*/

  render() {
    return (
      <div>
        <h3>Voici nos merveilleux voyages !</h3>
        <div className="listVoyages">
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
          <Row>
            <Col sm={4}>
              <ListGroup>
                <Link to={{ pathname: '/voyagedetail', state: { title: 'Rennes', caption: "87", price : 50 } }}>
                <ListGroup.Item>
                  Rennes
                </ListGroup.Item>
                </Link>

                <Link to={{ pathname: '/voyagedetail', state: { title: 'Brest', caption: "Maritime, moderne et dynamique… Brest est bien plus que ce que vous imaginez ! En perpétuel mouvement, la métropole dégage un charme indéniable. Authentique et sympathique, vous allez apprécier l’atmosphère simple des lieux tout en profitant de la multitude d’activités possibles ! Venez découvrir cette métropole du bout du monde tournée vers l’humain autant que vers l’avenir. ", price : 88 } }}>
                <ListGroup.Item>
                  Brest
                </ListGroup.Item>
                </Link>

                <Link to={{ pathname: '/voyagedetail', state: { title: 'Lorient', caption: "89", price : 888} }}>
                <ListGroup.Item>
                  Lorient
                </ListGroup.Item>
                </Link>

                <Link to={{ pathname: '/voyagedetail', state: { title: 'Nantes', caption: "90", price : 477} }}>
                <ListGroup.Item>
                  Nantes
                </ListGroup.Item>
                </Link>
              </ListGroup>
            </Col>
            
          </Row>
        </Tab.Container>
        </div>

      </div>
    );
  }
}

export default Voyages;