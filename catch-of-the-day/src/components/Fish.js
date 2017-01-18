import React from 'react';
import {formatPrice} from '../helpers';

class Fish extends React.Component{
  render() {
    const isAvailable = this.props.details.status === 'available' //want a true or false boolean instead of available/unavailable
    const buttonText = isAvailable ? "Add to order" : "SOLD OUT!";
    return (
      <li className="menu-fish">
        <img src={this.props.details.image} alt={this.props.details.name}/>
        <h3 className="fish-name">
        {this.props.details.name}
        <span className="price">{formatPrice(this.props.details.price)}</span>
        </h3>
        <p>{this.props.details.desc}</p>
        <button disabled={!isAvailable} onClick={() => this.props.addToOrder(this.props.index)} >{buttonText}</button>
      </li>
    )
  }
}

export default Fish

//I have NO IDEA why on the addToOrder function under the button's onClick event
//you have to put the passed down function into an arrow function. If you
//just put the function there it apparently auto-runs on page refresh. That makes
//NO SENSE but just do it that way I guess. If you end up in an infinate loop
//putting functions inside an anonymous arrow function may be a fix
