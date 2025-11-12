import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SearchBar from '../components/theater/SearchBar';
import CategoryFilter from '../components/theater/CategoryFilter';
import DramaGrid from '../components/theater/DramaGrid';
import { getAllDramas, Drama } from '../services/dramaService';

const TheaterPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [dramas, setDramas] = useState<Drama[]>([]);
  const [filteredDramas, setFilteredDramas] = useState<Drama[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('找劇');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('推薦榜');

  // 應用篩選
  const applyFilters = (category: string, subCategory: string) => {
    let filtered = [...dramas];

    // 主分類篩選
    if (category !== '找劇') {
      filtered = filtered.filter(drama => 
        drama.category.some(cat => cat.includes(category))
      );
    }

    // 子分類篩選
    if (subCategory === '推薦榜') {
      filtered = filtered.sort((a, b) => b.totalLikes - a.totalLikes);
    } else if (subCategory === '新劇') {
      filtered = filtered.sort((a, b) => b.latestEpisode - a.latestEpisode);
    } else if (subCategory === '打臉虐渣') {
      filtered = filtered.filter(drama => 
        drama.category.some(cat => cat.includes('打臉') || cat.includes('虐渣'))
      );
    } else if (subCategory === '總裁') {
      filtered = filtered.filter(drama => 
        drama.category.some(cat => cat.includes('總裁') || cat.includes('商戰'))
      );
    }

    setFilteredDramas(filtered);
  };

  // 初始化數據
  useEffect(() => {
    const allDramas = getAllDramas();
    console.log('載入的短劇數量:', allDramas.length); // 除錯資訊
    console.log('短劇列表:', allDramas); // 除錯資訊
    setDramas(allDramas);
    // 初始化後應用預設篩選
    const filtered = [...allDramas].sort((a, b) => b.totalLikes - a.totalLikes);
    setFilteredDramas(filtered);
  }, []);

  // 處理 URL 參數（從首頁跳轉過來）
  useEffect(() => {
    const dramaId = searchParams.get('drama');
    if (dramaId && dramas.length > 0) {
      // 跳轉到首頁並播放該短劇的第一集
      const drama = dramas.find(d => d.id === dramaId);
      if (drama) {
        navigate(`/?drama=${dramaId}&episode=${drama.firstEpisodeId}`);
      }
    }
  }, [searchParams, dramas, navigate]);

  // 處理搜尋
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      // 執行搜尋
      const results = dramas.filter(drama =>
        drama.title.toLowerCase().includes(query.toLowerCase()) ||
        drama.actor.toLowerCase().includes(query.toLowerCase()) ||
        drama.category.some(cat => cat.toLowerCase().includes(query.toLowerCase()))
      );
      setFilteredDramas(results);
    } else {
      // 恢復篩選
      applyFilters(selectedCategory, selectedSubCategory);
    }
  };

  // 處理主分類切換
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery(''); // 清除搜尋
    applyFilters(category, selectedSubCategory);
  };

  // 處理子分類切換
  const handleSubCategoryChange = (subCategory: string) => {
    setSelectedSubCategory(subCategory);
    applyFilters(selectedCategory, subCategory);
  };

  // 處理短劇卡片點擊
  const handleDramaClick = (drama: Drama) => {
    navigate(`/?drama=${drama.id}&episode=${drama.firstEpisodeId}`);
  };

  return (
    <div className="theater-page">
      <SearchBar 
        placeholder="Q 卧底恋人" 
        onSearch={handleSearch}
        value={searchQuery}
      />
      <CategoryFilter
        mainCategories={['找劇', '電影', '電視劇', '聽書', '小說', '漫畫', '經典']}
        subCategories={['推薦榜', '新劇', '打臉虐渣', '總裁']}
        selectedMainCategory={selectedCategory}
        selectedSubCategory={selectedSubCategory}
        onMainCategoryChange={handleCategoryChange}
        onSubCategoryChange={handleSubCategoryChange}
      />
      <DramaGrid 
        dramas={filteredDramas}
        onDramaClick={handleDramaClick}
      />
      {/* 臨時除錯資訊 - 可以刪除 */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{ padding: '20px', color: '#fff', fontSize: '12px' }}>
          <p>短劇總數: {dramas.length}</p>
          <p>篩選後數量: {filteredDramas.length}</p>
        </div>
      )}
    </div>
  );
};

export default TheaterPage;
