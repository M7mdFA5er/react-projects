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

    case 'GET_TOTALS': {
      let { total, amount } = state.cart.reduce((cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        const itemTotal = price * amount;
        cartTotal.total += itemTotal;
        cartTotal.amount += amount;
        return cartTotal;
      },
        { total: 0, amount: 0 })

      total = parseFloat(total.toFixed(2))

      return { ...state, total, amount }
    }

    case 'LOADING': {
      return { ...state, loading: true };
    }

    case 'DISPLAY_ITEMS': {
      return { ...state, loading: false, cart: payload };
    }

    default:
      return state;
  }
}


export default reducer;