import PRODUCTS from '../../data/dummy-data';

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')
};

export default (state = initialState, action) => {
  // switch (action.type) {
  //   case value:

  //   default:
  //     return state;
  // }
  return state;
};
