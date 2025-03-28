import React, { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTheme } from "@emotion/react";
import { getLoginStyles } from "./styles";
import Api from "../../api"
import { loginInputProps, getPasswordInputProps } from "./props/inputProps";
import { CircularProgress } from "@mui/material";
import { useUserContext } from "../../Hooks/useUserContext";

export default function Login() {
    const { setUser } = useUserContext();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const theme = useTheme();
    const styles = getLoginStyles(theme, true);

    useEffect(() => {
        setUser(null);
    }, [setUser]);

    const handleLogin = async () => {
        if (!name || !password) {
            setErrors({
                name: !name,
                password: !password,
                message: "Campo Obrigatório",
            });
            return;
        }

        setLoading(true);
        try {
            const response = await Api.post("/login", { name, password });

            if (response.status == 200) {
                router.visit("restricted-area");
            }
        } catch (err) {
            handleApiError(err);
        } finally {
            setLoading(false);
        }
    };

    const handleApiError = (error) => {
        setErrors({
            login: error.response?.data?.login,
            password: error.response?.data?.password,
            message: error.response?.data?.message || "Erro ao fazer login",
        });
    };

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <Box sx={styles.formContainer}>
            <Typography variant="h4" sx={{ mb: 3, mt: 3 }}>
                D0cAssistant
            </Typography>

            <Box sx={styles.inputContainer}>
                <TextField
                    required
                    size="small"
                    label="Nome"
                    id="name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={errors.login}
                    helperText={errors.login ? errors.message : ""}
                    InputProps={loginInputProps}
                    sx={styles.textField}
                />
            </Box>

            <Box sx={styles.inputContainer}>
                <TextField
                    error={Boolean(errors.password)}
                    required
                    helperText={errors.password ? errors.message : ""}
                    size="small"
                    sx={styles.textField}
                    label="Password"
                    id="password"
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={getPasswordInputProps(
                        showPassword,
                        handleClickShowPassword
                    )}
                />
            </Box>

            <Box sx={styles.buttonContainer}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                    sx={styles.button}
                    disabled={loading}
                >
                    {loading ? (
                        <CircularProgress
                            size={24}
                            sx={styles.circularProgress}
                        />
                    ) : (
                        "Login"
                    )}
                </Button>
            </Box>
        </Box>
    );
}
