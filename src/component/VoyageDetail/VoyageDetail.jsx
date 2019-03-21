import React, { Component } from 'react';
import './VoyageDetail.css';
import axios from 'axios';
import Comment from '../comment/comment';
import {Button} from 'react-bootstrap';

class VoyageDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            trip_id : this.props.location.state.trip_id,
            trip_name : null,
            trip_starting_date : null,
            trip_ending_date : null,
            trip_price : null,
            trip_caption : null,
            trip_photos : null,
            trip_comments : null,
            post_comment : null,
            comment : null,
            order : null,
            commander : null
        }
        this.post_comment = this.post_comment.bind(this);
        this.order = this.order.bind(this);
    }

    componentWillMount() {
        axios({
            method : 'post',
            headers : {
                'Access-Control-Allow-Origin' : '*',
                'cross-domain' : true
            },
            url : 'http://localhost:8080/mep_serveur/ServletSelectTrip',
            data : this.state.trip_id
        })
        .then(async result_1 => {
            console.log('select_trip ok');
            console.log(result_1);
            await this.setState({
                trip_name : result_1.data.trip_name,
                trip_starting_date : result_1.data.trip_starting_date.substring(0, 10),
                trip_ending_date : result_1.data.trip_ending_date.substring(0, 10),
                trip_price : result_1.data.trip_price,
                trip_caption : result_1.data.trip_caption,
            });
            if(sessionStorage.getItem("email") != null)
            {
                if(new Date(this.state.trip_starting_date).getTime() > new Date().getTime()) {
                    this.setState({
                        commander : <Button variant="success" onClick={() => this.order()}>Commander</Button>
                    });
                }
                axios({
                    method : 'post',
                    headers : {
                        'Access-Control-Allow-Origin' : '*',
                        'cross-domain' : true
                    },
                    url : 'http://localhost:8080/mep_serveur/ServletUserId',
                    data : sessionStorage.getItem("email")
                })
                .then(result_2 => {
                    console.log('user_id ok');
                    console.log(result_2);
                    this.setState({
                        user_id : result_2.data[0].user_id,
                        order : {
                            trip_id : this.props.location.state.trip_id,
                            user_id : result_2.data[0].user_id
                        }
                    });
                    axios({
                        method : 'post',
                        headers : {
                            'Access-Control-Allow-Origin' : '*',
                            'cross-domain' : true
                        },
                        url : 'http://localhost:8080/mep_serveur/ServletVerifyIfOrdered',
                        data : this.state.order
                    })
                    .then(result_3 => {
                        console.log('verify_ordered ok');
                        console.log(result_3);
                        if((new Date(this.state.trip_ending_date).getTime() < new Date().getTime()) && sessionStorage.getItem("login") != null && result_3.data[0] != null) {
                            this.setState({
                                post_comment : 
                                    <div>
                                        <textarea id='comment_content' ></textarea>
                                        <br />
                                        <input id='comment_submit' type='button' onClick={this.post_comment} value='Ajouter Commentaire' />
                                        <br />
                                        <input id='comment_files' type='file' multiple accept='image/jpeg, image/png image/gif' />
                                    </div>
                            });
                        }
                    })
                    .catch(function(error) {
                        console.log('verify_ordered ko');
                        console.log(error);
                    });
                })
                .catch(function(error) {
                    console.log('user_id ko');
                    console.log(error);
                });
            }
        })
        .catch(function(error) {
            console.log('select_trip ko');
            console.log(error);
        });
        axios({
            method : 'post',
            headers : {
                'Access-Control-Allow-Origin' : '*',
                'cross-domain' : true
            },
            url : 'http://localhost:8080/mep_serveur/ServletTripPhotos',
            data : this.props.location.state.trip_id
        })
        .then(result => {
            console.log('trip_photos_list ok');
            console.log(result);
            let data = [];
            for(let i = 0; i < result.data.length; i++) {
                let src = "./images/" + result.data[i].photo_relative_name;
                data[i] = <img src={src} alt="result.data[i].photo_relative_name" />;
            }
            this.setState({
                trip_photos : data
            });
        })
        .catch(function(error) {
            console.log('trip_photos_list ko');
            console.log(error);
        });
        axios({
            method : 'post',
            headers : {
                'Access-Control-Allow-Origin' : '*',
                'cross-domain' : true
            },
            url : 'http://localhost:8080/mep_serveur/ServletTripComments',
            data : this.props.location.state.trip_id
        })
        .then(result => {
            console.log('comment_list ok');
            console.log(result);
            let data = [];
            for(let i = 0; i < result.data.length; i++) {
                data[i] = <div><br /><Comment display='trip' comment_id={result.data[i].comment_id} comment_user_name={result.data[i].user_name} comment_content={result.data[i].comment_content} comment_date={result.data[i].comment_date} /></div>;
            }
            this.setState({
                trip_comments : data
            });
        })
        .catch(function(error) {
            console.log('comment_list ko');
            console.log(error);
        });
    }

    post_comment() {
        console.log('sending');
        let data = new FormData();
        for(let i = 0; i < document.getElementById('comment_files').files.length; i++) {
            data.append(document.getElementById('comment_files').files[i].type, document.getElementById('comment_files').files[i]);
        }
        axios({
            method : 'post',
            headers : {
                'Access-Control-Allow-Origin' : '*',
                'Content-Type' : 'multipart/form-data',
                'cross-domain' : true
            },
            url : 'http://localhost:8080/mep_serveur/ServletSaveImages',
            data : data
        })
        .then(async result_1 => {
            console.log('photo ok');
            console.log(result_1.data.photos);
            axios({
                method : 'post',
                headers : {
                    'Access-Control-Allow-Origin' : '*',
                    'cross-domain' : true
                },
                url : 'http://localhost:8080/mep_serveur/ServletUserId',
                data : sessionStorage.getItem("email")
            })
            .then(async result_2 => {
                console.log('user_id ok');
                console.log(result_2);
                await this.setState({
                    comment : {
                        trip_id : this.state.trip_id,
                        user_id : result_2.data[0].user_id,
                        content : document.getElementById('comment_content').value,
                        photos : JSON.stringify(result_1.data.photos)
                    }
                });
                axios({
                    method : 'post',
                    headers : {
                        'Access-Control-Allow-Origin' : '*',
                        'cross-domain' : true
                    },
                    url : 'http://localhost:8080/mep_serveur/ServletSaveComment',
                    data : this.state.comment
                })
                .then(result_3 => {
                    console.log('comment ok');
                    this.componentWillMount();
                    console.log(result_3);
                })
                .catch(function(error) {
                    console.log('comment ko');
                    console.log(error);
                });
            })
            .catch(function(error) {
                console.log('user_id ko');
                console.log(error);
            });
        })
        .catch(function(error) {
            console.log('photo ko');
            console.log(error);
        });
    }

    order() {
        axios({
            method : 'post',
            headers : {
                'Access-Control-Allow-Origin' : '*',
                'cross-domain' : true
            },
            url : 'http://localhost:8080/mep_serveur/ServletUserId',
            data : sessionStorage.getItem("email")
        })
        .then(async result => {
            console.log('user_id ok');
            console.log(result);
            this.setState({
                user_id : result.data[0].user_id
            });
            await this.setState({
                order : {
                    trip_id : this.state.trip_id,
                    user_id : result.data[0].user_id
                }
            });
            axios({
                method : 'post',
                headers : {
                    'Access-Control-Allow-Origin' : '*',
                    'cross-domain' : true
                },
                url : 'http://localhost:8080/mep_serveur/ServletOrderTrip',
                data : this.state.order
            })
            .then(result => {
                console.log('order ok');
                console.log(result);                
            })
            .catch(function(error) {
                console.log('order ko');
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
                <div className="plate">
                    <p className="script"><span>{this.state.trip_name}</span></p>
                    </div>
                    <div className="descr">
                    <br></br>
                    {this.state.trip_photos}
                    <br></br>
                    <p className="starting_date">Debut : {this.state.trip_starting_date}</p>
                    <p className="ending_date">Fin : {this.state.trip_ending_date}</p>
                    <p className="caption">{this.state.trip_caption}</p>
                    <p className="price">Prix : {this.state.trip_price} €</p>
                    {this.state.commander}
                    <h1>Commentaires</h1>
                    {this.state.post_comment}
                    <div>
                        {this.state.trip_comments}
                    </div>
                </div>
            </div>
        )
    }

}

export default VoyageDetail;