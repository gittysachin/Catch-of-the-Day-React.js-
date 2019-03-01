import React from 'react';
import PropTypes from 'prop-types';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {

/*
  constructor(){
    super();
    console.log('Gonna create a constructor');
    this.goToStore = this.goToStore.bind(this);
  }

  goToStore(event){
    console.log("Going to Store...");
    // Stop the form from submittimg.
    event.preventDefault();
    //if we console.log(this) here the nwe will get error  --- so we need to do binding ----- so we dis constructor thing
    // get the text from that input

  }
  instead of this we are going to do it with arrow function
*/

  myInput = React.createRef();

  static propTypes = {
    history: PropTypes.object
  };

  goToStore = event => {
    console.log("Going to store");
    // stop the form from submitting
    event.preventDefault();
    // get the text from that input
    const storeName = this.myInput.current.value;
    // change the page to /store/whatever-they-enter without having to refresh the page so we are goona use the react-router
    this.props.history.push(`/store/${storeName}`);
  };

  handleClick(){
    alert("Welcome to Store");
  }
  render(){
    // return <p>hey!!! your paraggraph</p>
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter a Store</h2>
        {/* if we addparanthesis to the hanleClick function given below then it will load on the page load */}
        <button onClick={this.handleClick}>Click Me!!</button>
        <input
          type="text"
          ref={this.myInput}
          required
          placeholder="Store Name"
          defaultValue={getFunName()}
        />
        <button type="submit">Visit Store -></button>
      </form>
    );
  }
}

export default StorePicker;
