import React, { Component } from "react";
import PropTypes from "prop-types";
import AdVideoHTMLResource from "./AdVideoHTMLResource";

export default class AdVideoBigbox extends Component {
  constructor(props) {
    super(props);
    this.bigboxStyles = {
      width: "300px",
      height: "250px",
      position: "absolute",
      zIndex: 1
    };
  }
  getCompanionBigbox() {
    if(this.props.type === "html") {
      return <AdVideoHTMLResource html={this.props.ad} />
    }
    if(this.props.type === "static") {
      return (
        <a href={this.props.clickthrough} target="_blank">
          <img src={this.props.ad} width="300" height="250" />
        </a>
      );
    }
  }
  render() {
    return (
      <div style={this.bigboxStyles}>
        { this.getCompanionBigbox() }
      </div>

    );
  }
}

AdVideoBigbox.propTypes = {
  type: PropTypes.string.isRequired,
  ad: PropTypes.string.isRequired
}
