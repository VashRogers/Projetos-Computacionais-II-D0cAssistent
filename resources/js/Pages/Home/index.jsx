import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { CustomLink } from "../../Components/CustomLink";

export default function Home() {
    return (
        <Box margin={-1}>
            <Stack
                display="flex"
                flexGrow={1}
                flexDirection="row"
                justifyContent="space-around"
                alignItems="center"
                bgcolor="#2E6ECC"
                p={1}
                sx={{ boxShadow: 2 }}
            >
                <Typography color="white" fontWeight="bold">
                    D0cAssistent
                </Typography>

                <CustomLink href="/restricted-area">
                    <Typography color="white">Área restrita</Typography>
                </CustomLink>
            </Stack>
        </Box>
    );
}
