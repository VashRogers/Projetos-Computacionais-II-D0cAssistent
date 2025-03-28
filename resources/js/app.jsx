import "./bootstrap";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import React from "react";
import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import { UserProvider } from "./Context/UserContext";
import { ToastProvider } from "./Context/ToastContext";
import { ThemeProvider } from "./Context/ThemeContext";
import { lightTheme } from "./theme";
import MainLayout from "./Components/MainLayout";

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
        return pages[`./Pages/${name}.jsx`];
    },
    setup({ el, App, props }) {
        const currentUrl = props.initialPage.component;
        const auth = props.initialPage.props.auth;

        createRoot(el).render(
            <ThemeProvider theme={lightTheme}>
                <UserProvider auth={auth} currentUrl={{ currentUrl }}>
                    <ToastProvider>
                        <MainLayout currentUrl={{}}>
                            <App {...props} />
                        </MainLayout>
                    </ToastProvider>
                </UserProvider>
            </ThemeProvider>
        );
    },
});
