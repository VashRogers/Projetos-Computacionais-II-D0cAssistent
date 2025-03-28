import React from "react";
import {
    Box,
    Divider,
    IconButton,
    Modal,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import { FiX } from "react-icons/fi";
import { useTheme } from "@mui/material";

export function CustomModal({ open, onClose, modalTitle, children }) {
    const theme = useTheme();

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "75%",
        maxHeight: "90vh",
        display: "block",
        overflowY: "scroll",
        bgcolor: "white",
        border: "0px solid #000",
        backgroundColor: theme.palette.backgroundContainer,
        borderRadius: 1,
        boxShadow: 24,
        p: 2,
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box component={Paper} sx={{ ...style }}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography
                        component="h1"
                        variant="h6"
                        fontSize={16}
                        sx={{ wordWrap: "break-word", maxWidth: { xs: "70%" } }}
                    >
                        {modalTitle}
                    </Typography>

                    <IconButton onClick={onClose}>
                        <FiX />
                    </IconButton>
                </Stack>

                <Divider sx={{ my: { xs: 0.5, sm: 1 } }} />

                {children}
            </Box>
        </Modal>
    );
}
