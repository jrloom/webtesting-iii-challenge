import React from "react";
import { render } from "@testing-library/react";
import Dashboard from "./Dashboard";

test("dashboard shows the contols and display", () => {
  const { getByText } = render(<Dashboard />);
  expect(getByText(/open/i));
  expect(getByText(/unlocked/i));
  expect(getByText(/close gate/i));
  expect(getByText(/lock gate/i));
});
