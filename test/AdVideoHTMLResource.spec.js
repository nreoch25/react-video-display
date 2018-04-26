import React from "react";
import AdVideoHTMLResource from "../src/components/AdVideoHTMLResource";

describe("AdVideoHTMLResource", () => {
  const testHTML = "<html><head></head><body></body></html>"
  const wrapper = shallow(<AdVideoHTMLResource html={testHTML} />);
  it("should be wrapped in an iframe element", () => {
    expect(wrapper.type()).to.eql("iframe");
  });
});
