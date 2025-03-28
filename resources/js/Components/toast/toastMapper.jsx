import React from "react";
import { Toast } from "./toast";
import { useToast } from "../../Hooks/useToast";

export const ToastMapper = () => {
    const { state, toastClose } = useToast();
    const { toasts } = state;

    return toasts.map((toast) => (
        <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            show={toast.show}
            bind={toast.bind}
            onClose={() => toastClose(toast.id)}
        />
    ));
};
