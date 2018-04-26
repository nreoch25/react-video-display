import React, { Component } from "react";
import PropTypes from "prop-types";
import { AdVideoTracking } from "../utils/AdVideoTracking";

export default class AdVideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.videoPlayerStyles = {
      width: "445px",
      height: "auto",
      position: "absolute",
      cursor: "pointer",
      zIndex: 2
    }
    this.adVideoPlayer = null
  }
  componentDidMount() {
    // access video player
    this.adVideoPlayer = document.getElementById("adVideoPlayer");
    // set event listeners for adVideoPlayer
    AdVideoTracking.setListeners(adVideoPlayer, this.props.videoDisplayCallback);
  }
  checkPlay() {
    // check if this.adVideoPlayer exists and the videoPlay prop is true
    if(this.adVideoPlayer !== null && this.props.videoPlay === true) {
      this.adVideoPlayer.play();
    }
  }
  render() {
    this.checkPlay();
    return (
      <video id="adVideoPlayer" src={this.props.videoURL} controls muted style={this.videoPlayerStyles}></video>
    );
  }
}

AdVideoPlayer.propTypes = {
  videoURL: PropTypes.string.isRequired,
  videoDisplayCallback: PropTypes.func.isRequired,
  videoPlay: PropTypes.bool.isRequired
}
