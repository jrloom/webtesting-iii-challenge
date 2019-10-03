import React from "react";
import { fireEvent, getByTestId, render } from "@testing-library/react";

import Display from "./Display";

test("gate defaults to unlocked and open", () => {
  const { getByText } = render(<Display />);
  expect(getByText(/unlocked/i));
  expect(getByText(/open/i));
});

test("gate is open if closed is false", () => {
  const { getByText } = render(<Display closed={false} />);
  expect(getByText(/open/i));
});

test("gate is closed if closed is true", () => {
  const { getByText } = render(<Display closed={true} />);
  expect(getByText(/closed/i));
});

test("gate is unlocked if locked is false", () => {
  const { getByText } = render(<Display closed={false} />);
  expect(getByText(/unlocked/i));
});

test("gate is locked if locked  is locked", () => {
  const { getByText } = render(<Display closed={true} />);
  expect(getByText(/locked/i));
});

test("when open use the 'green-led' class", () => {
  const { container } = render(<Display closed={false} />);
  const gate = getByTestId(container, "gateClosed");
  expect(gate.className).toContain("green-led");
});

test("when closed use the 'red-led' class", () => {
  const { container } = render(<Display closed={true} />);
  const gate = getByTestId(container, "gateClosed");
  expect(gate.className).toContain("red-led");
});

test("when unlocked use the 'green-led' class", () => {
  const { container } = render(<Display locked={false} />);
  const gate = getByTestId(container, "gateLocked");
  expect(gate.className).toContain("green-led");
});

test("when locked use the 'red-led' class", () => {
  const { container } = render(<Display locked={true} />);
  const gate = getByTestId(container, "gateLocked");
  expect(gate.className).toContain("red-led");
});
