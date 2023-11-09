import {
  FETCH_ITEM_LOADING,
  FETCH_ITEM_SUCCESS,
  FETCH_ITEM_ERROR,
} from "../actions/actionType";

const initialState = {
  data: [],
  isLoading: true,
  error: null,
};

export default function itemReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ITEM_LOADING:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case FETCH_ITEM_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
