import React from 'react';
import DramaCard from './DramaCard';
import { Drama } from '../../services/dramaService';

interface DramaGridProps {
  dramas: Drama[];
  onDramaClick: (drama: Drama) => void;
}

const DramaGrid: React.FC<DramaGridProps> = ({ dramas, onDramaClick }) => {
  if (dramas.length === 0) {
    return (
      <div className="drama-grid-empty">
        <p>暫無短劇</p>
      </div>
    );
  }

  return (
    <div className="drama-grid">
      {dramas.map((drama) => (
        <DramaCard
          key={drama.id}
          drama={drama}
          onClick={() => onDramaClick(drama)}
        />
      ))}
    </div>
  );
};

export default DramaGrid;

