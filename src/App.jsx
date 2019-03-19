import React, { Component } from 'react';
//import axios from 'axios';
import './App.css';
import { Router, Route, Switch } from 'react-router-dom';
import history from "./component/history";

import Navigbar from "./component/navbar/navbar";
import Accueil from "./component/accueil/accueil";
import Voyages from "./component/voyages/voyages";
import VoyageDetail from "./component/VoyageDetail/VoyageDetail";
import NotFound from "./component/NotFound/NotFound";

class App extends Component {

    /*constructor(props){
        super(props)

        
        //exemple d'axios sur servlet :
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
        
    }*/

    render() {
        return (
            <Router history={history}>
            <div>
                <Navigbar/>
                <Switch>
                    <Route exact path="/" component={Accueil} />
                    <Route path="/accueil" component={Accueil} />
                    <Route path="/voyages" component={Voyages} />
                    <Route path="/voyagedetail" component={VoyageDetail} />
                    <Route component={NotFound} />
                </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
