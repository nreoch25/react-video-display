import React, { Component } from "react";
import { getVast, xmlParser, xmlToJson, getVideoURL, getVideoCompanion, detectScrollPosition } from "../utils/AdVideoDisplayUtils";
import { AdVideoTracking } from "../utils/AdVideoTracking";

// import components
import AdVideoPlayer from "./AdVideoPlayer";
import AdVideoBigbox from "./AdVideoBigbox";


class AdVideoDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Vast : {},
      wrapper : false,
      companion: false,
      videoPlay : false
    }
    this.videoContainerStyles = {
      width: "0",
      height: "250px",
      backgroundColor: "#000000",
      position: "fixed",
      bottom: "10px",
      right: "10px",
      overflow: "hidden"
    }
  }
  componentDidMount() {
    // avoid global lookups
    this.doc = document;
    this.win = window;
    // getVast
    getVast(this.props.vastAdTag).then((response) => {
      // received vast XML response
      // parse xml string
      let parsedXML = xmlParser(response);
      // convert xml to json
      let xmlJSON = xmlToJson(parsedXML.documentElement);
      // Get Ad length as sometimes 2 are returned
      // If 2 or more Ads are returned we will do nothing
      let adIsArray = Array.isArray(xmlJSON.Ad);
      // check if vast wrapper type
      // Ad not needed if in wrapper mode
      let wrapper = (typeof xmlJSON.Ad.Wrapper !== "object" && adIsArray === false) ? false : true;
      // check if there is a companion available
      //let companion = ( wrapper === false ) ? true : false;
      let companion = false;
      if(wrapper === false) {
        console.log("XML JSON", xmlJSON);
        // TODO check why InLine is undefined sometimes here
        companion = ( Array.isArray(xmlJSON.Ad.InLine.Creatives.Creative) ) ? true : false;
      }
      console.log("COMPANION", companion);
      // Set the state for the Ad
      this.setState({ Vast: xmlJSON, wrapper, companion });
      // check if ad is available and not a wrapper type
      if(this.state.wrapper === false) {
        // initialize tracking object for the Ad
        // only perform tracking and animating if ad is available
        AdVideoTracking.initVideoTracking(this.state.Vast.Ad, this.state.companion);
        // set promise to return when user scroll position is met
        detectScrollPosition(this.win, this.doc)
          .then(() => {
            // reset state to play the video
            this.setState({ videoPlay: true });
            // get element
            this.videoContainer = this.doc.getElementById("videoContainer");
            // setup transition
            this.videoContainer.style.transition = "width 0.6s";
            // adjust the width
            this.videoContainer.style.width = "445px";
            // TODO need to trigger play when scroll position is detected
          });

      }
    }).catch(error => console.log(error));
  }
  videoDisplayCallback() {
    // check if there is a companion to display
    if(this.state.companion === true) {
      // animate width with css transition
      this.videoContainer.style.transition = "width 0.3s";
      this.videoContainer.style.width = "300px";
    } else {
      // no companion so just remove
      this.videoContainer.style.display = "none";
    }
  }
  getVideoPlayer() {
    if(typeof this.state.Vast.Ad === "undefined") { return; }
    if(this.state.wrapper === false) {
      console.log("VIDEO AD", this.state.Vast);
      let mediaFilesArray = ( this.state.companion === true ) ? this.state.Vast.Ad.InLine.Creatives.Creative[0].Linear.MediaFiles.MediaFile : this.state.Vast.Ad.InLine.Creatives.Creative.Linear.MediaFiles.MediaFile;
      let videoURL = getVideoURL(mediaFilesArray);
      return <AdVideoPlayer videoPlay={this.state.videoPlay} videoURL={videoURL} videoDisplayCallback={this.videoDisplayCallback.bind(this)}/>
    }
    console.log("VIDEO WRAPPER");
    return null;
  }
  getVideoBigbox() {
    if(typeof this.state.Vast.Ad === "undefined") { return; }
    if(this.state.wrapper === false && this.state.companion === true) {
      let companionBigbox = this.state.Vast.Ad.InLine.Creatives.Creative[1].CompanionAds.Companion;
      let videoCompanion = getVideoCompanion(companionBigbox);
      console.log("Bigbox Companion", videoCompanion);
      return <AdVideoBigbox type={videoCompanion.type} ad={videoCompanion.ad} clickthrough={videoCompanion.clickthrough}/>
    }
  }
  render() {
    return (
      <div id="videoContainer" style={this.videoContainerStyles}>
        {this.getVideoPlayer()}
        {this.getVideoBigbox()}
      </div>
    );
  }
}

AdVideoDisplay.defaultProps = {
  vastAdTag: "https://pubads.g.doubleclick.net/gampad/ads?sz=320x240&iu=/5876/testsv/nigel_test/nigelhtml5video&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&correlator=[timestamp]"
}

export default AdVideoDisplay;
