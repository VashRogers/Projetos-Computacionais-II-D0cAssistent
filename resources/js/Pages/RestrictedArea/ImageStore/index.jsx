import React from "react";
import { ContainerForm } from "../../../Components/ContainerForm";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { CustomColors } from "../../../Constants/CustomColors";
import { FaRegFileImage } from "react-icons/fa";
import { ImagensDatagrid } from "./components/ImagensDatagrid";
import { SendImage } from "./components/SendImage";

export default function PdfStore({ imagens }) {
    return (
        <ContainerForm>
            <Box p={1}>
                <Box gap={0.5} display="flex" alignItems="center">
                    <FaRegFileImage size={50} color={CustomColors.primary} />
                    <Typography
                        variant="h4"
                        color={CustomColors.primary}
                        sx={{
                            fontSize: {
                                xs: "22px",
                                sm: "28px",
                            },
                        }}
                    >
                        Imagens
                    </Typography>
                </Box>

                <Divider />

                <Box mt={1}>
                    <Stack flexGrow={1} alignItems="flex-end">
                        <SendImage />
                    </Stack>

                    <Stack mt={1} />
                    <ImagensDatagrid rows={imagens} />
                </Box>
            </Box>
        </ContainerForm>
    );
}
