import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const HISTORY_KEY = 'search_history';

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // 로컬스토리지에서 과거 검색어 불러오기
  useEffect(() => {
    const stored = localStorage.getItem(HISTORY_KEY);
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  // 외부 클릭 시 히스토리 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setShowHistory(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 검색 제출
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const term = searchTerm.trim();
    if (!term) return;
    // 중복 제거 후 최근 5개까지만
    const newHist = [term, ...history.filter((item) => item !== term)].slice(
      0,
      5
    );
    setHistory(newHist);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHist));
    // 검색 결과 페이지로 이동
    navigate(`/search?query=${encodeURIComponent(term)}`);
    setShowHistory(false);
  };

  // 히스토리 아이템 클릭
  const handleHistoryClick = (term: string) => {
    setSearchTerm(term);
    navigate(`/search?query=${encodeURIComponent(term)}`);
    setShowHistory(false);
  };

  return (
    <Wrapper ref={wrapperRef}>
      <Form onSubmit={handleSubmit}>
        <Input
          type='text'
          placeholder='검색어를 입력하세요'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setShowHistory(true)}
        />
      </Form>
      {showHistory && history.length > 0 && (
        <HistoryDropdown>
          {history.map((item, idx) => (
            <HistoryItem key={idx} onClick={() => handleHistoryClick(item)}>
              {item}
            </HistoryItem>
          ))}
        </HistoryDropdown>
      )}
    </Wrapper>
  );
};

export default SearchBar;

/* Styled Components */
const Wrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto 1rem;
`;

const Form = styled.form`
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #4285f4;
    box-shadow: 0 0 0 2px rgba(66, 133, 244, 0.3);
  }
`;

const HistoryDropdown = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: #fff;
  border: 1px solid #ddd;
  border-top: none;
  max-height: 200px;
  overflow-y: auto;
  z-index: 100;
`;

const HistoryItem = styled.li`
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    background: #f1f1f1;
  }
`;
