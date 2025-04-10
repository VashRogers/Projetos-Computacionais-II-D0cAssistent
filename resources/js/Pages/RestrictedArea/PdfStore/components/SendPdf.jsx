import { Alert, Box, Button, InputLabel, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import Api from "../../../../api";

export function SendPdf() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [pdfFile, setPdfFile] = useState(null);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

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
        // eslint-disable-next-line no-unused-vars
        } catch (err) {
            setError("Erro ao enviar PDF.");
            setMessage("");
        }
    };

    return (
        <>
            {message && <Alert severity="success">{message}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
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

                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={!pdfFile || !title}
                >
                    Enviar PDF
                </Button>
            </Box>
        </>
    );
}
