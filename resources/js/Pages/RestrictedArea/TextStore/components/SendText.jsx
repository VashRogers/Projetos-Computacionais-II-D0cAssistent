import {
    Alert,
    Box,
    Button,
    Modal,
    TextField,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import Api from "../../../../api";

export function SendText() {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setMessage("");
        setError("");
        setTitle("");
        setText("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !text) {
            setError("Preencha todos os campos obrigatórios.");
            return;
        }

        try {
            const response = await Api.post("restricted-area/text", {
                title,
                text,
            });

            if (response) {
                setMessage("Texto enviado com sucesso!");
                setError("");
                setTitle("");
                setText("");
            }
        // eslint-disable-next-line no-unused-vars
        } catch (err) {
            setError("Erro ao enviar texto.");
            setMessage("");
        }
    };

    return (
        <>
            <Button variant="contained" onClick={handleOpen} sx={{ width: 150 }}>
                Enviar Texto
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}
                >
                    <Typography id="modal-title" variant="h6" component="h2">
                        Enviar Texto
                    </Typography>

                    {message && <Alert severity="success">{message}</Alert>}
                    {error && <Alert severity="error">{error}</Alert>}

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
                        <TextField
                            label="Título"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />

                        <TextField
                            label="Texto"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            multiline
                            rows={6}
                            required
                        />

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={!title || !text}
                            >
                                Enviar
                            </Button>
                            <Button onClick={handleClose} color="error" variant="outlined">
                                Cancelar
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}
