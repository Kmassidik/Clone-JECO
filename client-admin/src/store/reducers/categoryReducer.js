import {
  FETCH_CATEGORIES_LOADING,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_ERROR,
  ADD_CATEGORIES,
  RESET_CATEGORY,
  EDIT_CATEGORY,
  DELETE_CATEGORY,
} from "../actions/actionType";

const initialState = {
  data: [],
  loading: false,
  error: null,
  detailCategory: {},
  message: "",
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case FETCH_CATEGORIES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_CATEGORIES:
      return {
        ...state,
        loading: false,
        error: null,
        detailCategory: action.payload,
      };
    case EDIT_CATEGORY:
      return {
        ...state,
        loading: false,
        error: null,
        detailCategory: action.payload,
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload,
      };
    case RESET_CATEGORY:
      return {
        ...state,
        error: null,
        message: "",
        detailCategory: {},
      };
    default:
      return state;
  }
};

export default categoriesReducer;
