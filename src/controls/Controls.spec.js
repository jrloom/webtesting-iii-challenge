import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Controls from "./Controls";

test("buttons to toggle the closed and locked states", () => {
  const { container } = render(<Controls closed={false} locked={false} />);
  expect(container.getElementsByClassName("toggle-btn")).toHaveLength(2);
});

test("button text changes, open/unlocked", () => {
  const toggleClosed = jest.fn();
  const toggleLocked = jest.fn();
  const { getByText } = render(<Controls closed={true} toggleClosed={toggleClosed} locked={true} toggleLocked={toggleLocked} />);
  const btnOpen = getByText(/open gate/i);
  const btnUnlock = getByText(/unlock gate/i);

  expect(btnOpen).toBeTruthy();
  expect(btnUnlock).toBeTruthy();
});

test("button text changes, close/lock", () => {
  const toggleLocked = jest.fn();
  const toggleClosed = jest.fn();
  const { getByText } = render(<Controls locked={false} closed={false} toggleLocked={toggleLocked} toggleClosed={toggleClosed} />);
  const btnClose = getByText(/close gate/i);
  const btnLock = getByText(/lock gate/i);

  expect(btnClose).toBeTruthy();
  expect(btnLock).toBeTruthy();
});

test("cannot be closed or opened if locked", () => {
  const { getByText } = render(<Controls locked={true} />);
  const closed = jest.fn();
  const open = jest.fn();
  const btn = getByText(/close gate/i);

  fireEvent.click(btn);
  expect(closed).toHaveBeenCalledTimes(0);

  fireEvent.click(btn);
  expect(open).toHaveBeenCalledTimes(0);
});

test("closed toggle button disabled if gate locked", () => {
  const toggleClose = jest.fn();
  const { getByText } = render(<Controls closed={true} locked={true} toggleClose={toggleClose} />);
  const btn = getByText(/open gate/i);

  fireEvent.click(btn);
  expect(toggleClose).toHaveBeenCalledTimes(0);
});

test("the locked toggle button is disabled if the gate is open", () => {
  const toggleLock = jest.fn();
  const { getByText } = render(<Controls closed={false} locked={false} toggleLock={toggleLock} />);
  const btn = getByText(/lock gate/i);

  fireEvent.click(btn);
  expect(toggleLock).toHaveBeenCalledTimes(0);
});
