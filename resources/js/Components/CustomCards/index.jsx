import React from "react";
import { Card, Typography, CardContent, Box, Stack } from "@mui/material";
import { CustomLink } from "../CustomLink";
import { useTheme } from "@mui/material";

export function CardItem({ icon, title, url, desc, onClick }) {
    const theme = useTheme();

    const Content = () => {
        return (
            <Card
                sx={{
                    cursor: "pointer",
                    width: "100%",
                    height: { xs: 150, sm: 180, md: 220 },
                    marginRight: 1,
                    marginBottom: 2,
                    borderRadius: 2,
                    boxShadow: `${theme.palette.shadowCards} 3px 5px 8px 0px`,
                    // boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    ":hover": {
                        transform: "scale(1.05)",
                    },
                }}
                onClick={onClick}
            >
                <CardContent>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexDirection="column"
                        width="100%"
                        height={{
                            xs: "70px",
                            sm: "100px",
                            md: "120px",
                        }}
                        mb={1}
                    >
                        {icon}
                    </Box>
                    <Box height="20%">
                        <Typography
                            lineHeight={1.2}
                            fontSize={{
                                xs: "10px",
                                sm: "12px",
                                md: "16px",
                            }}
                            textAlign="center"
                            fontWeight="500"
                        >
                            {title}
                        </Typography>
                    </Box>
                    <Box mt={1}>
                        <Typography
                            lineHeight={1.1}
                            fontSize={{
                                xs: "9px",
                                sm: "10px",
                                md: "12px",
                            }}
                            textAlign="center"
                            color="textSecondary"
                        >
                            {desc}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        );
    };

    return (
        <Stack>
            {url ? (
                <CustomLink href={url}>
                    <Content />
                </CustomLink>
            ) : (
                <Content />
            )}
        </Stack>
    );
}
