import React from "react";
import { useSearchParams } from "react-router-dom";
import VideoFeed from "../components/video/VideoFeed";

const HomePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const dramaId = searchParams.get('drama');
  const episodeId = searchParams.get('episode');

  // 如果有 drama 參數，傳遞給 VideoFeed
  return (
    <div className="home-page">
      <VideoFeed 
        initialDramaId={dramaId || undefined} 
        initialEpisodeId={episodeId || undefined} 
      />
    </div>
  );
};

export default HomePage;

