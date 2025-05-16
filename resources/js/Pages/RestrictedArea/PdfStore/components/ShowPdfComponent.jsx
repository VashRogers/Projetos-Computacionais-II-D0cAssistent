import React from "react";
import { IconButton } from "@mui/material";
import { FaRegFileImage } from "react-icons/fa";
import Api from "../../../../api";

export function ShowPdfComponent({ pdfId }) {
    const handleClickPDf = async () => {
        try {
            const response = await Api.get(
                `restricted-area/download/pdf/${pdfId}`,
                {
                    responseType: "blob", // necessário para arquivos binários
                }
            );

            // Cria uma URL temporária para o blob
            const file = new Blob([response.data], { type: "application/pdf" });
            const fileURL = URL.createObjectURL(file);

            // Abre em nova aba
            window.open(fileURL, "_blank");
        } catch (error) {
            console.error("Erro ao abrir o PDF:", error);
            alert("Erro ao abrir o PDF.");
        }
    };

    return (
        <>
            <IconButton onClick={handleClickPDf} color="primary">
                <FaRegFileImage />
            </IconButton>
        </>
    );
}
