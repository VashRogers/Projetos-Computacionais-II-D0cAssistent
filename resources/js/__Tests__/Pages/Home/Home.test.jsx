import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../../../Pages/Home";

describe("<Home />", () => {
    it("Home deve ser renderizada corretamente", () => {
        render(<Home />);
        expect(screen.getByText("Home")).toBeTruthy();
    });
});
