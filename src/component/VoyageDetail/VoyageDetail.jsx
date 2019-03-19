import React, { Component } from 'react';
import './VoyageDetail.css';

class VoyageDetail extends Component {



  render() {
    
    let title = this.props.location.state.title;
    let caption = this.props.location.state.caption;
    let price = this.props.location.state.price;
    return (
      <div>
        <div className="plate">
        <p className="script"><span>{title}</span></p>
        </div>
        <div className="descr">
        <br></br>
        <br></br>
        <p className="caption">{caption}</p>
        <p className="price">Prix : {price} €</p>
        </div>
      </div>
    )
  }
}

export default VoyageDetail;