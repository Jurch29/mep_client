import React, { Component } from 'react';
import './historique.css';
import {Table} from 'react-bootstrap';
import axios from 'axios';
import Comment from '../comment/comment';

class Historique extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user_id : null,
            user_orders : null,
            user_comments : null
        }
    }

    componentWillMount(){
        axios({
            method : 'post',
            headers : {
                'Access-Control-Allow-Origin' : '*',
                'cross-domain' : true
            },
            url : 'http://localhost:8080/mep_serveur/ServletUserId',
            data : sessionStorage.getItem("email")
        })
        .then(result => {
            this.setState({
                user_id : result.data
            });
            axios({
                method : 'post',
                headers : {
                    'Access-Control-Allow-Origin' : '*',
                    'cross-domain' : true
                },
                url : 'http://localhost:8080/mep_serveur/ServletPaidOrders',
                data : result.data[0].user_id
            })
            .then(result => {
                let data = [];
                for(let i = 0; i < result.data.length; i++) {
                    data[i] =
                        <tr>
                            <td>{i + 1}</td>
                            <td>{result.data[i].trip_name}</td>
                            <td>{result.data[i].trip_starting_date} - {result.data[i].trip_ending_date}</td>
                            <td>{result.data[i].trip_price} €</td>
                        </tr>;
                }
                this.setState({
                    user_orders : data
                });
            })
            .catch(function(error) {
                console.log('paid_orders ko');
                console.log(error);
            });
            axios({
                method : 'post',
                headers : {
                    'Access-Control-Allow-Origin' : '*',
                    'cross-domain' : true
                },
                url : 'http://localhost:8080/mep_serveur/ServletUserComments',
                data : result.data[0].user_id
            })
            .then(async result => {
                let data = [];
                for(let i = 0; i < result.data.length; i++) {
                    data[i] = <div><br /><Comment display='historical' comment_id={result.data[i].comment_id} comment_trip_name={result.data[i].trip_name} comment_content={result.data[i].comment_content} comment_date={result.data[i].comment_date} /></div>;
                }
                this.setState({
                    user_comments : data
                });
            })
            .catch(function(error) {
                console.log('comments ko');
                console.log(error);
            });
        })
        .catch(function(error) {
            console.log('user_id ko');
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                <h3>Historique</h3>
                <br></br>
                <p className="Title">Voyages :</p>
                <br></br>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nom</th>
                            <th>Date</th>
                            <th>Prix</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.user_orders}
                    </tbody>
                </Table>

                <br></br>
                <p className="Title">Commentaires postés :</p>

                <br></br>

                {this.state.user_comments}

                <br></br>
            </div>
        );
    }

}

export default Historique;