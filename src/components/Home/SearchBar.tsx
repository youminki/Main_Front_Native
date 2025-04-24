// src/components/Home/SearchBar.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { FiSearch, FiX } from 'react-icons/fi';
import { BiTime } from 'react-icons/bi';
import { useSearchParams } from 'react-router-dom';

const HISTORY_KEY = 'search_history';
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-5px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  position: relative;
  width: 100%;
`;
const Form = styled.form`
  display: flex;
  align-items: center;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 24px;
  padding: 6px 12px;
  animation: ${fadeIn} 0.2s ease-out;
`;
const Input = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  color: #333;
  font-size: 1rem;
  padding: 8px;
  &::placeholder {
    color: #aaa;
  }
  &:focus {
    outline: none;
  }
`;
const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
`;
const Dropdown = styled.ul`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 0;
  padding: 8px 0;
  list-style: none;
  animation: ${fadeIn} 0.2s ease-out;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
`;
const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  cursor: pointer;
  &:hover {
    background: #f5f5f5;
  }
`;
const ItemText = styled.span`
  display: flex;
  align-items: center;
  color: #333;
  font-size: 0.95rem;
`;
const ClearAll = styled.div`
  text-align: center;
  padding: 8px;
  color: #d00;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background: #fdecea;
  }
`;

export const SearchBar: React.FC<{
  onSearch?: (q: string) => void;
  placeholder?: string;
}> = ({ onSearch, placeholder }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get('search') ?? '');
  const [history, setHistory] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(HISTORY_KEY);
    if (stored) setHistory(JSON.parse(stored));
  }, []);
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const saveHistory = useCallback(
    (term: string) => {
      const updated = [term, ...history.filter((h) => h !== term)].slice(0, 5);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      setHistory(updated);
    },
    [history]
  );

  const handleSubmit = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault();
      const term = query.trim();
      if (!term) return;
      saveHistory(term);
      params.set('search', term);
      setParams(params);
      setOpen(false);
      onSearch?.(term);
    },
    [query, params, setParams, saveHistory, onSearch]
  );

  return (
    <Container ref={wrapperRef}>
      <Form onSubmit={handleSubmit} onClick={() => setOpen(true)}>
        <FiSearch size={20} color='#666' style={{ marginRight: 8 }} />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder ?? '검색'}
        />
        {query && (
          <Button type='button' onClick={() => setQuery('')}>
            <FiX size={18} />
          </Button>
        )}
      </Form>
      {open && history.length > 0 && (
        <Dropdown>
          {history.map((item, idx) => (
            <Item
              key={idx}
              onClick={() => {
                setQuery(item);
                handleSubmit();
              }}
            >
              <ItemText>
                <BiTime size={16} style={{ marginRight: 8 }} />
                {item}
              </ItemText>
              <FiX
                size={14}
                color='#aaa'
                onClick={(e) => {
                  e.stopPropagation();
                  const f = history.filter((h) => h !== item);
                  localStorage.setItem(HISTORY_KEY, JSON.stringify(f));
                  setHistory(f);
                }}
              />
            </Item>
          ))}
          <ClearAll
            onClick={() => {
              localStorage.removeItem(HISTORY_KEY);
              setHistory([]);
            }}
          >
            전체 삭제
          </ClearAll>
        </Dropdown>
      )}
    </Container>
  );
};

export default SearchBar;
