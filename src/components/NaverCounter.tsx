// src/components/NaverCounter.tsx
import React, { useEffect, useState } from 'react';

const NaverCounter: React.FC = () => {
  const [viewCount, setViewCount] = useState<number>(0);

  // 조회수 데이터를 가져오는 함수 (실제 API 주소 및 응답 구조에 맞게 수정)
  const fetchViewCount = () => {
    const timestamp = new Date().getTime();
    fetch(
      `https://api.naver.com/viewcount?site=https://me1pik.com/#/landing&_t=${timestamp}`
    )
      .then((res) => res.json())
      .then((data) => {
        // 응답 데이터에 count 필드가 있다고 가정
        setViewCount(data.count);
      })
      .catch((error) => console.error('조회수 데이터 가져오기 실패:', error));
  };

  useEffect(() => {
    // 네이버 조회수 스크립트를 동적 로드 (필요한 경우)
    const script = document.createElement('script');
    script.src = '//wcs.naver.net/wcslog.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if ('wcs_do' in window) {
        (window as any).wcs_do();
      }
    };

    // 초기 조회수 데이터 호출
    fetchViewCount();

    // 10초마다 조회수 업데이트 (10000ms)
    const interval = setInterval(fetchViewCount, 10000);

    return () => {
      clearInterval(interval);
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id='naver-counter' style={{ padding: '10px', textAlign: 'center' }}>
      <span>네이버 조회수: </span>
      <span>{viewCount}</span>
    </div>
  );
};

export default NaverCounter;
