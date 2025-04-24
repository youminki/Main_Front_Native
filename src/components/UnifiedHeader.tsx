// src/components/UnifiedHeader.tsx
import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Cookies from 'js-cookie';
import { BiTime } from 'react-icons/bi';

import AlarmIcon from '../assets/Header/AlarmIcon.svg';
import BasketIcon from '../assets/Header/BasketIcon.svg';
import MypageIcon from '../assets/Header/MypageIcon.svg';
import Logo from '../assets/Logo.svg';
import BackButtonIcon from '../assets/Header/BackButton.svg';
import CancleIconIcon from '../assets/Header/CancleIcon.svg';
import ShareIcon from '../assets/Header/ShareIcon.svg';
import HomeIcon from '../assets/Header/HomeIcon.svg';
import SearchIcon from '../assets/Header/SearchIcon.svg';

import MypageModal from '../components/MypageModal';

// UnifiedHeader 컴포넌트에 전달되는 props 타입 정의
interface UnifiedHeaderProps {
  variant?: 'default' | 'oneDepth' | 'twoDepth' | 'threeDepth';
  title?: string;
  onBack?: () => void;
  exit?: boolean;
}
const HISTORY_KEY = 'search_history';

// 애니메이션 keyframes
const slideIn = keyframes`
  from { transform: translate3d(100%, 0, 0); }
  to   { transform: translate3d(0, 0, 0); }
`;
const slideOut = keyframes`
  from { transform: translate3d(0, 0, 0); }
  to   { transform: translate3d(100%, 0, 0); }
`;
const fadeInDown = keyframes`
  from { opacity: 0; transform: translate3d(0, -10px, 0); }
  to   { opacity: 1; transform: translate3d(0, 0, 0); }
`;

// 애니메이션 래퍼 (threeDepth 전용)
const AnimatedHeaderWrapper = styled.div<{ exit?: boolean }>`
  animation: ${({ exit }) => (exit ? slideOut : slideIn)} 0.3s
    cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
  will-change: transform;
`;

// 기본 레이아웃
const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
  z-index: 1000;
`;
const HeaderContainer = styled.header`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  position: relative;
`;
const LeftSection = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const CenterSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

// 텍스트/아이콘
const LogoIcon = styled.img`
  height: 32px;
  cursor: pointer;
`;
const Icon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
  flex-shrink: 0;
`;
const ProfileImage = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  margin-right: 10px;
`;
const Greeting = styled.div`
  display: flex;
  align-items: center;
`;
const GreetingText = styled.div`
  font-size: 12px;
  color: #000;
  margin-left: 4px;
`;
const Nickname = styled.span`
  font-weight: 800;
  font-size: 18px;
  color: #000;
`;
const Title = styled.h1`
  font-weight: 700;
  font-size: 20px;
  margin: 0;
`;
const BackButton = styled.img`
  cursor: pointer;
  flex-shrink: 0;
`;
const CancelIcon = styled.img`
  cursor: pointer;
  flex-shrink: 0;
`;

// — 검색창 스타일 —
const SearchBox = styled.div<{ open: boolean }>`
  display: flex;
  align-items: center;

  border-radius: 18px;
  padding: 4px;
  transition:
    width 0.25s ease,
    box-shadow 0.25s ease,
    background 0.25s ease;
  width: ${({ open }) => (open ? '240px' : '32px')};
  box-shadow: ${({ open }) =>
    open ? '0 2px 8px rgba(0, 0, 0, 0.15)' : 'none'};
  will-change: width, box-shadow;
  position: relative;
  width: 100%;
