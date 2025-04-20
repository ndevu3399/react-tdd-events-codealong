import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect"; // Add this import
import App from "../App";

describe("Pizza Toppings App", () => {
  // Test initial state
  test("checkbox is initially unchecked", () => {
    render(<App />);
    const pepperoniCheckbox = screen.getByRole("checkbox", { name: /add pepperoni/i });
    expect(pepperoniCheckbox).not.toBeChecked();
  });

  test("toppings list initially contains only cheese", () => {
    render(<App />);
    const toppingsList = screen.getAllByRole("listitem");
    expect(toppingsList).toHaveLength(1);
    expect(screen.getByText("Cheese")).toBeInTheDocument();
    expect(screen.queryByText("Pepperoni")).not.toBeInTheDocument();
  });

  // Test checkbox interaction
  test("checkbox becomes checked when clicked", () => {
    render(<App />);
    const pepperoniCheckbox = screen.getByRole("checkbox", { name: /add pepperoni/i });
    userEvent.click(pepperoniCheckbox);
    expect(pepperoniCheckbox).toBeChecked();
  });

  test("pepperoni appears in toppings when checked", () => {
    render(<App />);
    const pepperoniCheckbox = screen.getByRole("checkbox", { name: /add pepperoni/i });
    userEvent.click(pepperoniCheckbox);
    
    const toppingsList = screen.getAllByRole("listitem");
    expect(toppingsList).toHaveLength(2);
    expect(screen.getByText("Cheese")).toBeInTheDocument();
    expect(screen.getByText("Pepperoni")).toBeInTheDocument();
  });

  // Test toggle behavior
  test("pepperoni is removed when unchecked", () => {
    render(<App />);
    const pepperoniCheckbox = screen.getByRole("checkbox", { name: /add pepperoni/i });
    
    // First click - add pepperoni
    userEvent.click(pepperoniCheckbox);
    expect(pepperoniCheckbox).toBeChecked();
    expect(screen.getByText("Pepperoni")).toBeInTheDocument();
    
    // Second click - remove pepperoni
    userEvent.click(pepperoniCheckbox);
    expect(pepperoniCheckbox).not.toBeChecked();
    expect(screen.queryByText("Pepperoni")).not.toBeInTheDocument();
  });
});