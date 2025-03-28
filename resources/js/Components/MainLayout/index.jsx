import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Header from "../Header";
import { Inertia } from "@inertiajs/inertia";
import { useUserContext } from "../../Hooks/useUserContext";
import { BreadCrumbs } from "../BreadCrumbs";
import { ToastContainer } from "../toast";
import { useTheme } from "@mui/material";

export default function MainLayout({ children }) {
    const { setCurrentUrl, url } = useUserContext();

    const theme = useTheme();

    useEffect(() => {
        const handlePageChange = () => {
            const newPath = window.location.pathname;
            setCurrentUrl(newPath);
        };

        Inertia.on("navigate", handlePageChange);
    }, [url]);

    return (
        <Box
            margin={-1}
            sx={{
                minHeight: "100vh",
                background: theme.palette.backgroundMain,
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
            }}
        >
            <Header />
            <BreadCrumbs currentUrl={url} />
            <ToastContainer />
            <main>{children}</main>
        </Box>
    );
}