`;
const SearchIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #333;
  flex-shrink: 0;
`;
const SearchInput = styled.input<{ open: boolean }>`
  flex: 1;
  margin-left: ${({ open }) => (open ? '8px' : '0')};
  border: none;
  outline: none;
  width: ${({ open }) => (open ? 'auto' : '0')};
  opacity: ${({ open }) => (open ? 1 : 0)};
  transition:
    width 0.25s ease,
    margin-left 0.25s ease,
    opacity 0.2s ease 0.1s;
`;
const Dropdown = styled.ul`
  position: absolute;
  top: 35px;
  left: 0;

  width: 100%;
  min-width: 240px;

  background: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  list-style: none;
  margin: 4px 0 0;
  padding: 0;

  overflow-y: auto;
  z-index: 1100;
  animation: ${fadeInDown} 0.3s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
  will-change: opacity, transform;
`;
const Item = styled.li`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  flex-shrink: 0;
  &:hover {
    background: #f5f5f5;
  }
`;
const ItemText = styled.span`
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  color: #333;
  flex-shrink: 0;
`;
const ClearAll = styled.div`
  text-align: center;
  padding: 8px;
  font-size: 0.9rem;
  color: #d00;
  cursor: pointer;
  &:hover {
    background: #fdecea;
  }
`;
const HistoryButton = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 12px;
  cursor: pointer;
  &:hover {
    background: #f5f5f5;
  }
