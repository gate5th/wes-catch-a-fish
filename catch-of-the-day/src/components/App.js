import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

class App extends React.Component{

  constructor() {
    //have to inherit methods and such from the React.Component object
    super();

    //have to bind each class method (except render) to the component
    this.addFish = this.addFish.bind(this);

    //same as getInitialState
    this.state = {
      fishes: {},
      order: {}
    }
  }

  addFish(fish) {  //modifies state when add a fish

    const fishes = {...this.state.fishes}; //copy state first in case screw up
    const timestamp = Date.now(); //create a timestampe to use as id
    fishes[`fish-${timestamp}`] = fish;  //adds new element to fishes (which is a copy of pre-transaction state)

    //this command actually updates the state. This refers to
    // the App component, setState is a react function that updates
    //the state. The argument is an object with a key being what
    //part of the state to update (the fishes subobject) and a value
    //showing what to replace that subobject with (our new fishes object)

    this.setState({fishes: fishes })
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
        </div>
        <Order />
        <Inventory addFish={this.addFish} />
      </div>
    )
  }
}

export default App
