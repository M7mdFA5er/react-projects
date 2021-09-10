const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'CLEAR_CART': {
      return { ...state, cart: [] }
    }

    default:
      return state;
  }
}


export default reducer;