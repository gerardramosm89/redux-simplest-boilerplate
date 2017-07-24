import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel, Col, Row, Well, Button, ButtonGroup, Label } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { addToCart, deleteCartItem } from '../../actions/cartActions';

class Cart extends Component {
  handleDelete(_id) {
    const indexToDelete = this.props.cart.findIndex(function(cartItem) {
      return cartItem._id === _id; 
    });
    let newCart = this.props.cart;
    newCart.splice(indexToDelete, 1);
    this.props.deleteCartItem(newCart);
    this.forceUpdate();
  }
  renderCart() {
    if (this.props.cart.length === 0) {
      return <div>cart is empty</div>
    } else {
      return this.props.cart.map(cartItem => {
        return(
        <Panel key={cartItem.title}>
          <Row>
            <Col xs={12} sm={4}>
              <h6>{cartItem.title}</h6>
            </Col>
            <Col xs={12} sm={2}>
              <h6>{cartItem.price}</h6>
            </Col>
            <Col xs={12} sm={2}>
              <h6>qty. <Label bsStyle='success'>{cartItem.quantity}</Label></h6>
            </Col>
            <Col xs={6} sm={4}>
              <ButtonGroup style={{ minWidth:'30px'}}>
                <Button bsStyle='default' bsSize='small'>-</Button>
                <Button bsStyle='default' bsSize='small'>+</Button>
                <span>     </span>
                <Button onClick={this.handleDelete.bind(this, cartItem._id)} bsStyle='danger' bsSize='small'>Delete</Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Panel>
        );
      });
    }
  }
  render() {
    return (
      <div>
        <Panel header='Cart' bsStyle='primary'>
          {this.renderCart()}
        </Panel>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart.cart
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    deleteCartItem
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);