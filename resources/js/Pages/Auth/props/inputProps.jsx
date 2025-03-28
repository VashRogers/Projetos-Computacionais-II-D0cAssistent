import React from "react";
import { InputAdornment } from "@mui/material";
import { Person, Lock, Visibility, VisibilityOff } from "@mui/icons-material";

const loginInputProps = {
    startAdornment: (
        <InputAdornment position="start">
            <Person fontSize="small" />
        </InputAdornment>
    ),
};

const getPasswordInputProps = (showPassword, handleClickShowPassword) => ({
    startAdornment: (
        <InputAdornment position="start">
            <Lock fontSize="small" />
        </InputAdornment>
    ),
    endAdornment: (
        <InputAdornment position="end">
            <span
                onClick={handleClickShowPassword}
                style={{ cursor: "pointer" }}
                data-testid="toggle-password-visibility"
            >
                {showPassword ? (
                    <VisibilityOff fontSize="small" />
                ) : (
                    <Visibility fontSize="small" />
                )}
            </span>
        </InputAdornment>
    ),
});

export { loginInputProps, getPasswordInputProps };
