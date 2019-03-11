import React, { Component } from 'react';
import axios from 'axios';


class App extends Component {

    constructor(props){
        super(props)

        axios({
        method: 'post',
        url: 'http://localhost:8080/MEPDWP/ServletTest',
        headers: {
            'crossDomain': true,  //For cors errors 
            'Content-Type': 'application/json'
        },
        data: {
            login: 5,
            mdp: 2
        }
        });
    }

    render() {
        return (
            <div className="App">
                
                <p>LOLOLO</p>

            </div>
        );
    }
}

export default App;