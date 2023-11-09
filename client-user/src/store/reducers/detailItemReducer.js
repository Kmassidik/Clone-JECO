// src/detailItemReducer.js

// pindahin jadi satu di item
import {
  FETCH_DETAIL_ITEM_LOADING,
  FETCH_DETAIL_ITEM_SUCCESS,
  FETCH_DETAIL_ITEM_ERROR,
} from "../actions/actionType";

const initialState = {
  data: {},
  loading: false,
  error: null,
};

const detailItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DETAIL_ITEM_LOADING:
      return {
        ...state,
        loading: true,
      };
    case FETCH_DETAIL_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case FETCH_DETAIL_ITEM_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default detailItemReducer;
