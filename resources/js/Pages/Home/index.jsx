/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Box, Typography, Container, Paper } from "@mui/material";

export default function Home() {
    return (
        <Box
            margin={-1}
            minHeight="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            // bgcolor="#f9f9f9"
        >
            <Container maxWidth="sm">
                <Paper elevation={3} sx={{ padding: 4, borderRadius: 4 }}>
                    <Typography
                        variant="h4"
                        gutterBottom
                        fontWeight="bold"
                        textAlign="center"
                    >
                        Bem-vindo ao DocAssistant
                    </Typography>
                    <Typography variant="body1" paragraph textAlign="justify">
                        O <strong>DocAssistant</strong> é uma aplicação
                        desenvolvida para ajudar você a organizar seus arquivos
                        de forma simples e segura. Aqui, você pode armazenar{" "}
                        <strong>PDFs, imagens e textos</strong> importantes e
                        acessá-los de qualquer lugar com praticidade.
                    </Typography>
                    <Typography variant="body1" paragraph textAlign="justify">
                        Para acessar o sistema e começar a utilizar os recursos,
                        clique no menu do <strong>header</strong> onde está
                        escrito <em>"Autenticação"</em>. Lá, você será redirecionado
                        para a área restrita da plataforma.
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        textAlign="center"
                    >
                        Simples. Rápido. Seguro.
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
}
