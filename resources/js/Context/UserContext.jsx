import React, { useState, createContext, useEffect } from "react";

export const UserContext = createContext({
    user: null,
    setUser: () => {},
    logout: () => {},
    url: "",
    setCurrentUrl: () => {},
});

export const UserProvider = ({ children, auth, currentUrl }) => {
    const [user, setUser] = useState(auth);
    const [url, setCurrentUrl] = useState(currentUrl.currentUrl || "");

    useEffect(() => {
        setUser(auth);
    }, [auth]);

    useEffect(() => {
        setCurrentUrl(currentUrl.currentUrl || "");
    }, [currentUrl.currentUrl]);

    const logout = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider
            value={{ user, setUser, logout, url, setCurrentUrl }}
        >
            {children}
        </UserContext.Provider>
    );
};
