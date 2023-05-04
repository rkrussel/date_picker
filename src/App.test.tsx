import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Date Picker heading", () => {
	render(<App />);
	const header = screen.getByText(/Date Picker/i);
	expect(header).toBeInTheDocument();
});
