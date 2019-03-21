import React, { Component } from 'react';
import './navbar.css';
import {Nav, Navbar, Form, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactModalLogin from "react-modal-login";
import axios from 'axios';
import config from "../../param";

class Navigbar extends Component {

    constructor(props) {
        super(props);

        this.state = {
        showModal: false,
        loggedIn: sessionStorage.getItem("login"),
        loading: false,
        error: null,
        initialTab: null,
        recoverPasswordSuccess: null,
        lblerror_login: "Fatal error",
        lblerror_register : "Fatal error"
        };
    }

    onLogin() {
        let self = this;
        this.startLoading();
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;

        if (!email || !password) {
        this.setState({
            error: true,
            lblerror_login:"Veuillez renseigner Email et mot de passe."
        })
        }
        else{
        axios({
            method: 'post',
            url: 'http://localhost:8080/mep_serveur/ServletAuth',
            headers: {
                'crossDomain': true,  //For cors errors 
                'Content-Type': 'application/json'
            },
            data: {
                login: email,
                mdp: password
            }
            }).then(res => {

                console.log(res);

                if (res.data === -1){
                this.setState({
                    error: true,
                    lblerror_login:"Identifiant ou mot de passe incorrecte."
                })
                }
                else {
                this.onLoginSuccess(res.data);
                sessionStorage.setItem("login", res.data);
                sessionStorage.setItem("email", email);
                this.props.updateuser(res.data);
                }
            }).catch(function(err) {
            self.setState({
                error: true,
                lblerror_login:"Erreur réseau("+err+")"
            })
        });
        }
        this.finishLoading();
    }

    onRegister() {
        let self = this;
        const login = document.querySelector('#login').value;
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;

        if (!login || !email || !password) {
        this.setState({
            error: true,
            lblerror_register: "Veuillez remplir tout les champs."
        })
        } else {

        axios({
            method: 'post',
            url: 'http://localhost:8080/mep_serveur/ServletRegister',
            headers: {
                'crossDomain': true,  //For cors errors 
                'Content-Type': 'application/json'
            },
            data: {
                name: login,
                mdp: password,
                mail: email
            }
            }).then(res => {
                console.log(res.data);
                if (res.data === "exist"){
                this.setState({
                    error: true,
                    lblerror_register:"Un utilisateur a deja cette adresse mail."
                })
                }
                else if (res.data === "error"){
                this.setState({
                    error: true,
                    lblerror_register:"Tentative de piratage."
                })
                }
                else {
                this.closeModal();
                }  
            }).catch(function(err) {
            self.setState({
                error: true,
                lblerror_register:"Erreur réseau("+err+")"
            })
        });
        }
    }

    onRecoverPassword() {
        const email = document.querySelector('#email').value;

        if (!email) {
        this.setState({
            error: true,
            recoverPasswordSuccess: false
        })
        } else {
        this.setState({
            error: null,
            recoverPasswordSuccess: true
        });
        }
    }

    openModal(initialTab) {
        this.setState({
        initialTab: initialTab
        }, () => {
        this.setState({
            showModal: true,
        })
        });
    }

    onLoginSuccess(method, response) {

        this.closeModal();
        this.setState({
        loggedIn: method,
        loading: false
        })
    }

    onLoginFail(method, response) {

        this.setState({
        loading: false,
        error: response
        })
    }

    startLoading() {
        this.setState({
        loading: true
        })
    }

    finishLoading() {
        this.setState({
        loading: false
        })
    }

    afterTabsChange() {
        this.setState({
        error: null,
        recoverPasswordSuccess: false,
        });
    }

    closeModal() {
        this.setState({
        showModal: false,
        error: null
        });
    }

    deconnexion(){
        this.setState({
        loggedIn: null,
        })
        sessionStorage.removeItem("login");
        axios({
            method: 'post',
            url: 'http://localhost:8080/mep_serveur/ServletDisconnect',
            headers: {
                'crossDomain': true,  //For cors errors 
                'Content-Type': 'application/json'
            }
        });
    }

    render() {

        const loggedIn = this.state.loggedIn;
        const isLoading = this.state.loading;
        let url = config.URL_SERV;

        return (
        
        <>
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="https://fr.wikipedia.org/wiki/Bretagne">Bec’h dei !</Navbar.Brand>
            <Nav className="mr-auto">

            <li className="limargin"><Link to={url + 'index'}>Accueil</Link></li>
            <li className="limargin"><Link to={url + 'voyages'}>Voyages</Link></li>
            {loggedIn != null &&
            <div>
                <li className="limargin"><Link to={url + 'historique'}>Historique</Link></li>
                <li><Link to={url + 'panier'}>Mon panier</Link></li>
            </div>
            }

            </Nav>

            {loggedIn ? (
            <div className="login">
                <div className="log">{loggedIn}</div>
                <Button onClick={() => this.deconnexion()} variant="outline-info">Deconnexion</Button>
            </div>
            ) : (
            <Form inline>
                <Button onClick={() => this.openModal()} variant="outline-info">Connexion</Button>
            </Form>
            )}

        </Navbar>
        <br />

        <ReactModalLogin
        visible={this.state.showModal}
        onCloseModal={this.closeModal.bind(this)}
        loading={isLoading}
        initialTab={this.state.initialTab}
        error={this.state.error}
        tabs={{
            afterChange: this.afterTabsChange.bind(this),
            loginLabel : "Connection",
            registerLabel : "Inscription"
        }}
        loginError={{
            label : this.state.lblerror_login
        }}
        registerError={{
            label: this.state.lblerror_register
        }}
        startLoading={this.startLoading.bind(this)}
        finishLoading={this.finishLoading.bind(this)}
        form={{
            onLogin: this.onLogin.bind(this),
            onRegister: this.onRegister.bind(this),
            onRecoverPassword: this.onRecoverPassword.bind(this),

            recoverPasswordSuccessLabel: this.state.recoverPasswordSuccess
            ? {
                label: "Un message a été envoyé sur votre boîte mail."
                }
            : null,
            recoverPasswordAnchor: {
            label: "Mot de passe oublié ?"
            },
            loginBtn: {
            label: "Se connecter"
            },
            registerBtn: {
            label: "S'inscrire"
            },
            recoverPasswordBtn: {
            label: "Envoyer"
            },
            loginInputs: [
            {
                containerClass: 'RML-form-group',
                label: 'Email',
                type: 'email',
                inputClass: 'RML-form-control',
                id: 'email',
                name: 'email',
                placeholder: 'Email',
            },
            {
                containerClass: 'RML-form-group',
                label: 'Mot de passe',
                type: 'password',
                inputClass: 'RML-form-control',
                id: 'password',
                name: 'password',
                placeholder: 'Mot de passe',
            }
            ],
            registerInputs: [
            {
                containerClass: 'RML-form-group',
                label: 'Login',
                type: 'text',
                inputClass: 'RML-form-control',
                id: 'login',
                name: 'login',
                placeholder: 'Login',
            },
            {
                containerClass: 'RML-form-group',
                label: 'Email',
                type: 'email',
                inputClass: 'RML-form-control',
                id: 'email',
                name: 'email',
                placeholder: 'Email',
            },
            {
                containerClass: 'RML-form-group',
                label: 'Mot de passe',
                type: 'password',
                inputClass: 'RML-form-control',
                id: 'password',
                name: 'password',
                placeholder: 'Mot de passe',
            }
            ],
            recoverPasswordInputs: [
            {
                containerClass: 'RML-form-group',
                label: 'Email',
                type: 'email',
                inputClass: 'RML-form-control',
                id: 'email',
                name: 'email',
                placeholder: 'Email',
            },
            ],
        }}
        />
        </>

        );
    }
    
}

export default Navigbar;