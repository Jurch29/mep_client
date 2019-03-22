import React, { Component } from 'react';
import './VoyageDetail.css';
import axios from 'axios';

class VoyageDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            trip_name : null,
            trip_starting_date : null,
            trip_ending_date : null,
            trip_price : null,
            trip_caption : null,
            trip_photos : null,
            trip_comments : null
        }
    }

    componentWillMount() {
        axios({
            method : 'post',
            headers : {
                'Access-Control-Allow-Origin' : '*',
                'cross-domain' : true
            },
            url : 'http://localhost:8080/mep_serveur/MyServlet8',
            data : this.props.location.state.trip_id
        })
        .then(result => {
            this.setState({
                trip_name : result.data.trip_name,
                trip_starting_date : result.data.trip_starting_date,
                trip_ending_date : result.data.trip_ending_date,
                trip_price : result.data.trip_price,
                trip_caption : result.data.trip_caption
            });
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
            url : 'http://localhost:8080/mep_serveur/MyServlet9',
            data : this.props.location.state.trip_id
        })
        .then(result => {
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
            url : 'http://localhost:8080/mep_serveur/MyServlet6',
            data : this.props.location.state.trip_id
        })
        .then(result => {
            let data = [];
            for(let i = 0; i < result.data.length; i++) {
                data[i] =
                    <div>
                        <h2>{result.data[i].user_name} - {result.data[i].comment_date}</h2>
                        <p>{result.data[i].comment_content}</p>
                    </div>;
            this.setState({
                trip_comments : data
            });
            }
        })
        .catch(function(error) {
            console.log('comment_list ko');
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

                    <h1>Commentaires</h1>
                    <div>
                        {this.state.trip_comments}
                    </div>
                </div>
            </div>
        )
    }

}

export default VoyageDetail;