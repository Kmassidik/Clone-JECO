import {
  ADD_ADMIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  HANDLE_ERROR_ADMIN,
} from "../actions/actionType";

// Initial state for the user reducer
const initialState = {
  isLogin: false,
  error: null,
  isLoading: false,
  message: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_LOADING:
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLogin: true,
        error: null,
        isLoading: true,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case ADD_ADMIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        message: action.payload,
      };
    case HANDLE_ERROR_ADMIN:
      return {
        ...state,
        isLogin: false,
        error: null,
        isLoading: false,
        message:''
      };
    default:
      return state;
  }
};

export default userReducer;
