import React, { useRef, useEffect } from 'react';

interface CategoryFilterProps {
  mainCategories: string[];
  subCategories: string[];
  selectedMainCategory: string;
  selectedSubCategory: string;
  onMainCategoryChange: (category: string) => void;
  onSubCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  mainCategories,
  subCategories,
  selectedMainCategory,
  selectedSubCategory,
  onMainCategoryChange,
  onSubCategoryChange,
}) => {
  const mainCategoryRef = useRef<HTMLDivElement>(null);
  const subCategoryRef = useRef<HTMLDivElement>(null);

  // 自動滾動到選中的主分類
  useEffect(() => {
    if (mainCategoryRef.current) {
      const selectedElement = mainCategoryRef.current.querySelector('.main-category-item.active');
      if (selectedElement) {
        selectedElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [selectedMainCategory]);

  return (
    <div className="category-filter">
      {/* 主分類導航 */}
      <div className="main-category-nav" ref={mainCategoryRef}>
        {mainCategories.map((category) => (
          <button
            key={category}
            className={`main-category-item ${selectedMainCategory === category ? 'active' : ''}`}
            onClick={() => onMainCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 子分類篩選 */}
      <div className="sub-category-nav" ref={subCategoryRef}>
        {subCategories.map((subCategory) => (
          <button
            key={subCategory}
            className={`sub-category-item ${selectedSubCategory === subCategory ? 'active' : ''}`}
            onClick={() => onSubCategoryChange(subCategory)}
          >
            {subCategory}
          </button>
        ))}
        <button className="sub-category-more">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CategoryFilter;

