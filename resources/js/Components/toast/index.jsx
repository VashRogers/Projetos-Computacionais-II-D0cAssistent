import React from "react";
import { ToastMapper } from "./toastMapper";
import { Stack } from "@mui/material";

export const ToastContainer = () => {
    return (
        <Stack spacing={7}>
            <ToastMapper />
        </Stack>
    );
};
