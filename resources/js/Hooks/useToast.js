import { useContext } from "react";
import { ToastContext } from "../Context/ToastContext";

export const useToast = () => {
    const { state, toastOpen, toastClose } = useContext(ToastContext);

    if (!state) {
        throw new Error("useToast must be used within a ToastProvider");
    }

    return { state, toastOpen, toastClose };
};
