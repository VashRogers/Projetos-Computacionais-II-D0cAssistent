import React from "react";
import { ContainerForm } from "../../../Components/ContainerForm";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { CustomColors } from "../../../Constants/CustomColors";
import { VscFilePdf } from "react-icons/vsc";
import { SendPdf } from "./components/SendPdf";
import { PdfsDatagrid } from "./components/PdfsDatagrid";

export default function PdfStore({ pdfs }) {

    return (
        <ContainerForm>
            <Box p={1}>
                <Box gap={0.5} display="flex" alignItems="center">
                    <VscFilePdf size={50} color={CustomColors.primary} />
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
                        PDFs
                    </Typography>
                </Box>

                <Divider />

                <Box mt={1}>
                    <Stack flexGrow={1} alignItems="flex-end">
                        <SendPdf />
                    </Stack>
                    
                    <Stack mt={1} />
                    <PdfsDatagrid rows={pdfs} />
                </Box>
            </Box>
        </ContainerForm>
    );
}
