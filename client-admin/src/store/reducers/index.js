import { combineReducers } from "redux";
import { itemReducer } from "./itemReducer";
import categoryReducer from "./categoryReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  items: itemReducer,
  category: categoryReducer,
  login: userReducer
});

export default rootReducer;
