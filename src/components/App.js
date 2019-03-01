import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
  state = {
    fishes : {},
    order : {}
  };
  static propTypes = {
    match: PropTypes.object
  }
  // componentDidMount is a lifecycle event
  componentDidMount(){
    // here ref is different than the actual input refs tht we were talking about earlier.
    // refs in firebase are the sort of reference to a piece of data in the database
    const { params } = this.props.match;
    // first reinstate our local storage
    const localStorageRef = localStorage.getItem(params.storeId);
    if(localStorageRef){
      this.setState({ order : JSON.parse(localStorageRef) });
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context : this,
      state : 'fishes'
    });
  }
  componentDidUpdate(){
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));   /// key, value
  }
  componentWillUnmount(){
    base.removeBinding(this.ref);
  }
  addFish = fish => {
    // 1. Take a copy of the existing state
    const fishes = {...this.state.fishes};
    // 2. Add our new fish to that fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // this.state.fishes.push(fish);
    // 3. Set the new fishes object to the fishes
    this.setState({ fishes });
  };

  updateFish = (key, updatedFish) => {
    // 1. Take a copy of the current state
    const fishes = { ...this.state.fishes };
    // 2. Update the state
    fishes[key] = updatedFish;
    // 3. Set that to state
    this.setState({ fishes });
  }

  deleteFish = key =>{
    // follow those 3 steps
    const fishes = { ...this.state.fishes };
    // delete fishes.fish1;  --- this would not delete from firebase so we have to do null for this. null will work for both
    fishes[key] = null;
    this.setState({ fishes });
  }

  loadSampleFishes = () =>{
    this.setState({ fishes : sampleFishes });
  }

  addToOrder = key =>{
    // 1. Take a copy of state
    const order = { ...this.state.order };
    // 2. Either add to the order, or update the number in our Order
    // order.fish1 = order.fish1 + 1 || 1;
    order[key] = order[key] + 1 || 1;
    // 3. call setState to update our state object
    this.setState({order});
  }

  removeFromOrder = key =>{
    // 1. Take a copy of state
    const order = { ...this.state.order };
    // 2. Remove that item from order
    delete order[key];
    // 3. call setState to update our state object
    this.setState({order});
  }

  render() {
    return(
      <div className="catch-of-the-day">
        <div className="main">
          <Header tagline="Fresh Seafod Market" age={20} cool={true} />
          <ul className="fishes">
            {/*<Fish />
            <Fish />
            loop this process*/}
            {Object.keys(this.state.fishes).map(key =>
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            )}
          </ul>
        </div>
        {/* {...this.state} we can pass the whole state into component but we don't want it to access every date */}
        <Order order={this.state.order} fishes={this.state.fishes} removeFromOrder={this.removeFromOrder} />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          storeId={this.props.match.params.storeId}
        />
        {/* this is the way to comment in jsx */}
      </div>
    );
  }
}

export default App;
