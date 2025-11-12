// 視頻片段數據接口
export interface VideoClip {
  id: string;
  videoUrl: string;
  thumbnail: string;
  dramaId: string;
  dramaTitle: string;
  episodeNumber: number;
  episodeTitle: string;
  category: string[];
  actor: string;
  timestamp: string; // "2040年11月10日 1:00 PM"
  likes: number;
  comments: number;
  description: string;
}

// 所有模擬視頻數據池
export const ALL_VIDEO_CLIPS: VideoClip[] = [
  {
    id: "clip1",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnail: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=600&fit=crop",
    dramaId: "drama1",
    dramaTitle: "末世:我能聽到別人心聲",
    episodeNumber: 2,
    episodeTitle: "退伍軍人蕭軍重生末世前一天,覺醒聽心聲異能,提前囤貨避險...",
    category: ["末世求生"],
    actor: "演員·彭羽",
    timestamp: "2040年11月10日 1:00 PM",
    likes: 20000,
    comments: 944,
    description: "第2集|退伍軍人蕭軍重生末世前一天,覺醒聽心聲異能,提前囤貨避險... 展開"
  },
  {
    id: "clip2",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    thumbnail: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=600&fit=crop",
    dramaId: "drama2",
    dramaTitle: "大災之年",
    episodeNumber: 1,
    episodeTitle: "我帶全家狂炫肉",
    category: ["奇幻腦洞"],
    actor: "演員·張三",
    timestamp: "2040年11月9日 3:30 PM",
    likes: 15000,
    comments: 523,
    description: "第1集|在災難來臨之際,我帶著全家人開始了瘋狂的囤貨之旅..."
  },
  {
    id: "clip3",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnail: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=600&fit=crop",
    dramaId: "drama3",
    dramaTitle: "重生之商業帝國",
    episodeNumber: 3,
    episodeTitle: "復仇計劃開始",
    category: ["商戰", "重生"],
    actor: "演員·李四",
    timestamp: "2040年11月8日 10:15 AM",
    likes: 18000,
    comments: 789,
    description: "第3集|重生歸來,我將用前世的記憶打造屬於我的商業帝國..."
  },
  {
    id: "clip4",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    thumbnail: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=600&fit=crop",
    dramaId: "drama4",
    dramaTitle: "極寒末日四個姐",
    episodeNumber: 1,
    episodeTitle: "極寒來襲",
    category: ["都市腦洞", "末日"],
    actor: "演員·王五",
    timestamp: "2040年11月7日 5:45 PM",
    likes: 22000,
    comments: 1024,
    description: "第1集|極寒末日來臨,我與四個姐姐一起在冰天雪地中求生..."
  },
  {
    id: "clip5",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    thumbnail: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=600&fit=crop",
    dramaId: "drama5",
    dramaTitle: "我在古代打造了悟空機甲",
    episodeNumber: 2,
    episodeTitle: "機甲覺醒",
    category: ["歷史古代", "科幻"],
    actor: "演員·趙六",
    timestamp: "2040年11月6日 2:20 PM",
    likes: 25000,
    comments: 1156,
    description: "第2集|穿越到古代,我利用現代科技打造了孫悟空機甲..."
  },
  // 添加更多視頻數據
  {
    id: "clip6",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    thumbnail: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=600&fit=crop",
    dramaId: "drama6",
    dramaTitle: "霸道總裁愛上我",
    episodeNumber: 1,
    episodeTitle: "初遇總裁",
    category: ["甜寵", "都市"],
    actor: "演員·陳七",
    timestamp: "2040年11月5日 9:00 AM",
    likes: 30000,
    comments: 2000,
    description: "第1集|平凡女孩意外成為總裁的貼身秘書..."
  },
  {
    id: "clip7",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    thumbnail: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=600&fit=crop",
    dramaId: "drama7",
    dramaTitle: "修仙之路",
    episodeNumber: 5,
    episodeTitle: "突破境界",
    category: ["玄幻", "仙俠"],
    actor: "演員·劉八",
    timestamp: "2040年11月4日 4:20 PM",
    likes: 28000,
    comments: 1500,
    description: "第5集|主角在修煉中突破瓶頸,實力大增..."
  },
  {
    id: "clip8",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    thumbnail: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=600&fit=crop",
    dramaId: "drama8",
    dramaTitle: "職場逆襲記",
    episodeNumber: 3,
    episodeTitle: "反擊開始",
    category: ["職場", "逆襲"],
    actor: "演員·孫九",
    timestamp: "2040年11月3日 11:30 AM",
    likes: 19000,
    comments: 800,
    description: "第3集|被陷害的主角開始反擊,揭露真相..."
  },
  {
    id: "clip9",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    thumbnail: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=600&fit=crop",
    dramaId: "drama9",
    dramaTitle: "校園青春戀曲",
    episodeNumber: 2,
    episodeTitle: "告白時刻",
    category: ["校園", "青春"],
    actor: "演員·周十",
    timestamp: "2040年11月2日 2:15 PM",
    likes: 16000,
    comments: 600,
    description: "第2集|青澀的校園愛情故事,告白時刻來臨..."
  },
  {
    id: "clip10",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    thumbnail: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=600&fit=crop",
    dramaId: "drama10",
    dramaTitle: "穿越時空的愛戀",
    episodeNumber: 4,
    episodeTitle: "時空之門",
    category: ["穿越", "愛情"],
    actor: "演員·吳十一",
    timestamp: "2040年11月1日 8:45 AM",
    likes: 24000,
    comments: 1200,
    description: "第4集|主角穿越時空,尋找真愛..."
  }
];

