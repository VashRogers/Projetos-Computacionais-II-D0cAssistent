/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Box, Grid2, Typography } from "@mui/material";
import { useUserContext } from "../../Hooks/useUserContext";
import { useTheme } from "@emotion/react";
import CustomContainer from "../../Components/CustomContainer";
import { CardItem } from "../../Components/CustomCards";
import { CardsData } from "./components/CardsData";

export default function RestrictedArea({ auth }) {
    const [cards, setCards] = useState([]);
    const { setUser, user } = useUserContext();
    const theme = useTheme();

    useEffect(
        () => {
            let _mounted = true;

            setUser(auth);
            const fetchCards = async () => {
                const response = await CardsData();

                if (_mounted) {
                    setCards(response);
                }
            };

            fetchCards();

            return () => {
                _mounted = false;
            };
        },
        [],
        user
    );

    return (
        <CustomContainer>
            <Box p={1}>
                <Grid2
                    container
                    rowSpacing={2}
                    columnSpacing={{ xs: 2, sm: 2, md: 3, lg: 4 }}
                    columns={{ xs: 6, sm: 9, md: 9, lg: 12 }}
                    justifyContent="center"
                >
                    {cards.map((item, key) => {
                        return (
                            <Grid2 size={3} key={key}>
                                <CardItem
                                    icon={
                                        <item.icon
                                            size={80}
                                            color={theme.palette.iconsColor}
                                        />
                                    }
                                    title={item.title}
                                    url={item.url}
                                    desc={item.desc}
                                />
                            </Grid2>
                        );
                    })}
                </Grid2>
            </Box>
        </CustomContainer>
    );
}
