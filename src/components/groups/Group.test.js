import React from "react";
import { cleanup, render } from "react-testing-library";
import GroupForm from "./GroupForm";

afterEach(cleanup);

function renderCourseForm(args) {
  let defaultProps = {
    cards:[],
    group: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  const props = { ...defaultProps, ...args };
  return render(<GroupForm {...props} />);
}

it("should render Add Card header", () => {
  const { getByText } = renderCourseForm();
  getByText("Add Group");
});

it('should label save button as "Save" when not saving', () => {
  const { getByText } = renderCourseForm();
  getByText("Save");
});

it('should label save button as "Saving..." when saving', () => {
  const { getByText } = renderCourseForm({ saving: true });
  getByText("Saving...");
});
