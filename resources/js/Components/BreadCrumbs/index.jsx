import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useResponsive } from "../../Hooks/useResponsive";
import { AiOutlineHome } from "react-icons/ai";
import { usePathRoutes } from "../../Hooks/usePathRoutes";
import { Link } from "@inertiajs/react";
import { CustomColors } from "../../Constants/CustomColors";

export function BreadCrumbs({ currentUrl }) {
    const { isDesktop } = useResponsive("sm");

    const isVisible = () => {
        if (currentUrl === "/") return false;
        if (currentUrl === "/open-inscriptions") return false;
        if (currentUrl === "/in-progress") return false;
        if (currentUrl === "/login") return false;
        if (currentUrl === "/login-inscription") return false;
        if (currentUrl === "/register") return false;
        if (currentUrl === "/restricted-area") return false;

        return true;
    };

    const { paths, translate } = usePathRoutes();

    /* se for um numero ele retornar o penultimo elemento da url */
    const getLastUrlElement = (paths) => {
        if (Number(paths[paths.length - 1])) return paths[paths.length - 2];
        else return paths[paths.length - 1];
    };

    /* salva o parametro numero enviado na url */
    const getNumberParam = (paths) => {
        if (Number(paths[paths.length - 1])) return paths[paths.length - 1];
        else return null;
    };

    const isVerifyBreadCrumb = (paths) => {
        if (isDesktop || paths.length < 2) return true;
        else if (isNaN(paths[paths.length - 1]) && paths.length == 2)
            return true;
        else return false;
    };

    const lastPart = getLastUrlElement(paths);
    const numberParam = getNumberParam(paths);

    const isMenuBreadCrumb = isVerifyBreadCrumb(paths);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        if (isMenuBreadCrumb) {
            setAnchorEl(null);
        }
    }, [isMenuBreadCrumb]);

    const generateBreadcrumbs = () => {
        const adjustedPaths = numberParam
            ? paths.slice(0, -2)
            : paths.slice(0, -1);

        if (isMenuBreadCrumb) {
            return adjustedPaths.map((part, index) => {
                const linkParts = paths.slice(0, index + 1);
                let linkPath = "/" + linkParts.join("/");

                if (part === "menus" && numberParam) {
                    linkPath += `/${numberParam}`;
                }

                return (
                    <Link
                        key={linkPath}
                        underline="hover"
                        color="#0277bd"
                        href={linkPath}
                        style={{
                            textDecoration: "none",
                            color: CustomColors.primary,
                        }}
                    >
                        {translate(part)}
                    </Link>
                );
            });
        }

        return adjustedPaths.map((part, index) => {
            const linkParts = paths.slice(0, index + 1);
            let linkPath = "/" + linkParts.join("/");

            if (part === "menus" && numberParam) {
                linkPath += `/${numberParam}`;
            }

            return (
                <MenuItem key={linkPath} onClick={handleClose}>
                    <Link
                        underline="none"
                        color="#0277bd"
                        href={linkPath}
                        style={{
                            textDecoration: "none",
                            color: CustomColors.primary,
                        }}
                    >
                        {translate(part)}
                    </Link>
                </MenuItem>
            );
        });
    };

    const generatelastBreadcrumb = () => {
        return (
            <Typography key={lastPart} color="text.primary">
                {translate(lastPart)}
            </Typography>
        );
    };

    return (
        <>
            {isVisible() && (
                <Box
                    sx={{ width: "91%", margin: "0 auto", marginTop: "4vh" }}
                    minHeight={"5vh"}
                    display="flex"
                    alignItems="center"
                    justifyContent="first"
                    padding="3px"
                >
                    {isMenuBreadCrumb ? (
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link
                                underline="hover"
                                color="#0277bd"
                                href="/"
                                style={{
                                    textDecoration: "none",
                                    color: CustomColors.primary,
                                }}
                            >
                                <AiOutlineHome size={20} />
                            </Link>
                            {generateBreadcrumbs()}
                            {generatelastBreadcrumb()}
                        </Breadcrumbs>
                    ) : (
                        <>
                            <Menu
                                id="breadcrumbs-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    "aria-labelledby": "breadcrumbs-button",
                                }}
                            >
                                {generateBreadcrumbs()}
                            </Menu>
                            <Breadcrumbs aria-label="breadcrumb">
                                <Link
                                    underline="hover"
                                    style={{
                                        textDecoration: "none",
                                        color: CustomColors.primary,
                                    }}
                                    href="/"
                                >
                                    <AiOutlineHome size={20} />
                                </Link>
                                <IconButton
                                    aria-controls={
                                        open ? "breadcrumbs-menu" : null
                                    }
                                    aria-haspopup="true"
                                    aria-expanded={open ? "true" : null}
                                    onClick={handleClick}
                                >
                                    <MoreHorizIcon />
                                </IconButton>
                                {generatelastBreadcrumb()}
                            </Breadcrumbs>
                        </>
                    )}
                </Box>
            )}
        </>
    );
}