`;
const UnifiedHeader: React.FC<UnifiedHeaderProps> = ({
  variant = 'default',
  title,
  onBack,
  exit,
}) => {
  const navigate = useNavigate();

  // Auth
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nickname, setNickname] = useState('사용자');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (variant === 'default' || variant === 'oneDepth') {
      const check = () => {
        const token = Cookies.get('accessToken');
        const nick = Cookies.get('nickname');
        setIsLoggedIn(!!token);
        if (token) setNickname(nick || '멜픽 회원');
      };
      check();
      const id = setInterval(check, 1000);
      return () => clearInterval(id);
    }
  }, [variant]);

  // 검색
  const [searchParams, setSearchParams] = useSearchParams();
  const [openSearch, setOpenSearch] = useState(false);
  const [query, setQuery] = useState(searchParams.get('search') || '');
  const [historyState, setHistoryState] = useState<string[]>([]);
  const boxRef = useRef<HTMLDivElement>(null);

  // --- UnifiedHeader 내부에 추가 ---
  const handleSearchClick = () => {
    if (openSearch && query.trim()) {
      // 열려 있고, query가 비어있지 않으면 검색 수행
      handleSearchSubmit(new Event('submit') as any);
    } else {
      // 그렇지 않으면 토글만
      toggleSearch();
    }
  };

  // 히스토리 로드
  useEffect(() => {
    const stored = localStorage.getItem(HISTORY_KEY);
    if (stored) setHistoryState(JSON.parse(stored));
  }, []);

  // 외부 클릭으로 닫기
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpenSearch(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const saveHistory = (term: string) => {
    const updated = [term, ...historyState.filter((h) => h !== term)].slice(
      0,
      5
    );
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    setHistoryState(updated);
  };

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    const term = query.trim();
    if (!term) return;
    saveHistory(term);
    setSearchParams({ search: term });
    setOpenSearch(false);
  };

  const toggleSearch = () => {
    setOpenSearch((o) => !o);
    if (!openSearch) {
      setTimeout(() => boxRef.current?.querySelector('input')?.focus(), 100);
    }
  };

  const handleBack = () => {
    if (onBack) onBack();
    else navigate(-1);
  };
  const handleHistoryClick = (term: string) => {
    setQuery(term);
    saveHistory(term);
    setSearchParams({ search: term });
    setOpenSearch(false);
  };
  // --- default variant ---
  if (variant === 'default') {
    return (
      <>
        <HeaderWrapper>
          <HeaderContainer>
            <LeftSection onClick={() => isLoggedIn && setIsModalOpen(true)}>
              {isLoggedIn ? (
                <Greeting>
                  <ProfileImage
                    src='https://via.placeholder.com/44'
                    alt='프로필'
                  />
                  <GreetingText>
                    <Nickname>{nickname}</Nickname> 님 안녕하세요!
                  </GreetingText>
                </Greeting>
              ) : (
                <LogoIcon src={Logo} alt='Logo' onClick={() => navigate('/')} />
              )}
            </LeftSection>

            <RightSection>
              {/* 검색 기능 */}
              <SearchBox open={openSearch} ref={boxRef}>
                <form
                  onSubmit={handleSearchSubmit}
                  style={{ display: 'flex', flex: 1 }}
                >
                  <SearchInput
                    open={openSearch}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSearchSubmit(e as any);
                      }
                    }}
                    placeholder='검색어를 입력하세요'
                  />
                </form>
                <SearchIconWrapper onClick={handleSearchClick}>
                  <Icon src={SearchIcon} alt='검색' />
                </SearchIconWrapper>

                {openSearch && historyState.length > 0 && (
                  <Dropdown>
                    {historyState.map((item, idx) => (
                      <Item key={idx}>
                        <HistoryButton onClick={() => handleHistoryClick(item)}>
                          <BiTime size={16} style={{ marginRight: 8 }} />
                          <span>{item}</span>
                        </HistoryButton>
                      </Item>
                    ))}
                    <ClearAll
                      onClick={() => {
                        localStorage.removeItem(HISTORY_KEY);
                        setHistoryState([]);
                      }}
                    >
                      전체 삭제
                    </ClearAll>
                  </Dropdown>
                )}
              </SearchBox>

              {/* 나머지 아이콘 */}
              {isLoggedIn ? (
                <>
                  <Icon
                    src={BasketIcon}
                    alt='장바구니'
                    onClick={() => navigate('/basket')}
                  />
                  <Icon
                    src={AlarmIcon}
                    alt='알림'
                    onClick={() => navigate('/Alarm')}
                  />
                </>
              ) : (
                <>
                  <Icon
                    src={MypageIcon}
                    alt='마이페이지'
                    onClick={() => navigate('/login')}
                  />
                  <Icon
                    src={AlarmIcon}
                    alt='알림'
                    onClick={() => navigate('/Alarm')}
                  />
                </>
              )}
            </RightSection>
          </HeaderContainer>
        </HeaderWrapper>
        <MypageModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </>
    );
  }

  // --- oneDepth variant ---
  if (variant === 'oneDepth') {
    return (
      <HeaderWrapper>
        <HeaderContainer>
          <LeftSection>
            <BackButton
              src={BackButtonIcon}
              alt='뒤로가기'
              onClick={handleBack}
            />
          </LeftSection>
          <RightSection>
            {/* 로그인/비로그인 상관없이 검색 아이콘 표시 */}
            <SearchIconWrapper onClick={() => setOpenSearch((o) => !o)}>
              <Icon src={SearchIcon} alt='검색' />
            </SearchIconWrapper>
            {isLoggedIn ? (
              <>
                <Icon
                  src={BasketIcon}
                  alt='장바구니'
                  onClick={() => navigate('/basket')}
                />
                <Icon
                  src={AlarmIcon}
                  alt='알림'
                  onClick={() => navigate('/Alarm')}
                />
              </>
            ) : (
              <>
                <Icon
                  src={MypageIcon}
                  alt='마이페이지'
                  onClick={() => navigate('/login')}
                />
                <Icon
                  src={AlarmIcon}
                  alt='알림'
                  onClick={() => navigate('/Alarm')}
                />
              </>
            )}
          </RightSection>
          {/* oneDepth 검색 드롭다운은 필요 시 추가 */}
        </HeaderContainer>
      </HeaderWrapper>
    );
  }

  // --- twoDepth variant ---
  if (variant === 'twoDepth') {
    return (
      <HeaderWrapper>
        <HeaderContainer>
          <LeftSection>
            <CancelIcon
              src={CancleIconIcon}
              alt='취소'
              onClick={() => navigate(-1)}
            />
          </LeftSection>
          <CenterSection>
            <Title>{title}</Title>
          </CenterSection>
          <RightSection>
            <Icon src={ShareIcon} alt='공유' onClick={() => {}} />
            <Icon src={HomeIcon} alt='홈' onClick={() => navigate('/')} />
          </RightSection>
        </HeaderContainer>
      </HeaderWrapper>
    );
  }

  // --- threeDepth variant ---
  if (variant === 'threeDepth') {
    return (
      <AnimatedHeaderWrapper exit={exit}>
        <HeaderWrapper>
          <HeaderContainer>
            <LeftSection>
              <BackButton
                src={BackButtonIcon}
                alt='뒤로가기'
                onClick={handleBack}
              />
            </LeftSection>
            <CenterSection>
              <Title>{title}</Title>
            </CenterSection>
          </HeaderContainer>
        </HeaderWrapper>
      </AnimatedHeaderWrapper>
    );
  }

  return null;
};

export default UnifiedHeader;
