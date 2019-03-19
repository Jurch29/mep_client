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
import Historique from "./component/historique/historique";
import Panier from "./component/panier/panier";

import config from "./param";

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
        let loggedIn = sessionStorage.getItem("login");
        let url = config.URL_SERV;
        return (
            <Router history={history}>
            <div>
                <Navigbar/>


                <Switch>
                    <Route exact path={url} component={Accueil} />
                    <Route path={url + '*'} component={Accueil} />
                    <Route path={url + 'index'} component={Accueil} />
                    <Route path={url + 'voyages'} component={Voyages} />
                    <Route path={url + 'voyagedetail'} component={VoyageDetail} />
                    {loggedIn != null &&
                    <div>
                    <Route path={url + 'historique'} component={Historique} />
                    <Route path={url + 'panier'} component={Panier} />
                    </div>}
                    <Route component={NotFound} />
                </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
