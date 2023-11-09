import {
  FETCH_ITEM_LOADING,
  FETCH_ITEM_SUCCESS,
  FETCH_ITEM_ERROR,
  FETCH_CATEGORIES_LOADING,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_ERROR,
  FETCH_DETAIL_ITEM_LOADING,
  FETCH_DETAIL_ITEM_SUCCESS,
  FETCH_DETAIL_ITEM_ERROR,
} from "./actionType";

let baseUrl = "http://localhost:3000/public"

export const fetchItemsLoading = () => ({
  type: FETCH_ITEM_LOADING,
});

export const fetchItemsSuccess = (items) => ({
  type: FETCH_ITEM_SUCCESS,
  payload: items,
});

export const fetchItemsError = (error) => ({
  type: FETCH_ITEM_ERROR,
  payload: error,
});

export const fetchCategoriesLoading = () => ({
  type: FETCH_CATEGORIES_LOADING,
});

export const fetchCategoriesSuccess = (categories) => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: categories,
});

export const fetchCategoriesError = (error) => ({
  type: FETCH_CATEGORIES_ERROR,
  payload: error,
});

export const fetchDetailItemLoading = () => ({
  type: FETCH_DETAIL_ITEM_LOADING,
});

export const fetchDetailItemSuccess = (detailItem) => ({
  type: FETCH_DETAIL_ITEM_SUCCESS,
  payload: detailItem,
});

export const fetchDetailItemError = (error) => ({
  type: FETCH_DETAIL_ITEM_ERROR,
  payload: error,
});

export const fetchItems = () => {
  return async function (dispatch) {
    dispatch(fetchItemsLoading());
    try {
      const response = await fetch(baseUrl + "/items");
      const data = await response.json();
      if (!response.ok) {
        throw data;
      }
      dispatch(fetchItemsSuccess(data));
    } catch (error) {
      dispatch(fetchItemsError(error.message));
    }
  };
};

export const fetchCategories = () => {
  return async function (dispatch) {
    dispatch(fetchCategoriesLoading());
    try {
      const response = await fetch(baseUrl + "/category");
      const data = await response.json();
      if (!response.ok) {
        throw data;
      }
      dispatch(fetchCategoriesSuccess(data));
    } catch (error) {
      dispatch(fetchCategoriesError(error.message));
    }
  };
};
export const fetchDetailItem = (itemId) => {
  return async function (dispatch) {
    dispatch(fetchDetailItemLoading());
    try {
      const response = await fetch(baseUrl + `/item/${itemId}`);
      const data = await response.json();
      if (!response.ok) {
        throw data;
      }
      dispatch(fetchDetailItemSuccess(data));
    } catch (error) {
      dispatch(fetchDetailItemError(error.message));
    }
  };
};
