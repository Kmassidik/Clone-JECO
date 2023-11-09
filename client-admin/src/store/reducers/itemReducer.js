import {
  FETCH_ITEM_LOADING,
  FETCH_ITEM_SUCCESS,
  FETCH_ITEM_ERROR,
  ADD_ITEM,
  EDIT_ITEM,
  DELETE_ITEM,
  RESET_ITEM,
} from "../actions/actionType";

const initialState = {
  data: [],
  isLoading: true,
  error: null,
  detailItem: {},
  message: ""
};

export function itemReducer(state = initialState, action) {
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
    case ADD_ITEM:
      return {
        ...state,
        loading: false,
        error: null,
        detailItem: action.payload,
      };
    case EDIT_ITEM:
      return {
        ...state,
        loading: false,
        error: null,
        detailItem: action.payload,
      };
    case DELETE_ITEM:
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload,
      };
    case RESET_ITEM:
      return {
        ...state,
        error: null,
        detailItem: {},
        message: ""
      };
    default:
      return state;
  }
}
