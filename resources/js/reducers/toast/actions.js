export const ActionsTypes = {
    SET_TOAST: "SET_TOAST",
    CLEAR_TOAST: "CLEAR_TOAST",
};

export function setToast(type, message, bind) {
    const id = new Date().getTime();
    return {
        type: ActionsTypes.SET_TOAST,
        payload: { id, message, type, show: true, bind: bind },
    };
}

export function clearToast(id) {
    return {
        type: ActionsTypes.CLEAR_TOAST,
        payload: id,
    };
}
