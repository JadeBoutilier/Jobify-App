import { /*useState,*/ useReducer, useContext, createContext } from "react";
import axios from "axios";

import reducer from "./reducer";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
} from "./actions";

//grabbing all info from local storage as soon as user is registered
const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userLocation = localStorage.getItem('location')

const initialState = {
  isLoading: false,
  showAlert: false,
  alertTest: "",
  alertType: "",
  user: user? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || "",
  jobLocation: userLocation || "",
  showSidebar: false,
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  //use State is replaced with useReducer
  const [state, /*setState*/ dispatch] = /*useState(initialState)*/ useReducer(
    reducer,
    initialState
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const addUserToLocalStorage = ({user, token, location}) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
    localStorage.setItem('location', location)
  }

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('location')
  }


  const setUpUser = async ({currentUser, endPoint, alertText}) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const {data} = await axios.post(`/api/v1/auth/${endPoint}`, currentUser);
      const { user, token, location } = data
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, location, alertText },
      });
      addUserToLocalStorage({user, token, location})
    } catch (error) {
      dispatch({ type: SETUP_USER_ERROR, payload: {msg: error.response.data.msg}})
    }
    clearAlert()
  }

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR})
  }

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER})
    removeUserFromLocalStorage()
  }

  const updateUser = async (currentUser) => {
    console.log(currentUser)
  }

  return (
    <AppContext.Provider
      value={{ ...state, displayAlert, clearAlert, setUpUser, toggleSidebar, logoutUser, updateUser}}
    >
      {children}
    </AppContext.Provider>
  );
};

//custom hook in order to by pass having to import useContext and AppContext
const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
