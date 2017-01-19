import React from 'react';
import {formatPrice} from '../helpers';

class Order extends React.Component{
  constructor(){
    super()
    this.renderOrder = this.renderOrder.bind(this);
  }

  renderOrder(key){
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    if(!fish || fish.status === 'unavailable') {
      return (<li key={key}>Sorry, {fish ? fish.name : 'Fish'} is no longer available</li>)
    }
    return (
      <li key={key}>
        <span>{count}lbs {fish.name}</span>
        <span className="price">{formatPrice(count * fish.price)}</span>
      </li>
    )
  }

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce(
      (prevTotal, key) => {
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        const isAvailable = fish && fish.status === 'available'; //returns false if fish has falsy value
        if(isAvailable) {
          return prevTotal + (count * fish.price || 0)
        }
        return prevTotal //returns previous total if if function doesn't run
      }, 0);  //for some reason have to initialize the reduce function with a zero, which this apparently does

    return (
      <div className="order-wrap">
        <h2>Your Order</h2>
        <ul className="order">
          {orderIds.map(this.renderOrder)}
          <li className="total">
            <strong>Total: </strong>
            {formatPrice(total)}
          </li>
        </ul>
      </div>
    )
  }
}

export default Order

//More for the sake of learning that anything else, we're not
//doing seperate components for the individual fish orders.
//They're unlikely to be used elsewhere ever, and this shows
//how to use additional render functions.
