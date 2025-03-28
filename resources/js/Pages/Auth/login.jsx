import React, { useState } from "react";
import { router } from "@inertiajs/react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Login() {
    const [values, setValues] = useState({
        name: "",
        password: "",
    });

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }

    const handleLogin = (e) => {
        e.preventDefault();
        if (!values.name || !values.password) {
            return;
        }

        router.post("/login", values);
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
            }}
        >
            <Typography variant="h4" sx={{ mb: 3 }}>
                Login
            </Typography>
            <Box sx={{ mb: 2 }}>
                <TextField
                    label="Nome"
                    id="name"
                    variant="outlined"
                    value={values.name}
                    onChange={handleChange}
                />
            </Box>
            <Box sx={{ mb: 2 }}>
                <TextField
                    label="Senha"
                    id="password"
                    variant="outlined"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                />
            </Box>
            <Button variant="contained" color="primary" onClick={handleLogin}>
                Login
            </Button>
        </Box>
    );
}
