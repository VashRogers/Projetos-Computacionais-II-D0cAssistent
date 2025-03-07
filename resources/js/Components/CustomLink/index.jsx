import React from "react";
import { Link } from "@inertiajs/react";

export function CustomLink({ children, href }) {
    return (
        <Link href={href} style={{ textDecoration: "none", color: "inherit" }}>
            {children}
        </Link>
    );
}
