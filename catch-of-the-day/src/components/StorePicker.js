import React from 'react';
import {getFunName} from '../helpers';


class StorePicker extends React.Component{
  goToStore(event){
    event.preventDefault();
    console.log("url changed");
    // const storeId = this.storeInput.value;
    console.log(`going to /store/${this.storeInput.value}`)
    this.context.router.transitionTo(`/store/${this.storeInput.value}`);  //this works since pulled in the router via context at the bottom of the file
  }

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore.bind(this)}>
      <h2>Please Enter a Store</h2>
      <input type="text" ref={(input) => {this.storeInput = input}} required placeholder="Store Name" defaultValue={getFunName()} />
      <button type="submit">Visit Store</button>
      </form>
    )
  }
}

//To use the react router in this component we need to pull it down from
//a parent compent <BrowserRouter>, which this component is nested
//in via the <App> component that calls it. Since it's already called
//higher in the stack you don't just import it at the top like
//you would when importing a function from an outside file. Instead
//use this contextTypes thing (notice the plural!). That's just the way you do it

StorePicker.contextTypes = {
  router: React.PropTypes.object
}

export default StorePicker;
