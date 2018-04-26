export class AdVideoTracking {
  static initVideoTracking(vast, companion) {
    // set base values
    const INLINE = vast.InLine;
    console.log(INLINE);
    // TODO if companion use 0 else use Creative
    console.log("COMPANION", companion);
    const PREROLL = ( companion === true ) ? INLINE.Creatives.Creative[0].Linear : INLINE.Creatives.Creative.Linear;
    console.log("PREROLL", PREROLL);
    // init tracking map
    this.adVideoTracking = new Map();
    // video impression
    this.adVideoTracking.set("impression", INLINE.Impression["#cdata-section"]);
    // video playback impression
    this.adVideoTracking.set("start", PREROLL.TrackingEvents.Tracking[0]["#cdata-section"]);
    this.adVideoTracking.set("firstQuartile", PREROLL.TrackingEvents.Tracking[1]["#cdata-section"]);
    this.adVideoTracking.set("midpoint", PREROLL.TrackingEvents.Tracking[2]["#cdata-section"]);
    this.adVideoTracking.set("thirdQuartile", PREROLL.TrackingEvents.Tracking[3]["#cdata-section"]);
    this.adVideoTracking.set("complete", PREROLL.TrackingEvents.Tracking[3]["#cdata-section"]);
    // video clickthrough
    this.adVideoTracking.set("clickThrough", PREROLL.VideoClicks.ClickThrough["#cdata-section"]);
    // video viewable impression
    this.adVideoTracking.set("viewable", INLINE.Extensions.Extension[2].CustomTracking.Tracking[0]["#cdata-section"]);

    // init tracking pixels loaded
    this.impressionLoaded = false;
    this.startLoaded = false;
    this.firstQuartileLoaded = false;
    this.midpointLoaded = false
    this.thirdQuartileLoaded = false;
    this.completeLoaded = false;
    this.viewableLoaded = false;


  }
  static loadTrackingPixel(type) {
    console.log(`Load ${type} pixel`);
    // create random number for cache busting
    let randomNum = Math.floor((Math.random() * 1000000000) + 1);
    let impressionImage = document.createElement("img");
    impressionImage.src = `${this.adVideoTracking.get(type)}&ord=${randomNum}`;
  }
  static checkVideoTime(currentTime, player) {
    // load video load point pixels
    let checkNum = 100;
    let firstQuartile = 25;
    let midpoint = 50;
    let thirdQuartile = 75;
    // get video percentage
    let videoPercentage = (currentTime / player.duration) * checkNum;
    // check for firstQuartile
    if(videoPercentage >= firstQuartile && this.firstQuartileLoaded === false) {
      this.loadTrackingPixel("firstQuartile");
      this.firstQuartileLoaded = true;
    }
    // check for midpoint
    if(videoPercentage >= midpoint && this.midpointLoaded === false) {
      this.loadTrackingPixel("midpoint");
      this.midpointLoaded = true;
    }
    // check for thirdQuartile
    if(videoPercentage >= thirdQuartile && this.thirdQuartileLoaded === false) {
      this.loadTrackingPixel("thirdQuartile");
      this.thirdQuartileLoaded = true;
    }
  }
  static setListeners(adVideoPlayer, cb) {
    // event listener for video play
    adVideoPlayer.addEventListener("play", () => {
      if(this.impressionLoaded === false) { this.loadTrackingPixel("impression"); this.impressionLoaded = true }
      if(this.startLoaded === false) { this.loadTrackingPixel("start"); this.startLoaded = true }
      if(this.viewableLoaded === false) { this.loadTrackingPixel("viewable"); this.viewableLoaded = true }
    });
    // event listener for video timeupdate
    adVideoPlayer.addEventListener("timeupdate", () => {
      this.checkVideoTime(adVideoPlayer.currentTime, adVideoPlayer);
    });
    // event listener for video end
    adVideoPlayer.addEventListener("ended", () => {
      if(this.completeLoaded === false) {
        this.loadTrackingPixel("complete");
        this.completeLoaded = true
      }
      adVideoPlayer.style.display = "none";
      cb();

    });
    // event listener for video click
    adVideoPlayer.addEventListener("click", () => {
      window.open(this.adVideoTracking.get("clickThrough", "_blank"));
      // pause video
      adVideoPlayer.pause();
    });
  }
}
