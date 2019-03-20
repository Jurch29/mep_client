import React, { Component } from 'react';
import './accueil.css';

import Carousel from '../carousel/carousel';

class Accueil extends Component {

  /*constructor() {
    super();

  }*/

  render() {

    return (

      <div>
        <br></br>
        <h2>Bienvenue en Bretagne</h2>
        <br></br>
        <br></br>
        <Carousel></Carousel>
      </div>

    );
  }
}

export default Accueil;