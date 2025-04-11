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

export function SendPdf() {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [pdfFile, setPdfFile] = useState(null);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setMessage("");
        setError("");
        setTitle("");
        setDescription("");
        setPdfFile(null);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === "application/pdf") {
            setPdfFile(file);
            setError("");
        } else {
            setPdfFile(null);
            setError("Apenas arquivos PDF são permitidos.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!pdfFile) {
            setError("Selecione um arquivo PDF.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("pdf_file", pdfFile);

        try {
            const response = await Api.post("restricted-area/pdfs", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response) {
                setMessage("PDF enviado com sucesso!");
                setError("");
                setTitle("");
                setDescription("");
                setPdfFile(null);
            }
        } catch (err) {
            setError("Erro ao enviar PDF.");
            setMessage("");
        }
    };

    return (
        <>
            <Button variant="contained" onClick={handleOpen} sx={{ width:150 }}>
                Enviar PDF
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
                        Enviar PDF
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
                            <InputLabel>Arquivo PDF</InputLabel>
                            <input
                                type="file"
                                accept="application/pdf"
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
                                disabled={!pdfFile || !title}
                            >
                                Enviar PDF
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
