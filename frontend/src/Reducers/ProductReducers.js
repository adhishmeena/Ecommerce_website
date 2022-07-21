import {
  PRODUCT_Details_FAIL,
  PRODUCT_Details_REQUEST,
  PRODUCT_Details_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../Constants/productConstant";

export const ProductListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//whenevere we create any new reducer , It need to be added in our store
export const ProductDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_Details_REQUEST:
      return { loading: true, ...state };
    case PRODUCT_Details_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_Details_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
