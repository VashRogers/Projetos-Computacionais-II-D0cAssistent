/* eslint-disable no-unused-vars */
import {
    Alert,
    Box,
    Button,
    InputLabel,
    Modal,
    TextField,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import Api from "../../../../api";

export function SendImage() {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [ImageFile, setImageFile] = useState(null);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setMessage("");
        setError("");
        setTitle("");
        setDescription("");
        setImageFile(null);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const allowedImageTypes = [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp",
        ];

        if (file && allowedImageTypes.includes(file.type)) {
            setImageFile(file); // considere renomear para `setSelectedFile`
            setError("");
        } else {
            setImageFile(null);
            setError(
                "Apenas arquivos de imagem (.jpg, .png, .gif, .webp) são permitidos."
            );
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!ImageFile) {
            setError("Selecione um arquivo do tipo de imagem.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("image_file", ImageFile);

        try {
            const response = await Api.post("restricted-area/imagens", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response) {
                setMessage("Imagem enviada com sucesso!");
                setError("");
                setTitle("");
                setDescription("");
                setImageFile(null);
            }
        } catch (err) {
            setError("Erro ao enviar PDF.");
            setMessage("");
        }
    };

    return (
        <>
            <Button
                variant="contained"
                onClick={handleOpen}
                sx={{ width: 150 }}
            >
                Enviar Imagem
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
                        Enviar Imagem
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
                            label="Descrição"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            multiline
                            rows={3}
                        />

                        <Box>
                            <InputLabel>Imagem</InputLabel>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                required
                            />
                        </Box>

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
                                disabled={!ImageFile || !title}
                            >
                                Enviar Imagem
                            </Button>
                            <Button
                                onClick={handleClose}
                                color="error"
                                variant="outlined"
                            >
                                Cancelar
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}
