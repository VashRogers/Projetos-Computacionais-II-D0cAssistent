import { ActionsTypes } from "./actions.js";

export const reducer = (state, action) => {
    switch (action.type) {
        case ActionsTypes.SET_TOAST:
            return {
                toasts: [...state.toasts, action.payload],
            };
        case ActionsTypes.CLEAR_TOAST:
            return {
                toasts: state.toasts.filter(
                    (toast) => toast.id !== action.payload
                ),
            };
        default:
            return state;
    }
};
