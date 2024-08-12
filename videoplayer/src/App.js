import React, { useEffect, useRef, useState } from "react";
import { IconContext } from "react-icons";
import { BiPlay, BiPause, BiVolumeFull, BiVolumeLow, BiSkipNext, BiSkipPrevious, BiFullscreen } from "react-icons/bi";

function VideoPlayer() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1); // Volume state (1 is 100%)
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Play/Pause Toggle
  const togglePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  // Volume Control
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  // Forward 10 Seconds
  const handleForward = () => {
    videoRef.current.currentTime += 10;
  };

  // Backward 10 Seconds
  const handleBackward = () => {
    videoRef.current.currentTime -= 10;
  };

  // Fullscreen Toggle
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.mozRequestFullScreen) {
        videoRef.current.mozRequestFullScreen(); // Firefox
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen(); // Chrome, Safari and Opera
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen(); // IE/Edge
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    const updateTime = () => {
      setCurrentTime(video.currentTime);
      setDuration(video.duration);
    };


  },[]);

  const sec2Min = (sec) => {
    const min = Math.floor(sec / 60);
    const secRemain = Math.floor(sec % 60);
    return {
      min: min,
      sec: secRemain
    };
    
  }

  return (
    <div className="video-player">
      <video ref={videoRef} className="video" src="https://www.w3schools.com/html/mov_bbb.mp4" width="100%" />
      <div className="controls">
        <IconContext.Provider value={{ color: "white", size: "2em" }}>
          <button className="control-button" onClick={handleBackward}>
            <BiSkipPrevious />
          </button>

          <button className="control-button" onClick={togglePlayPause}>
            {isPlaying ? <BiPause /> : <BiPlay />}
          </button>

          <button className="control-button" onClick={handleForward}>
            <BiSkipNext />
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            className="volume-slider"
            onChange={handleVolumeChange}
          />
          <button className="control-button">
            {volume > 0.5 ? <BiVolumeFull /> : <BiVolumeLow />}
          </button>

          <button className="control-button" onClick={toggleFullscreen}>
            <BiFullscreen />
          </button>
        </IconContext.Provider>
      </div>
    </div>
  );
}

export default VideoPlayer;
