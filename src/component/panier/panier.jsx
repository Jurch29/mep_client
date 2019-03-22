import React, { Component } from 'react';
import './panier.css';
import {Button} from 'react-bootstrap';
import axios from 'axios';

class Panier extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user_id : null,
            user_orders : null
        }
        this.payment = this.payment.bind(this);
        this.remove = this.remove.bind(this);
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
                user_id : result.data[0].user_id
            });
            axios({
                method : 'post',
                headers : {
                    'Access-Control-Allow-Origin' : '*',
                    'cross-domain' : true
                },
                url : 'http://localhost:8080/mep_serveur/ServletUnpaidOrders',
                data : result.data[0].user_id
            })
            .then(result => {
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
                            <Button variant="danger" onClick={() => this.remove(result.data[i].order_id)}>Supprimer</Button>
                        </div>;
                }
                this.setState({
                    user_orders : data
                });
            })
            .catch(function(error) {
                console.log('unpaid_orders ko');
                console.log(error);
            });
        })
        .catch(function(error) {
            console.log('user_id ko');
            console.log(error);
        });
    }

    payment(order_id){
        axios({
            method : 'post',
            headers : {
                'Access-Control-Allow-Origin' : '*',
                'cross-domain' : true
            },
            url : 'http://localhost:8080/mep_serveur/ServletPayOrder',
            data : order_id
        })
        .catch(function(error) {
            console.log('pay_order ko');
            console.log(error);
        });
        alert('Commande n°' + order_id + ' payée avec succès.');
        this.componentWillMount();
    }

    remove(order_id){
        axios({
            method : 'post',
            headers : {
                'Access-Control-Allow-Origin' : '*',
                'cross-domain' : true
            },
            url : 'http://localhost:8080/mep_serveur/ServletRemoveOrder',
            data : order_id
        })
        .catch(function(error) {
            console.log('remove_order ko');
            console.log(error);
        });
        alert('Commande n°' + order_id + ' supprimée avec succès.');
        this.componentWillMount();
    }

    render() {
        return (
        <div>
            <h3>Panier</h3>
            {this.state.user_orders}
        </div>
        );
    }

}

export default Panier;