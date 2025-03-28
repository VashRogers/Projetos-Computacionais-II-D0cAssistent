import { useMediaQuery, useTheme } from "@mui/material";

export function useResponsive(breakpoint) {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up(breakpoint));

    return { isDesktop }
}