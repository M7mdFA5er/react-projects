const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'CLEAR_CART': {
      return { ...state, cart: [] }
    }

    case 'REMOVE_ITEM': {
      const newCart = state.cart.filter((cartItem) => cartItem.id !== payload);
      return { ...state, cart: newCart }
    }

    case 'INCREASE_ITEM': {
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === payload) {
          return { ...cartItem, amount: cartItem.amount + 1 }
        }
        return cartItem;
      });
      return { ...state, cart: tempCart }
    }

    case 'DECREASE_ITEM': {
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === payload) {
          return { ...cartItem, amount: cartItem.amount - 1 }
        }
        return cartItem;
      }).filter((cartItem) => cartItem.amount !== 0)
      return { ...state, cart: tempCart }
    }

    default:
      return state;
  }
}


export default reducer;