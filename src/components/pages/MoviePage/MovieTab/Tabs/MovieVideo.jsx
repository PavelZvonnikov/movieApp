import React, { Component } from "react";
import YouTube from "react-youtube";

export class MovieVideo extends Component {
  videoOnReady = e => {
    e.target.playVideo();
  };

  render() {
    const { options, videoId } = this.props;
    return (
      <div className="d-flex justify-content-center mt-5">
        <YouTube videoId={videoId} opts={options} onReady={this.videoOnReady} />
      </div>
    );
  }
}

MovieVideo.defaultProps = {
  video: [],
  options: {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1
    }
  }
};
