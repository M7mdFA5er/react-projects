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

    default:
      return state;
  }
}


export default reducer;