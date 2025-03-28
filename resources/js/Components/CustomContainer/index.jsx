import React from "react";
import { Container } from "@mui/material";

export default function CustomContainer({ children }) {
    return (
        <Container
            maxWidth="xl"
            disableGutters
            sx={{
                display: "flex",
                flexDirection: "column",
                flex: "1 0 auto",
                mt: { xs: "0rem", sm: "1rem" },
                padding: { xs: "0px 5px 0px 5px", sm: "0px 50px 0px 50px" },
            }}
        >
            {children}
        </Container>
    );
}
