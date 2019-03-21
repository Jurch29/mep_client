import React, { Component } from 'react';
import './comment.css';
import axios from 'axios';

class Comment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comment_display : null,
            comment_photos : null
        };
    }

    componentWillMount() {
        if(this.props.display === 'historical') {
            console.log('display_historical');
            this.setState({
                comment_display :
                    <div>
                        <p className="ttc">{this.props.comment_trip_name} - {this.props.comment_date}</p>
                        <p>{this.props.comment_content}</p>
                    </div>
            });
        } else if(this.props.display === 'trip') {
            console.log('display_trip');
            this.setState({
                comment_display :
                    <div>
                        <p className="ttc">{this.props.comment_user_name} - {this.props.comment_date}</p>
                        <p>{this.props.comment_content}</p>
                    </div>
            });
        }
        axios({
            method : 'post',
            headers : {
                'Access-Control-Allow-Origin' : '*',
                'cross-domain' : true
            },
            url : 'http://localhost:8080/mep_serveur/ServletCommentPhotos',
            data : this.props.comment_id
        })
        .then(result => {
            console.log('comment_photos_list ok');
            console.log(result);
            let data = [];
            for(let i = 0; i < result.data.length; i++) {
                let src = "./images/" + result.data[i].photo_relative_name;
                data[i] = <img className='comment-images' src={src} alt="result.data[i].photo_relative_name" />;
            }
            console.log(data);
            this.setState({
                comment_photos : data
            });
        })
        .catch(function(error) {
            console.log('comment_photos_list ko');
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                {this.state.comment_display}
                {this.state.comment_photos}
            </div>
        );
    }

}

export default Comment;