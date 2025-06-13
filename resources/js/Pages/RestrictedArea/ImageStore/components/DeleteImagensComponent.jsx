import React from "react";
import { IconButton } from "@mui/material";
import { FaTrash } from "react-icons/fa";
import Api from "../../../../api";
import { router } from "@inertiajs/react";

export function DeleteImagensComponent({ id }) {
    const handleDelete = async () => {
        const confirm = window.confirm("Tem certeza que deseja apagar essa imagem?");
        if (!confirm) return;

        try {
            await Api.delete(`restricted-area/imagens/${id}`);
            alert("Imagem apagada com sucesso.");
            router.reload();
        } catch (error) {
            console.error("Erro ao deletar imagem:", error);
            alert("Erro ao deletar imagem.");
        }
    };

    return (
        <IconButton onClick={handleDelete} color="error">
            <FaTrash />
        </IconButton>
    );
}