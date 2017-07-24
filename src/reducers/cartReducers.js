"use strict"

// let state = { cart: [] };
export function cartReducers(state={ cart: [] }, action) {
  switch(action.type) {
    case 'ADD_TO_CART':
      return { cart: [...state.cart, action.payload]};
    case 'DELETE_CART_ITEM':
      const indexToDelete = [...state.cart].findIndex(function(cartItem) {
        return cartItem._id === action.payload._id; 
      });
      const deleted = [...state.cart];
      deleted.splice(indexToDelete, 1);
      return { cart: deleted }
    case 'ADD_QUANTITY_CART_ITEM':
      let itemsThatWillUpdate = [...state.cart];
      let indexToUpdate = itemsThatWillUpdate.findIndex(cartItem => cartItem._id == action.payload._id);
      itemsThatWillUpdate[indexToUpdate].quantity += 1;
      return { cart: itemsThatWillUpdate }
    case 'SUBTRACT_QUANTITY_CART_ITEM':
      itemsThatWillUpdate = [...state.cart];
      indexToUpdate = itemsThatWillUpdate.findIndex(cartItem => cartItem._id == action.payload._id);
      if (itemsThatWillUpdate[indexToUpdate].quantity > 0) itemsThatWillUpdate[indexToUpdate].quantity -= 1;
      return { cart: itemsThatWillUpdate }
    default:
      return state;
  }
}