import { /*useState,*/ useReducer, useContext, createContext } from "react";

import reducer from "./reducer";
import { DISPLAY_ALERT, CLEAR_ALERT } from "./actions";


const initialState = {
  isLoading: false,
  showAlert: false,
  alertTest: "",
  alertType: "",
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
    //use State is replaced with useReducer
  const [state, /*setState*/ dispatch] = /*useState(initialState)*/ useReducer(reducer, initialState);

  const displayAlert = () => {
    dispatch({type: DISPLAY_ALERT,
    })
    clearAlert()
  }

  const clearAlert = () => {
    setTimeout(() => {
        dispatch({type: CLEAR_ALERT,
        })
    }, 3000)
  }
  return (
    <AppContext.Provider value={{ ...state, displayAlert, clearAlert }}>{children}</AppContext.Provider>
  );
};

//custom hook in order to by pass having to import useContext and AppContext
const useAppContext = () => {
    return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext };
