import React, { useRef, useEffect, useState } from "react";

interface VideoPlayerProps {
  videoUrl: string;
  thumbnail: string;
  isPlaying: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onClick?: () => void; // 添加點擊回調
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  thumbnail,
  isPlaying,
  onPlay,
  onPause,
  onEnded,
  onClick // 添加
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // 處理播放狀態
    if (isPlaying) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("自動播放失敗:", error);
          // 某些瀏覽器需要用戶交互才能自動播放
        });
      }
    } else {
      video.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsLoading(false);
    };

    const handleError = () => {
      setHasError(true);
      setIsLoading(false);
    };

    const handlePlay = () => {
      onPlay?.();
    };

    const handlePause = () => {
      onPause?.();
    };

    const handleEnded = () => {
      onEnded?.();
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("error", handleError);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("error", handleError);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
    };
  }, [onPlay, onPause, onEnded]);

  const handleClick = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
    // 觸發點擊回調
    onClick?.();
  };

  return (
    <div className="video-player-container" onClick={handleClick}>
      <video
        ref={videoRef}
        className="video-player"
        src={videoUrl}
        poster={thumbnail}
        loop
        playsInline
        muted={false}
        preload="auto"
      />
      {isLoading && (
        <div className="video-loading">
          <div className="loading-spinner"></div>
          <p>載入中...</p>
        </div>
      )}
      {hasError && (
        <div className="video-error">
          <p>視頻載入失敗</p>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;

