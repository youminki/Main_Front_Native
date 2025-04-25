// src/layouts/AppLayout.tsx
import React from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import UnifiedHeader from '../components/UnifiedHeader';
import BottomNav from '../components/BottomNav1';
import useHeaderConfig from '../hooks/useHeaderConfig';
import useImageLoader from '../hooks/useImageLoader';

const AppLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 헤더/네비 설정
  const {
    includeHeader1,
    includeHeader2,
    includeHeader3,
    includeHeader4,
    includeBottomNav,
    headerTitle,
    disablePadding,
  } = useHeaderConfig(location.pathname);

  // 이미지 로딩 & exit 애니메이션
  const { loading, exit, handleBackWithExit } = useImageLoader(
    navigate,
    location.pathname
  );

  if (loading) {
    return (
      <LoadingOverlay>
        <LoadingSpinner />
      </LoadingOverlay>
    );
  }

  return (
    <AppContainer>
      {includeHeader1 && <UnifiedHeader variant='default' />}
      {includeHeader2 && <UnifiedHeader variant='oneDepth' exit={exit} />}
      {includeHeader3 && (
        <UnifiedHeader
          variant='twoDepth'
          title={headerTitle}
          onBack={handleBackWithExit}
          exit={exit}
        />
      )}
      {includeHeader4 && (
        <UnifiedHeader
          variant='threeDepth'
          title={headerTitle}
          onBack={handleBackWithExit}
          exit={exit}
        />
      )}

      <ContentContainer
        disablePadding={disablePadding}
        animate={includeHeader3 || includeHeader4}
        exit={exit}
      >
        <Outlet />
      </ContentContainer>

      {includeBottomNav && <BottomNav />}
    </AppContainer>
  );
};

export default AppLayout;

// styled & animation
const slideIn = keyframes`
  from { transform: translateX(100%); }
  to   { transform: translateX(0); }
`;

const slideOut = keyframes`
  from { transform: translateX(0); }
  to   { transform: translateX(100%); }
`;

const spin = keyframes`
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div<{
  disablePadding?: boolean;
  animate: boolean;
  exit: boolean;
}>`
  flex: 1;
  padding: ${({ disablePadding }) => (disablePadding ? '0' : '70px 0')};
  /* animation: ${({ exit, animate }) =>
    exit ? slideOut : animate ? slideIn : 'none'}
    0.3s ease-out; */
  overflow: auto;
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const LoadingSpinner = styled.div`
  border: 8px solid rgba(246, 172, 54, 0.3);
  border-top: 8px solid #f6ac36;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${spin} 1s linear infinite;
`;
