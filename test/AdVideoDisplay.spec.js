import React from "react";
import AdVideoDisplay from "../src/components/AdVideoDisplay";

describe("AdVideoDisplay", () => {
  const wrapper = shallow(<AdVideoDisplay />);
  it("should be wrapped in a div element", () => {
    expect(wrapper.type()).to.eql("div");
  });
});
