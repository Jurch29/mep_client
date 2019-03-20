import React, { Component } from 'react';
import './historique.css';
import {Table} from 'react-bootstrap';

class Historique extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user_id : null,
            user_orders : null
        }
    }

    componentWillMount(){
        /*axios({
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
                        <div className="card">
                            <div className="container">
                                <h4><b>{result.data[i].trip_name}</b></h4>
                                <p>{result.data[i].trip_starting_date} - {result.data[i].trip_ending_date}</p>
                                <p className="price">Prix : {result.data[i].trip_price}</p>
                            </div>
                            <Button variant="success" onClick={() => this.payment(result.data[i].order_id)}>Payer</Button>
                        </div>;
                        data[i] =
                            <tr>
                                <td>1</td>
                                <td>Rennes</td>
                                <td>18/05/2014 - 19/06/2014</td>
                                <td>325 €</td>
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
        })
        .catch(function(error) {
            console.log('user_id ko');
            console.log(error);
        });*/
    }

    render() {

        let date_comment = "18/04/2017";
        let text_comment = "C'était bien en fait et c'était cool trop coool";
        let titletrip_comment = "Brest";

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
                <tr>
                <td>1</td>
                <td>Rennes</td>
                <td>18/05/2014 - 19/06/2014</td>
                <td>325 €</td>
                </tr>
                <tr>
                <td>2</td>
                <td>Rennes</td>
                <td>18/05/2014 - 19/06/2014</td>
                <td>325 €</td>
                </tr>
                <tr>
                <td>3</td>
                <td>Rennes</td>
                <td>18/05/2014 - 19/06/2014</td>
                <td>325 €</td>
                </tr>
            </tbody>
            </Table>

            <br></br>
            <p className="Title">Commentaires postés :</p>

            <br></br>

            <p>{date_comment}</p>
            <p className="ttc">{titletrip_comment}</p>
            <p>{text_comment}</p>
            <img src="./images/0.jpg" />

            <br></br>
        </div>
        );
    }

}

export default Historique;