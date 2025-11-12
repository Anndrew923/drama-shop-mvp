import React from 'react';
import { Drama } from '../../services/dramaService';

interface DramaCardProps {
  drama: Drama;
  onClick: () => void;
}

const DramaCard: React.FC<DramaCardProps> = ({ drama, onClick }) => {
  // 格式化熱度數字
  const formatViews = (views: number): string => {
    if (views >= 10000) {
      return `${(views / 10000).toFixed(1)}萬`;
    }
    return views.toString();
  };

  return (
    <div className="drama-card" onClick={onClick}>
      <div className="drama-card-thumbnail">
        <img src={drama.thumbnail} alt={drama.title} />
        {drama.latestEpisode > 1 && (
          <div className="drama-card-badge">首發</div>
        )}
      </div>
      <div className="drama-card-content">
        <h3 className="drama-card-title">{drama.title}</h3>
        <p className="drama-card-subtitle">
          {drama.description.split('|')[1] || drama.description}
        </p>
        <div className="drama-card-meta">
          <span className="drama-card-category">
            {drama.category.join('·')}
          </span>
          <span className="drama-card-views">
            {formatViews(drama.totalViews)}熱度
          </span>
        </div>
      </div>
    </div>
  );
};

export default DramaCard;

