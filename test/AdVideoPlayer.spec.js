import React from "react";
import AdVideoPlayer from "../src/components/AdVideoPlayer";

describe("AdVideoPlayer", () => {
  const testVideoURL = "";
  const testVideoDisplayCallback = () => {};
  const testVideoPlay = false;
  const wrapper = shallow(<AdVideoPlayer videoURL={testVideoURL} videoDisplayCallback={testVideoDisplayCallback} videoPlay={testVideoPlay} />);
  it("should be wrapped in a video element", () => {
    expect(wrapper.type()).to.eql("video");
  });
});
