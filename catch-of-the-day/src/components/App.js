import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';

class App extends React.Component{

  constructor() {
    //have to inherit methods and such from the React.Component object
    super();

    //have to bind each class method (except render) to the component
    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);

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

    this.setState({fishes: fishes });
  }

  loadSamples() {
    this.setState({fishes: sampleFishes});
  }

  //need to loop over fish subobject from state and display
  //<Fish /> component for each. Use Object.keys(this.state.fishes)
  //to return an array of just the keys from the object. To
  //loop through that array and do a <Fish /> function for
  //each key you use map (which only works for arrays).
  //inside the map you apply a function to each subobject
  //and pass both the key (to identify each Fish component)
  //and a portion of the fishes object as a "details" prop that
  //corresponds to that subobject fish within the fishes object.
  //whew! That's fucking complicated!!

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            {
              Object
                .keys(this.state.fishes)
                  .map((key) =>
                    <Fish
                      key={key}
                      details={this.state.fishes[key]}
                    />
                  )
            }
          </ul>
        </div>
        <Order />
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
      </div>
    )
  }
}

export default App
