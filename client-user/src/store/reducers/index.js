import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import categoryReducer from "./categoryReducure";
import detailItemReducer from "./detailItemReducer";

const rootReducer = combineReducers({
  items: itemReducer,
  category: categoryReducer,
  itemDetail: detailItemReducer,
});

export default rootReducer;
