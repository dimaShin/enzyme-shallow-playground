import * as React from "react";
import { shallow, mount } from "enzyme";

describe("Test React.Fragment usage", () => {
  const ComponentWithFragment = () => (
    <React.Fragment>
      <div id="inner">First element</div>
    </React.Fragment>
  );

  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  it("React.Fragment should be undefined", () => {
    expect(React.Fragment).toBe(undefined);
  });

  it("mount should fails to render such component", () => {
    expect(() => mount(<ComponentWithFragment />)).toThrow();
  });

  it("but shallow will create wrapper without issues", () => {
    const wrapper = shallow(<ComponentWithFragment />);

    expect(wrapper.find("#inner").length).toBe(1);
    expect(wrapper.text()).toMatchInlineSnapshot(`"First element"`);
  });

  it("shallowedWrapper.html() will also fail", () => {
    const wrapper = shallow(<ComponentWithFragment />);

    expect(() => wrapper.html()).toThrow();
  });

  it("will also spam into console with expected error", () => {
    shallow(<ComponentWithFragment />);
    const expectedError =
      "React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in. Check the render method of `ComponentWithFragment`";
    expect(console.error).toBeCalledWith(
      expect.stringContaining(`Warning: ${expectedError}`)
    );
  });

  it("dive into shallowed nested component will still fail", () => {
    const wrapper = shallow(<ComponentWithFragment />);
    expect(() => wrapper.dive()).toThrow();
  });

  it('shallow will successfully create wrapper for other invalid jsx', () => {
    const IsThisLegal = () => <undefined />;
    expect(() => shallow(<IsThisLegal />)).not.toThrow();
  })
});
