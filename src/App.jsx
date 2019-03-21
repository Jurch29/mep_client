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

    constructor(props) {
        super(props);
        this.state = {
            user_id: null
        };
    }
    
    updateuser = (id) => {
        this.setState({ user_id: id });
    }

    componentWillMount(){
        this.setState({ user_id: sessionStorage.getItem("login") });
    }
    
    render() {
        let userid = this.state.user_id;

        let url = config.URL_SERV;
        return (
            <Router history={history}>
            <div>
                <Navigbar updateuser={this.updateuser}/>

                <Switch>
                    <Route exact path={url} component={Accueil} />
                    <Route path={url + 'index.html'} component={Accueil} />
                    <Route path={url + 'index'} component={Accueil} />
                    <Route path={url + 'voyages'} component={Voyages} />
                    <Route path={url + 'voyagedetail'} component={VoyageDetail} />
                    {userid != null &&
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