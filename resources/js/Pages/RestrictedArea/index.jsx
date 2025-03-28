/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { useUserContext } from "../../Hooks/useUserContext";
import { useTheme } from "@emotion/react";
import CustomContainer from "../../Components/CustomContainer";

export default function RestrictedArea({ auth }) {
    const { setUser, user } = useUserContext();
    const theme = useTheme();

    useEffect(
        () => {
            let _mounted = true;

            setUser(auth);

            return () => {
                _mounted = false;
            };
        },
        [],
        user
    );

    return (
        <CustomContainer>
            <Typography variant="h6">ÁREA RESTRITA</Typography>
        </CustomContainer>
    );
}
