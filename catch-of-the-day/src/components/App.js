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
    this.addToOrder = this.addToOrder.bind(this);

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

  //this method will be called from within the Fish component
  //and the argument is just the key corresponding to the particular
  // fish subobject. The reason we don't pass the fish up is because the
  //state with the fish data already lives up in the App, and the fish
  //component only has a copy of it. By passing the key, we can pick the
  //corresponding fish from the fish state that's already in the App

  addToOrder(key) {
    const order = {...this.state.order};
    order[key] = order[key] +1 || 1; //we use key instead of timestamp so each order for each fish (identified by key) either overwrites the previous ourder (by replacing it with an order for another pound) or creates a brand new order for 1 point if the key doesn't already have an order associated
    this.setState({order: order });
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
                      index={key}
                      details={this.state.fishes[key]}
                      addToOrder={this.addToOrder}
                    />
                  )
            }
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order}/>
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
      </div>
    )
  }
}

export default App

//the reason you assing key twice when passing props to fish (once as key and
// once as index) is because react won't allow you to access the key prop. It
//uses it itself and doesn't want you touching it. Go figure.
