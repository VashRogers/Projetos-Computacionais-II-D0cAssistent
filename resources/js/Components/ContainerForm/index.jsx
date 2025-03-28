import React from "react";
import CustomContainer from "../CustomContainer";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material";

export function ContainerForm({ children }) {
    const theme = useTheme();

    return (
        <CustomContainer>
            <Box
                p={{
                    xs: 1,
                    sm: "0px 10px 10px 10px",
                    md: "5px 10px 10px 10px",
                }}
                width="91%"
                sx={{
                    margin: "0 auto",
                    boxShadow: 3,
                    borderRadius: 2,
                    backgroundColor: theme.palette.backgroundContainer,
                    marginBottom: "2rem",
                    minHeight: "380px",
                }}
            >
                {children}
            </Box>
        </CustomContainer>
    );
}
