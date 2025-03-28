import React, { createContext, useReducer } from "react";
import { reducer, setToast, clearToast } from "../reducers/toast";

const initialState = {
    toasts: [],
};

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const toastOpen = (type, message, bind) => {
        dispatch(setToast(type, message, bind));
    };

    const toastClose = (id) => {
        dispatch(clearToast(id));
    };

    return (
        <ToastContext.Provider
            value={{
                toastOpen,
                toastClose,
                state,
            }}
        >
            {children}
        </ToastContext.Provider>
    );
};
