import React, { Component } from "react";
import PropTypes from "prop-types";

export default class AdVideoHTMLResource extends Component {
  componentDidMount() {
    let companionIframe = document.getElementById("companion");
    let companionIframeDoc = companionIframe.contentWindow.document;
    companionIframeDoc.open();
    companionIframeDoc.write(this.props.html);
    companionIframeDoc.close();
  }
  render() {
    return <iframe id="companion" width="300" height="250" scrolling="no" frameBorder="no" marginWidth="0" marginHeight= "0"></iframe>

  }
}

AdVideoHTMLResource.propTypes = {
  html: PropTypes.string.isRequired
}
