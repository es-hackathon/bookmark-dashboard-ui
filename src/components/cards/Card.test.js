import React from "react";
import { cleanup, render } from "react-testing-library";
import CardForm from "./CardForm";

afterEach(cleanup);

function renderCourseForm(args) {
  let defaultProps = {
     
    card: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  const props = { ...defaultProps, ...args };
  return render(<CardForm {...props} />);
}

it("should render Add Card header", () => {
  const { getByText } = renderCourseForm();
  getByText("Add Card");
});

it('should label save button as "Save" when not saving', () => {
  const { getByText } = renderCourseForm();
  getByText("Save");
});

it('should label save button as "Saving..." when saving', () => {
  const { getByText } = renderCourseForm({ saving: true });
  getByText("Saving...");
});
