import React, { useContext } from "react";
import { useUserContext } from "../../Hooks/useUserContext";
import { Box, Typography, IconButton } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import LogoutIcon from "@mui/icons-material/Logout";
import { CustomLink } from "../../Components/CustomLink";
import { useResponsive } from "../../Hooks/useResponsive";
import { ThemeContext } from "../../Context/ThemeContext";
import { LightMode } from "@mui/icons-material";
import { MdOutlineDarkMode } from "react-icons/md";
import { useTheme } from "@mui/material";
import { FaRegUser } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";

export default function Header() {
    const { user } = useUserContext();
    const { isDesktop } = useResponsive("sm");
    const { mode, toggleTheme } = useContext(ThemeContext);
    const theme = useTheme();
    console.log("user: ", user)
    return (
        <AppBar
            position="static"
            color="primary"
            enableColorOnDark
            p={1}
            sx={{
                display: "flex",
                flexGrow: "1",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: theme.palette.header,
                minHeight: "7vh",
                padding: "0 20px",
            }}
        >
            <CustomLink href="/">
                <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Box
                        sx={{
                            border: "1x solid white",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: "10px",
                        }}
                    >
                        <IoDocumentTextOutline size={40} />
                    </Box>
                    <Typography
                        variant="h6"
                        component="div"
                        color="white"
                        fontWeight="bold"
                        sx={{
                            fontSize: {
                                xs: "14px",
                                sm: "12px",
                                md: "15px",
                                lg: "16px",
                            },
                        }}
                    >
                        {isDesktop
                            ? "D0cAssistent"
                            : "D0cAssistent"}
                    </Typography>
                </Box>
            </CustomLink>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                }}
            >
                {user == null && (
                    <CustomLink href="/login">
                        <Box display="flex" alignItems="end" gap={1}>
                            <FaRegUser fontSize={isDesktop ? 27 : 20} />
                            <Typography
                                fontWeight="bold"
                                color="white"
                                sx={{
                                    fontSize: {
                                        xs: "10px",
                                        sm: "11px",
                                        md: "15px",
                                        lg: "16px",
                                    },
                                }}
                            >
                                Autenticação
                            </Typography>
                        </Box>
                    </CustomLink>
                )}

                {user && (
                    <>
                        <CustomLink href="/restricted-area">
                            <Typography
                                color="white"
                                sx={{
                                    fontSize: {
                                        xs: "10px",
                                        sm: "11px",
                                        md: "15px",
                                        lg: "16px",
                                    },
                                    fontWeight: "bold",
                                }}
                            >
                                {user.name}
                            </Typography>
                        </CustomLink>

                        <CustomLink href="/logout">
                            <IconButton color="inherit">
                                <LogoutIcon />
                            </IconButton>
                        </CustomLink>
                    </>
                )}
                <IconButton onClick={toggleTheme} color="inherit">
                    {mode === "light" ? <MdOutlineDarkMode /> : <LightMode />}
                </IconButton>
            </Box>
        </AppBar>
    );
}
