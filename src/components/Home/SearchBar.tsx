import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import styled, { keyframes } from 'styled-components';
import { FiSearch, FiX } from 'react-icons/fi';
import { BiTimeFive } from 'react-icons/bi';
import { useSearchParams } from 'react-router-dom';

const HISTORY_KEY = 'search_history';

// 애니메이션 정의
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
`;
const slideDown = keyframes`
  from { transform: translateY(-10px); }
  to { transform: translateY(0); }
`;

// 검색 기록 드롭다운 컴포넌트
const HistoryDropdown: React.FC<{
  items: string[];
  onSelect: (value: string) => void;
  onRemove: (value: string) => void;
  onClearAll: () => void;
}> = ({ items, onSelect, onRemove, onClearAll }) => (
  <Dropdown role='listbox'>
    {items.map((item, idx) => (
      <DropdownItem key={idx}>
        <ItemButton onClick={() => onSelect(item)}>
          <BiTimeFive size={16} />
          <ItemText>{item}</ItemText>
        </ItemButton>
        <RemoveButton onClick={() => onRemove(item)}>
          <FiX size={14} />
        </RemoveButton>
      </DropdownItem>
    ))}
    <ClearAllWrapper>
      <Divider />
      <ClearAllButton onClick={onClearAll}>전체 삭제</ClearAllButton>
    </ClearAllWrapper>
  </Dropdown>
);

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // URL의 ?search 를 초기값으로 사용
  const [query, setQuery] = useState(searchParams.get('search') || '');
  const [history, setHistory] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // 로컬스토리지에서 기록 불러오기
  useEffect(() => {
    const stored = localStorage.getItem(HISTORY_KEY);
    if (stored) {
      const parsed: string[] = JSON.parse(stored);
      setHistory(parsed.slice(0, 5));
    }
  }, []);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 기록 업데이트 (최대 5개)
  const updateHistory = useCallback(
    (value: string) => {
      const updated = [value, ...history.filter((h) => h !== value)].slice(
        0,
        5
      );
      setHistory(updated);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    },
    [history]
  );

  // 검색 실행
  const handleSearch = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault();
      const trimmed = query.trim();
      if (!trimmed) return;

      // 히스토리 업데이트
      updateHistory(trimmed);

      // URL에 ?search=검색어 반영
      setSearchParams({ search: trimmed });

      // 부모 콜백 호출 (필요 시)
      if (onSearch) {
        onSearch(trimmed);
      }

      setIsOpen(false);
    },
    [query, updateHistory, onSearch, setSearchParams]
  );

  return (
    <Container ref={wrapperRef}>
      <Form onSubmit={handleSearch} onFocus={() => setIsOpen(true)}>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='검색어를 입력하세요'
        />
        {query && (
          <ClearButton type='button' onClick={() => setQuery('')}>
            <FiX size={18} />
          </ClearButton>
        )}
        <SearchButton type='submit' aria-label='검색'>
          <FiSearch size={20} />
        </SearchButton>
      </Form>

      {isOpen && history.length > 0 && (
        <HistoryDropdown
          items={history}
          onSelect={(val) => {
            setQuery(val);
            handleSearch();
          }}
          onRemove={(val) => {
            const filtered = history.filter((h) => h !== val);
            setHistory(filtered);
            localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered));
          }}
          onClearAll={() => {
            setHistory([]);
            localStorage.removeItem(HISTORY_KEY);
          }}
        />
      )}
    </Container>
  );
};

export default memo(SearchBar);

// --- Styled Components ---
const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto 1rem;
`;
const Form = styled.form`
  display: flex;
  align-items: center;
  height: 48px;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  transition: box-shadow 0.2s;
  &:focus-within {
    box-shadow: 0 0 0 2px rgba(253, 180, 10, 0.3);
  }
`;
const Input = styled.input`
  flex: 1;
  height: 100%;
  padding: 0 12px;
  border: none;
  font-size: 1rem;
  &:focus {
    outline: none;
  }
`;
const ClearButton = styled.button`
  padding: 0 8px;
  background: none;
  border: none;
  cursor: pointer;
  color: #888;
`;
const SearchButton = styled.button`
  width: 48px;
  height: 100%;
  background: #f6ae24;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #fff;
  transition: background 0.2s;
  &:hover {
    background: #f7a000;
  }
`;
const Dropdown = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 3px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 0 0 4px 4px;
  z-index: 100;
  list-style: none;
  padding: 0;
  animation:
    ${fadeIn} 0.2s ease-out,
    ${slideDown} 0.2s ease-out;
`;
const DropdownItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  padding: 0 1rem;
  transition: background 0.15s;
  &:hover {
    background: #f9f9f9;
  }
`;
const ItemButton = styled.button`
  display: flex;
  align-items: center;
  flex: 1;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
`;
const ItemText = styled.span`
  margin-left: 0.5rem;
  font-size: 0.95rem;
  color: #333;
`;
const RemoveButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #bbb;
  &:hover {
    color: #888;
  }
`;
const Divider = styled.div`
  height: 1px;
  background: #eee;
`;
const ClearAllWrapper = styled.div`
  position: sticky;
  bottom: 0;
  background: #fff;
`;
const ClearAllButton = styled.button`
  width: 100%;
  height: 48px;
  background: none;
  border: none;
  text-align: center;
  font-weight: 600;
  color: #e74c3c;
  cursor: pointer;
  transition: background 0.15s;
  &:hover {
    background: #fdecea;
  }
`;
