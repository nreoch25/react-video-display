import { getVideoURL } from "../src/utils/AdVideoDisplayUtils";

describe("AdVideoDisplayUtils", () => {
  describe("getVideoURL", () => {
    let mediaFilesArray = [
      {
      "#cdata-section": "http://fakevideourl/video.flv",
      "attributes": { type: "video/x-flv" }
      },
      {
      "#cdata-section": "http://fakevideourl/video.mp4",
      "attributes": { type: "video/mp4" }
      }
    ]
    let res = getVideoURL(mediaFilesArray);
    it("should return a url string", () => {
      expect(res).to.be.a("string");

    });
    it("should return an mp4 video url", () => {
      expect(res).to.contain("mp4");
    });
  });
});
