import React from "react";
import {
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Box,
    Divider,
} from "@mui/material";
import { useResponsive } from "../../Hooks/useResponsive";
import { useTheme } from "@mui/material";

export function CustomNavbar({ itens, title, selectedItem, setSelectedItem }) {
    const theme = useTheme();
    const { isDesktop } = useResponsive("sm");

    const styleMobile = {
        width: "85%",
        height: 50,
        margin: "0 auto",
        backgroundColor: theme.palette.backgroundContainer,
        borderRadius: 2,
        display: "flex",
        flexDirection: "row",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
        paddingLeft: 1,
        paddingRight: 1,
    };

    const styleDesktop = {
        minWidth: 200,
        height: "80vh",
        backgroundColor: theme.palette.backgroundContainer,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
        paddingLeft: 1,
        paddingRight: 1,
        marginTop: 3,
    };

    return (
        <Box sx={isDesktop ? styleDesktop : styleMobile}>
            <List
                sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: isDesktop ? "column" : "row",
                    gap: "2px",
                }}
            >
                {isDesktop && (
                    <>
                        <ListItem
                            sx={{
                                backgroundColor: "transparent",
                                paddingLeft: 1,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    color: theme.palette.text.primary,
                                    minWidth: 28,
                                }}
                            >
                                {title.icon()}
                            </ListItemIcon>
                            <ListItemText
                                primary={title.label}
                                sx={{ opacity: 1, transition: "opacity 0.5s" }}
                                primaryTypographyProps={{
                                    sx: {
                                        fontSize: 14,
                                        color: theme.palette.text.primary,
                                    },
                                }}
                            />
                        </ListItem>
                        <Divider sx={{ marginBottom: 2 }} />
                    </>
                )}

                {itens.map(({ id, label, icon }) => (
                    <ListItem
                        key={id}
                        onClick={() => setSelectedItem(id)}
                        selected={selectedItem === id}
                        sx={{
                            backgroundColor:
                                selectedItem === id
                                    ? theme.palette.mode === "dark"
                                        ? theme.palette.action.selected
                                        : "#EDF4FE"
                                    : "transparent",
                            borderRadius: 2,
                            marginBottom: isDesktop ? 1 : 0,
                            "&:hover": {
                                backgroundColor: theme.palette.action.hover,
                                transition: "0.4s",
                            },
                            paddingLeft: 1,
                            cursor: "pointer",
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                color:
                                    selectedItem === id
                                        ? "#458fef"
                                        : theme.palette.text.primary,
                                minWidth: isDesktop ? 40 : 20,
                            }}
                        >
                            {icon()}
                        </ListItemIcon>
                        <ListItemText
                            primary={label}
                            sx={{ opacity: 1, transition: "opacity 0.5s" }}
                            primaryTypographyProps={{
                                sx: {
                                    fontSize: isDesktop ? 14 : 9,
                                    fontWeight: 600,
                                    color:
                                        selectedItem === id
                                            ? "#458fef"
                                            : theme.palette.text.primary,
                                },
                            }}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
