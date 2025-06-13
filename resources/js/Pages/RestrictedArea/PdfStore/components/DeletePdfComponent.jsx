import React from "react";
import { IconButton } from "@mui/material";
import { FaTrash } from "react-icons/fa";
import Api from "../../../../api";
import { router } from "@inertiajs/react";

export function DeletePdfComponent({ pdfId }) {
    const handleDelete = async () => {
        const confirm = window.confirm("Tem certeza que deseja apagar este PDF?");
        if (!confirm) return;

        try {
            await Api.delete(`restricted-area/pdf-store/${pdfId}`);
            alert("PDF apagado com sucesso.");
            router.reload();
        } catch (error) {
            console.error("Erro ao deletar o PDF:", error);
            alert("Erro ao deletar o PDF.");
        }
    };

    return (
        <IconButton onClick={handleDelete} color="error">
            <FaTrash />
        </IconButton>
    );
}