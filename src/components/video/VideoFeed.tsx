import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";
import VideoOverlay from "./VideoOverlay";
import { useSwipe } from "../../hooks/useSwipe";
import {
  getRecommendedClips,
  hasMoreClips,
  VideoClip,
  getVideoClipById,
} from "../../services/videoFeedService";

interface VideoFeedProps {
  initialDramaId?: string;
  initialEpisodeId?: string;
}

const VideoFeed: React.FC<VideoFeedProps> = ({
  initialDramaId,
  initialEpisodeId,
}) => {
  const [videoClips, setVideoClips] = useState<VideoClip[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const hasInitialized = useRef(false);

  // 載入更多視頻
  const loadMoreClips = useCallback(async () => {
    if (isLoading || !hasMoreClips(videoClips.length)) return;

    setIsLoading(true);
    // 模擬異步加載
    setTimeout(() => {
      const newClips = getRecommendedClips(currentPage + 1, 5);
      if (newClips.length > 0) {
        setVideoClips((prev) => [...prev, ...newClips]);
        setCurrentPage((prev) => prev + 1);
      }
      setIsLoading(false);
    }, 500);
  }, [currentPage, videoClips.length, isLoading]);

  // 初始載入
  useEffect(() => {
    const clips = getRecommendedClips(0, 5);
    setVideoClips(clips);
    setCurrentPage(0);
  }, []);

  // 初始載入時，如果有 initialEpisodeId，找到對應的視頻
  useEffect(() => {
    if (hasInitialized.current || videoClips.length === 0) return;

    hasInitialized.current = true;

    if (initialEpisodeId) {
      const clipIndex = videoClips.findIndex(
        (clip) => clip.id === initialEpisodeId
      );
      if (clipIndex !== -1) {
        setCurrentIndex(clipIndex);
        setIsPlaying(true);
      } else {
        // 如果找不到，嘗試從服務中獲取
        const clip = getVideoClipById(initialEpisodeId);
        if (clip) {
          // 將找到的視頻插入到列表開頭
          setVideoClips((prev) => {
            const newClips = [clip, ...prev.filter((c) => c.id !== clip.id)];
            return newClips;
          });
          setCurrentIndex(0);
          setIsPlaying(true);
        }
      }
    } else if (initialDramaId) {
      // 如果只有 dramaId，找到該短劇的第一集
      const clipIndex = videoClips.findIndex(
        (clip) => clip.dramaId === initialDramaId && clip.episodeNumber === 1
      );
      if (clipIndex !== -1) {
        setCurrentIndex(clipIndex);
        setIsPlaying(true);
      }
    }
  }, [initialEpisodeId, initialDramaId, videoClips]);

  // 滑動處理 - 向上滑動切換到下一個視頻
  const handleSwipeUp = useCallback(() => {
    if (currentIndex < videoClips.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setIsPlaying(true);

      // 如果接近底部，加載更多
      if (nextIndex >= videoClips.length - 2) {
        loadMoreClips();
      }
    }
  }, [currentIndex, videoClips.length, loadMoreClips]);

  // 滑動處理 - 向下滑動切換到上一個視頻
  const handleSwipeDown = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsPlaying(true);
    }
  }, [currentIndex]);

  const swipeHandlers = useSwipe({
    onSwipeUp: handleSwipeUp,
    onSwipeDown: handleSwipeDown,
    threshold: 50,
  });

  // 處理視頻播放狀態
  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  // 處理視頻結束（自動播放下一個）
  const handleEnded = () => {
    if (currentIndex < videoClips.length - 1) {
      handleSwipeUp();
    } else {
      loadMoreClips();
    }
  };

  // 處理觀看完整短劇 - 接收劇集ID作為參數
  const handleWatchFull = useCallback(
    (dramaId: string) => {
      navigate(`/theater?drama=${dramaId}`);
    },
    [navigate]
  );

  // 處理點讚 - 接收視頻ID作為參數，連接到該視頻的後台
  const handleLike = useCallback((videoId: string) => {
    // TODO: 實現點讚功能，連接到後台
    console.log("點讚視頻ID:", videoId);
    // 這裡可以調用 API: likeVideo(videoId)
  }, []);

  // 處理評論 - 接收視頻ID作為參數，連接到該視頻的後台
  const handleComment = useCallback((videoId: string) => {
    // TODO: 實現評論功能，連接到後台
    console.log("評論視頻ID:", videoId);
    // 這裡可以調用 API: openComments(videoId)
  }, []);

  // 處理追劇 - 接收劇集ID作為參數，連接到該劇集的後台
  const handleFollow = useCallback((dramaId: string) => {
    // TODO: 實現追劇功能，連接到後台
    console.log("追劇劇集ID:", dramaId);
    // 這裡可以調用 API: followDrama(dramaId)
  }, []);

  // 處理分享 - 接收視頻ID作為參數
  const handleShare = useCallback((videoId: string) => {
    // TODO: 實現分享功能，連接到後台
    console.log("分享視頻ID:", videoId);
    // 這裡可以調用 API: shareVideo(videoId)
  }, []);

  // 處理視頻點擊（切換播放/暫停）
  const handleVideoClick = () => {
    setIsPlaying((prev) => !prev);
  };

  // 處理搜尋
  const handleSearch = () => {
    navigate("/theater");
  };

  // 視頻預加載：預加載相鄰視頻
  useEffect(() => {
    const preloadIndices = [
      currentIndex - 1,
      currentIndex + 1,
      currentIndex + 2,
    ].filter((idx) => idx >= 0 && idx < videoClips.length);

    preloadIndices.forEach((idx) => {
      const clip = videoClips[idx];
      if (clip) {
        // 檢查是否已經預加載過
        const existingVideo = document.querySelector(
          `video[data-preload-id="${clip.id}"]`
        );
        if (!existingVideo) {
          const video = document.createElement("video");
          video.setAttribute("data-preload-id", clip.id);
          video.src = clip.videoUrl;
          video.preload = "auto";
          video.load();
          // 預加載後移除元素（避免DOM污染）
          video.addEventListener("loadeddata", () => {
            setTimeout(() => video.remove(), 1000);
          });
        }
      }
    });
  }, [currentIndex, videoClips]);

  if (videoClips.length === 0) {
    return (
      <div className="video-feed-loading">
        <div className="loading-spinner"></div>
        <p>載入視頻中...</p>
      </div>
    );
  }

  return (
    <div className="video-feed" {...swipeHandlers}>
      {/* 只渲染當前視頻和相鄰視頻（用於預加載和過渡） */}
      {videoClips.map((clip, index) => {
        const isCurrent = index === currentIndex;
        const isAdjacent = Math.abs(index - currentIndex) <= 1;

        // 只渲染當前視頻和相鄰視頻，其他視頻不渲染（節省性能）
        if (!isAdjacent) return null;

        return (
          <div
            key={clip.id}
            className={`video-item ${isCurrent ? "active" : "adjacent"}`}
            data-index={index}
          >
            <VideoPlayer
              videoUrl={clip.videoUrl}
              thumbnail={clip.thumbnail}
              isPlaying={isCurrent && isPlaying}
              onPlay={handlePlay}
              onPause={handlePause}
              onEnded={handleEnded}
              onClick={handleVideoClick}
            />
            {/* 只有當前視頻顯示資訊欄和功能鍵 */}
            {isCurrent && (
              <VideoOverlay
                videoClip={clip}
                onWatchFull={() => handleWatchFull(clip.dramaId)}
                onLike={() => handleLike(clip.id)}
                onComment={() => handleComment(clip.id)}
                onFollow={() => handleFollow(clip.dramaId)}
                onShare={() => handleShare(clip.id)}
                onSearch={handleSearch}
              />
            )}
          </div>
        );
      })}
      {isLoading && (
        <div className="video-load-more">
          <div className="loading-spinner"></div>
          <p>載入更多...</p>
        </div>
      )}
    </div>
  );
};

export default VideoFeed;
