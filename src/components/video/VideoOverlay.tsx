import React, { useState } from "react";
import { VideoClip } from "../../services/videoFeedService";

interface VideoOverlayProps {
  videoClip: VideoClip;
  onWatchFull?: () => void;
  onLike?: () => void;
  onComment?: () => void;
  onFollow?: () => void; // 改為追劇
  onShare?: () => void; // 添加分享功能
  onSearch?: () => void;
}

const VideoOverlay: React.FC<VideoOverlayProps> = ({
  videoClip,
  onWatchFull,
  onLike,
  onComment,
  onFollow, // 改為追劇
  onShare, // 添加分享
  onSearch,
}) => {
  // 添加狀態管理：追劇和點讚狀態
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const formatNumber = (num: number): string => {
    if (num >= 10000) {
      return `${(num / 10000).toFixed(1)}萬`;
    }
    return num.toString();
  };

  // 處理追劇點擊
  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
    onFollow?.();
  };

  // 處理點讚點擊
  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    onLike?.();
  };

  return (
    <div className="video-overlay">
      {/* 右上角搜索圖標 */}
      <button className="overlay-search-btn" onClick={onSearch}>
        <span className="search-icon">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </span>
      </button>

      {/* 右側互動按鈕 */}
      <div className="overlay-actions">
        {/* 追劇按鈕 - 最上面 */}
        <button
          className={`action-btn ${isFollowing ? "active follow-active" : ""}`}
          onClick={handleFollowClick}
        >
          <span
            className={`action-icon follow-icon ${isFollowing ? "active" : ""}`}
          >
            ⭐
          </span>
          <span className="action-label">追劇</span>
        </button>
        {/* 點讚按鈕 */}
        <button
          className={`action-btn ${isLiked ? "active like-active" : ""}`}
          onClick={handleLikeClick}
        >
          <span className={`action-icon like-icon ${isLiked ? "active" : ""}`}>
            {isLiked ? "❤️" : "🤍"}
          </span>
          <span className="action-count">{formatNumber(videoClip.likes)}</span>
        </button>
        {/* 評論按鈕 */}
        <button className="action-btn" onClick={onComment}>
          <span className="action-icon comment-icon">💬</span>
          <span className="action-count">
            {formatNumber(videoClip.comments)}
          </span>
        </button>
        {/* 分享按鈕 */}
        <button className="action-btn" onClick={onShare}>
          <span className="action-icon share-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
          </span>
          <span className="action-label">分享</span>
        </button>
      </div>

      {/* 底部劇集信息卡片 */}
      <div className="overlay-info">
        {/* 時間戳 */}
        <div className="info-timestamp">{videoClip.timestamp}</div>

        {/* 劇集標題 */}
        <div className="info-title">{videoClip.episodeTitle}</div>

        {/* 劇集卡片 */}
        <div className="info-drama-card" onClick={onWatchFull}>
          <div className="drama-thumbnail">
            <img src={videoClip.thumbnail} alt={videoClip.dramaTitle} />
          </div>
          <div className="drama-info">
            <div className="drama-title">{videoClip.dramaTitle}</div>
            <div className="drama-meta">
              <span className="drama-episode">
                第{videoClip.episodeNumber}集
              </span>
              <span className="drama-separator">|</span>
              <span className="drama-description">{videoClip.description}</span>
            </div>
            <div className="drama-tags">
              {videoClip.category.map((cat, index) => (
                <span key={index} className="drama-tag">
                  {cat}
                </span>
              ))}
              <span className="drama-actor">{videoClip.actor}</span>
            </div>
          </div>
          <div className="drama-arrow">›</div>
        </div>

        {/* 觀看完整短劇按鈕 */}
        <button className="watch-full-btn" onClick={onWatchFull}>
          觀看完整短劇·全67集 ›
        </button>
      </div>
    </div>
  );
};

export default VideoOverlay;
