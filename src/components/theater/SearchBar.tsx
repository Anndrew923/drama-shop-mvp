import React, { useState, useEffect } from 'react';

interface SearchBarProps {
  placeholder: string;
  onSearch: (query: string) => void;
  value?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onSearch, value = '' }) => {
  const [query, setQuery] = useState(value);

  // 同步外部 value 变化
  useEffect(() => {
    setQuery(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="theater-search-bar">
      <form onSubmit={handleSubmit}>
        <div className="search-input-container">
          <svg 
            className="search-icon" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder={placeholder}
            value={query}
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;

