import React from "react";
import { IconButton } from "@mui/material";
import { FaRegFileImage } from "react-icons/fa";
import Api from "../../../../api";

export function ShowImagensComponent({ imagemId }) {
    const handleClickImage = async () => {
        try {
            const response = await Api.get(
                `restricted-area/download/imagens/${imagemId}`,
                {
                    responseType: "blob", // importante para arquivos binários como imagens
                }
            );

            // Detecta o tipo MIME da imagem
            const contentType =
                response.headers["content-type"] || "image/jpeg";

            // Cria um Blob com o tipo correto
            const file = new Blob([response.data], { type: contentType });

            // Cria uma URL temporária para o blob
            const fileURL = URL.createObjectURL(file);

            // Abre a imagem em uma nova aba
            window.open(fileURL, "_blank");
        } catch (error) {
            console.error("Erro ao abrir a imagem:", error);
            alert("Erro ao abrir a imagem.");
        }
    };

    return (
        <>
            <IconButton onClick={handleClickImage} color="primary">
                <FaRegFileImage />
            </IconButton>
        </>
    );
}
