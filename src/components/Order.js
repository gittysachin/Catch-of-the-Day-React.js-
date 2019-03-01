import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

export default class Order extends React.Component {
  static propTypes = {
    fishes: PropTypes.object,
    order: PropTypes.object,
    removeFromOrder: PropTypes.func
  };
  renderOrder = key => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const isAvailable = fish && fish.status === 'available';
    // make sure the fish is loaded before we continue!
    if(!fish) return null;
    if(!isAvailable){
      return (
        <CSSTransition classNames="order" key={key} timeout={{ enter: 250, exit: 250 }}>
          <li key={key}>Sorry {fish ? fish.name : 'fish'} is no longer avaliable</li>
        </CSSTransition>
      );
    }
    return (
      // double curly brackets - first is for javascript and the second is just an object literals
      <CSSTransition classNames="order" key={key} timeout={{ enter: 250, exit: 250 }}>
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition classNames="count" key={count} timeout={{ enter: 250, exit: 250}}>
                <span>{count} </span>
              </CSSTransition>
            </TransitionGroup>
            lbs {fish.name} {formatPrice(count * fish.price)}
            <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
          </span>
        </li>
      </CSSTransition>
    );
  };
  render(){
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === 'available';
      if(isAvailable){
        return prevTotal + count * fish.price ;
      }
      return prevTotal;
    }, 0);
    // reduce is sort of like a for loop or map but instead of returning a new item from like a map or instead of looping over and updating external variable like a for loop would
    // a reduce will take in some data and return like a tally... it can actually do a whole bunch of stuff
    return (
      <div className="order-wrap">
        <h2>Order</h2>
        {/* <ul className="order">
          {orderIds.map(this.renderOrder)}
        </ul> */}
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">
        Total:
          <strong> {formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}
