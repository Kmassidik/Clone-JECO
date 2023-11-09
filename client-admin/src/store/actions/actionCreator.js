import {
  FETCH_ITEM_LOADING,
  FETCH_ITEM_SUCCESS,
  FETCH_ITEM_ERROR,
  FETCH_CATEGORIES_LOADING,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_ERROR,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  ADD_CATEGORIES,
  RESET_CATEGORY,
  EDIT_CATEGORY,
  DELETE_CATEGORY,
  ADD_ITEM,
  RESET_ITEM,
  EDIT_ITEM,
  DELETE_ITEM,
  ADD_ADMIN_SUCCESS,
  HANDLE_ERROR_ADMIN
} from "./actionType";

// let baseUrl = "http://localhost:3000/api";
let baseUrl = "https://api.devkmassidik.online/api";

// authentication
export const loginLoading = () => ({
  type: LOGIN_LOADING,
});

export const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

export const loginError = (error) => ({
  type: LOGIN_ERROR,
  payload: error,
});

export const addNewAdmin = (data) => ({
  type: ADD_ADMIN_SUCCESS,
  payload: data,
});

export const handleErrorAddAdmin = () => ({
  type: HANDLE_ERROR_ADMIN,
});

// items
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

export const addNewItems = (items) => ({
  type: ADD_ITEM,
  payload: items,
});

export const ediItems = (items) => ({
  type: EDIT_ITEM,
  payload: items,
});

export const deleteItems = (items) => ({
  type: DELETE_ITEM,
  payload: items,
});

export const handleErrorItems = () => ({
  type: RESET_ITEM,
});

// category
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

export const addCategories = (category) => ({
  type: ADD_CATEGORIES,
  payload: category,
});

export const editCategories = (category) => ({
  type: EDIT_CATEGORY,
  payload: category,
});

export const deleteCategories = (category) => ({
  type: DELETE_CATEGORY,
  payload: category,
});

export const handleErrorCategory = () => ({
  type: RESET_CATEGORY,
});

// login
export const login = (email, password) => {
  return async function (dispatch) {
    dispatch(loginLoading());
    try {
      const responses = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await responses.json();
      if (!responses.ok) {
        throw data;
      }
      localStorage.setItem("access_token", data.access_token);
      dispatch(loginSuccess(true));
    } catch (error) {
      dispatch(loginError(error.message));
    }
  };
};
export const addAdmin = (value) => {
  let { username, email, password, phoneNumber, address } = value;
  return async function (dispatch) {
    dispatch(loginLoading());
    try {
      const responses = await fetch(`${baseUrl}/add-admin`, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          phoneNumber,
          address,
        }),
      });
      const data = await responses.json();
      if (!responses.ok) {
        throw data;
      }
      dispatch(addNewAdmin(data));
    } catch (error) {
      dispatch(loginError(error.message));
    }
  };
};
// items
export const fetchItems = () => {
  return async function (dispatch) {
    dispatch(fetchItemsLoading());
    try {
      const response = await fetch(baseUrl + "/item", {
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      setTimeout(() => {
        dispatch(fetchItemsSuccess(data));
      }, 500);
    } catch (error) {
      dispatch(fetchItemsError(error.message));
    }
  };
};
export const addNewItem = (value) => {
  return async function (dispatch) {
    try {
      let { name, description, price, imgUrl, category, ingredients } = value;
      const responses = await fetch(baseUrl + "/item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify({
          name,
          description,
          price,
          imgUrl,
          category,
          ingredients,
        }),
      });
      const data = await responses.json();
      if (!responses.ok) {
        throw data;
      }
      dispatch(addNewItems(data));
      dispatch(fetchItems());
    } catch (error) {
      dispatch(fetchItemsError(error.message));
    }
  };
};
export const editNewItem = (value, id) => {
  return async function (dispatch) {
    try {
      console.log(value, "valuenya");
      let { name, description, price, imgUrl, category, ingredients } = value;
      const responses = await fetch(baseUrl + "/item/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify({
          name,
          description,
          price,
          imgUrl,
          category,
          ingredients,
        }),
      });
      const data = await responses.json();
      if (!responses.ok) {
        throw data;
      }
      dispatch(ediItems(data));
      dispatch(fetchItems());
    } catch (error) {
      dispatch(fetchItemsError(error.message));
    }
  };
};
export const deleteItem = (id) => {
  return async function (dispatch) {
    try {
      const responses = await fetch(baseUrl + "/item/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
      });
      const data = await responses.json();
      if (!responses.ok) {
        throw data;
      }
      dispatch(deleteItems(data));
      dispatch(fetchItems());
    } catch (error) {
      dispatch(fetchItemsError(error.message));
    }
  };
};
// categories
export const fetchCategories = () => {
  return async function (dispatch) {
    dispatch(fetchCategoriesLoading());
    try {
      const responses = await fetch(baseUrl + "/category", {
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
      });
      if (!responses.ok) {
        throw new Error("Internal Server Error");
      }
      const data = await responses.json();
      setTimeout(() => {
        dispatch(fetchCategoriesSuccess(data));
      }, 500);
    } catch (error) {
      dispatch(fetchCategoriesError(error.message));
    }
  };
};
export const addCategory = (name) => {
  return async function (dispatch) {
    try {
      const responses = await fetch(baseUrl + "/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify({ name }),
      });
      const data = await responses.json();
      if (!responses.ok) {
        throw data;
      }
      dispatch(addCategories(data));
      dispatch(fetchCategories());
    } catch (error) {
      dispatch(fetchCategoriesError(error.message));
    }
  };
};
export const editCategory = (name, id) => {
  return async function (dispatch) {
    try {
      const responses = await fetch(baseUrl + "/category/" + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify({ name }),
      });
      console.log(responses);
      const data = await responses.json();
      if (!responses.ok) {
        throw data;
      }
      dispatch(editCategories(data));
      dispatch(fetchCategories());
    } catch (error) {
      dispatch(fetchCategoriesError(error.message));
    }
  };
};
export const deleteCategory = (id) => {
  return async function (dispatch) {
    try {
      const responses = await fetch(baseUrl + "/category/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
      });
      const data = await responses.json();
      if (!responses.ok) {
        throw data;
      }
      dispatch(deleteCategories(data));
      dispatch(fetchCategories());
    } catch (error) {
      dispatch(fetchCategoriesError(error.message));
    }
  };
};
