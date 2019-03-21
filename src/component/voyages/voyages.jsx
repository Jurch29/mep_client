import React, { Component } from 'react';
import './voyages.css';
import {Col, ListGroup, Tab, Row} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import config from "../../param";
import axios from 'axios';

class Voyages extends Component {

    constructor(props) {
        super(props);
        this.state = {
            trip_list : null
        }
    }

    componentWillMount() {
        console.log('getting trip list');
        axios({
            method : 'post',
            headers : {
                'Access-Control-Allow-Origin' : '*',
                'cross-domain' : true
            },
            url : 'http://localhost:8080/mep_serveur/ServletTripsList'
        })
        .then(result => {
            console.log('trip_list ok');
            console.log(result);
            let url = config.URL_SERV + 'voyagedetail';
            let data = [];
            for(let i = 0; i < result.data.length; i++) {
                data[i] =
                    <Link to={{ pathname: url, state: { trip_id : result.data[i].trip_id } }}>
                        <ListGroup.Item>
                        {result.data[i].trip_name}
                        </ListGroup.Item>
                    </Link>
            }
            this.setState({
                trip_list : data
            });
        })
        .catch(function(error) {
            console.log('trip_list ko');
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                <h3>Voici nos merveilleux voyages !</h3>
                <div className="listVoyages">
                    <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                        <Row>
                            <Col sm={4}>
                                <ListGroup>
                                    {this.state.trip_list}
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