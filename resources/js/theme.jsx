import { createTheme } from "@mui/material";

const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: { main: "#1976d2" },
        header: "#2E6ECC",
        text: { primary: "#161616", secondary:"#4a4a4a" },
        backgroundMain:
            "radial-gradient(at 100% 100%, rgb(197, 233, 252), rgb(255, 255, 255))",
        iconsColor: "#2E6ECC",
        shadowCards: "rgba(99, 99, 99, 0.25)",
        backgroundContainer: "#FFFF",
        shadowContainer: 8,
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#161616",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#161616",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#161616",
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    "&.Mui-focused": {
                        color: "#161616",
                    },
                    "&.MuiInputLabel-shrink": {
                        color: "#161616",
                    },
                },
            },
        },
        MuiFormLabel: {
            styleOverrides: {
                asterisk: {
                    color: "#d32f2f",
                },
            },
        },
    },
});

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        backgroundMain: "#3a3a3a",
        header: "#1a1a1a",
        primary: { main: "#1976d2" },
        text: { primary: "#FFFF", secondary:"#c2c2c2" },
        iconsColor: "#2E6ECC",
        shadowCards: "rgba(0, 0, 0, 0.1)",
        backgroundContainer: "#252525",
        shadowContainer: 8,
        background: { default: "#1e1e1e", paper: "#1e1e1e" },
    },
    typography: {
        allVariants: {
            color: "#FFFFFF",
        },
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ffff",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ffff",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ffff",
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    "&.Mui-focused": {
                        color: "#dadada",
                    },
                    "&.MuiInputLabel-shrink": {
                        color: "#dadada",
                    },
                },
            },
        },
        MuiFormLabel: {
            styleOverrides: {
                asterisk: {
                    color: "#d74e4e",
                },
            },
        },
    },
});

export { lightTheme, darkTheme };