// 模擬用戶行為數據（用於個性化推薦）
interface UserBehavior {
  likedCategories: string[];
  followedDramas: string[];
  watchedClips: string[];
}

// 獲取初始視頻列表（支持分頁）
export const getVideoClips = (page: number = 0, pageSize: number = 5): VideoClip[] => {
  const start = page * pageSize;
  const end = start + pageSize;
  return ALL_VIDEO_CLIPS.slice(start, end);
};

// 獲取推薦視頻（個性化推薦）
export const getRecommendedClips = (
  page: number = 0,
  pageSize: number = 5,
  userBehavior?: UserBehavior
): VideoClip[] => {
  let clips = [...ALL_VIDEO_CLIPS];
  
  // 如果有用戶行為數據，進行個性化排序
  if (userBehavior) {
    clips = clips.sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;
      
      // 根據用戶喜歡的類型加分
      userBehavior.likedCategories.forEach(cat => {
        if (a.category.includes(cat)) scoreA += 10;
        if (b.category.includes(cat)) scoreB += 10;
      });
      
      // 根據追劇加分
      if (userBehavior.followedDramas.includes(a.dramaId)) scoreA += 20;
      if (userBehavior.followedDramas.includes(b.dramaId)) scoreB += 20;
      
      // 根據熱度加分（點讚數）
      scoreA += a.likes / 1000;
      scoreB += b.likes / 1000;
      
      return scoreB - scoreA; // 降序排列
    });
  } else {
    // 沒有用戶行為時，按熱度排序
    clips = clips.sort((a, b) => b.likes - a.likes);
  }
  
  // 移除已觀看的視頻
  if (userBehavior) {
    clips = clips.filter(clip => !userBehavior.watchedClips.includes(clip.id));
  }
  
  const start = page * pageSize;
  const end = start + pageSize;
  return clips.slice(start, end);
};

// 檢查是否還有更多視頻
export const hasMoreClips = (currentCount: number): boolean => {
  return currentCount < ALL_VIDEO_CLIPS.length;
};

// 根據 ID 獲取單個視頻片段
export const getVideoClipById = (id: string): VideoClip | undefined => {
  return ALL_VIDEO_CLIPS.find(clip => clip.id === id);
};

