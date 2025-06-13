import React from "react";
import { ContainerForm } from "../../../Components/ContainerForm";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { CustomColors } from "../../../Constants/CustomColors";
import { FiFileText } from "react-icons/fi";
import { TextDatagrid } from "./components/TextDatagrid";
import { SendText } from "./components/SendText";

export default function TextStore({ texts }) {

    return (
        <ContainerForm>
            <Box p={1}>
                <Box gap={0.5} display="flex" alignItems="center">
                    <FiFileText size={50} color={CustomColors.primary} />
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
                        Anotações
                    </Typography>
                </Box>

                <Divider />

                <Box mt={1}>
                    <Stack flexGrow={1} alignItems="flex-end">
                        <SendText />
                    </Stack>

                    <Stack mt={1} />
                    <TextDatagrid rows={texts} />
                </Box>
            </Box>
        </ContainerForm>
    );
}

