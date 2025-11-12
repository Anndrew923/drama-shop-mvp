// 短劇數據服務
import { VideoClip, ALL_VIDEO_CLIPS } from './videoFeedService';

// 短劇接口（不同於 VideoClip）
export interface Drama {
  id: string;
  title: string;
  thumbnail: string;
  category: string[];
  actor: string;
  totalEpisodes: number;
  latestEpisode: number;
  totalLikes: number;
  totalViews: number;
  description: string;
  firstEpisodeId: string; // 第一集的 VideoClip ID
}

// 從 VideoClip 數據中提取所有唯一短劇
export const getAllDramas = (): Drama[] => {
  const dramaMap = new Map<string, {
    clips: VideoClip[];
    totalLikes: number;
    totalViews: number;
  }>();

  // 按 dramaId 分組
  ALL_VIDEO_CLIPS.forEach(clip => {
    if (!dramaMap.has(clip.dramaId)) {
      dramaMap.set(clip.dramaId, {
        clips: [],
        totalLikes: 0,
        totalViews: 0,
      });
    }
    const drama = dramaMap.get(clip.dramaId)!;
    drama.clips.push(clip);
    drama.totalLikes += clip.likes;
    drama.totalViews += clip.comments * 10; // 模擬觀看數
  });

  // 轉換為 Drama 數組
  const dramas: Drama[] = [];
  dramaMap.forEach((data, dramaId) => {
    const clips = data.clips.sort((a, b) => a.episodeNumber - b.episodeNumber);
    const firstClip = clips[0];
    const latestClip = clips[clips.length - 1];

    dramas.push({
      id: dramaId,
      title: firstClip.dramaTitle,
      thumbnail: firstClip.thumbnail,
      category: firstClip.category,
      actor: firstClip.actor,
      totalEpisodes: clips.length,
      latestEpisode: latestClip.episodeNumber,
      totalLikes: data.totalLikes,
      totalViews: data.totalViews,
      description: firstClip.description,
      firstEpisodeId: firstClip.id,
    });
  });

  return dramas;
};

// 獲取所有分類
export const getAllCategories = (): string[] => {
  const categorySet = new Set<string>();
  ALL_VIDEO_CLIPS.forEach(clip => {
    clip.category.forEach(cat => categorySet.add(cat));
  });
  return Array.from(categorySet).sort();
};

// 按分類篩選短劇
export const getDramasByCategory = (category: string): Drama[] => {
  return getAllDramas().filter(drama => 
    drama.category.includes(category)
  );
};

// 搜尋短劇（按劇名、演員、分類）
export const searchDramas = (query: string): Drama[] => {
  const lowerQuery = query.toLowerCase();
  return getAllDramas().filter(drama => 
    drama.title.toLowerCase().includes(lowerQuery) ||
    drama.actor.toLowerCase().includes(lowerQuery) ||
    drama.category.some(cat => cat.toLowerCase().includes(lowerQuery))
  );
};

// 獲取推薦短劇（按熱度排序）
export const getRecommendedDramas = (): Drama[] => {
  return getAllDramas().sort((a, b) => b.totalLikes - a.totalLikes);
};

// 獲取新劇（按最新集數排序）
export const getNewDramas = (): Drama[] => {
  return getAllDramas().sort((a, b) => b.latestEpisode - a.latestEpisode);
};

