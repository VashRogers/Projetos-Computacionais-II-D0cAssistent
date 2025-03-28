const getLoginStyles = (theme, isDesktop) => ({
    formContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: {
            lg: "30%",
            md: "40%",
            sm: "50%",
            xs: "90%",
        },
        margin: "0 auto",
        marginTop: isDesktop ? "20vh" : "10vh",
        borderRadius: "10px",
        boxShadow: theme.palette.shadowContainer,
        backgroundColor: theme.palette.backgroundContainer,
        paddingBottom: 4,
    },
    logo: {
        width: "auto",
        height: { xs: "9vh", sm: "10vh", md: "13vh" },
    },
    inputContainer: {
        mb: 3,
        width: "100%",
        display: "flex",
        justifyContent: "center",
    },
    textField: {
        width: "80%",
    },
    buttonContainer: {
        m: 1,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        width: "80%",
        height: "2.5em",
    },
    circularProgress: {
        color: "inherit",
        position: "absolute",
    },
});

export { getLoginStyles };
