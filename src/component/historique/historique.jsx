import React, { Component } from 'react';
import './historique.css';
import {Table} from 'react-bootstrap';
import axios from 'axios';

class Historique extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user_id : null,
            user_orders : null,
            user_comments : null,
            user_photos : []
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
            console.log('user_id ok');
            console.log(result);
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
                console.log('paid_orders ok');
                console.log(result);
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
            .then(async result_1 => {
                console.log('comments ok');
                console.log(result);
                let data_1 = [];
                for(let i = 0; i < result_1.data.length; i++) {
                    /*let data_2 = [];
                    axios({
                        method : 'post',
                        headers : {
                            'Access-Control-Allow-Origin' : '*',
                            'cross-domain' : true
                        },
                        url : 'http://localhost:8080/mep_serveur/ServletCommentPhotos',
                        data : result_1.data[i].comment_id
                    })
                    .then(result_2 => {
                        console.log('comment_photos_list ok');
                        console.log(result_2);
                        for(let j = 0; j < result_2.data.length; j++) {
                            let src = "./images/" + result_2.data[j].photo_relative_name;
                            data_2[j] = <img src={src} alt="result.data[j].photo_relative_name" />;
                        }
                        console.log(data_2);
                    })
                    .catch(function(error) {
                        console.log('comment_photos_list ko');
                        console.log(error);
                    });*/
                    data_1[i] =
                        <div>
                            <p>{result_1.data[i].comment_date}</p>
                            <p className="ttc">{result_1.data[i].trip_name}</p>
                            <p>{result_1.data[i].comment_content}</p>
                        </div>;
                }
                this.setState({
                    user_comments : data_1
                });
                            console.log(this.state.user_photos);
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