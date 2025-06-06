// src/pages/Profile/EditAddress.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import FixedBottomBar from '../../components/FixedBottomBar';

const EditAddress: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [deliveryMessage, setDeliveryMessage] = useState('');

  const handleSearch = () => {
    // TODO: 주소 검색 API 호출 로직 추가
    alert(`주소 검색: ${searchQuery}`);
  };

  const handleSave = () => {
    // TODO: 저장 로직 추가
    alert(
      `저장된 주소:\n${searchQuery}\n상세: ${detailAddress}\n메시지: ${deliveryMessage}`
    );
    navigate(-1);
  };

  return (
    <Container>
      <ContentWrapper>
        {/* 타이틀 */}
        <FieldTitle>배송지 입력 *</FieldTitle>

        {/* 검색 입력+버튼: SearchWrapper 안에서 input과 button을 flex로 배치 */}
        <SearchWrapper>
          <SearchInput
            type='text'
            placeholder='주소를 검색 하세요'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchButton onClick={handleSearch}>검색</SearchButton>
        </SearchWrapper>

        {/* 상세주소 입력란 */}
        <DetailInput
          type='text'
          placeholder='상세주소를 입력 하세요'
          value={detailAddress}
          onChange={(e) => setDetailAddress(e.target.value)}
        />

        {/* 배송 메시지 타이틀 */}
        <MessageTitle>배송 메세지 (선택)</MessageTitle>

        {/* 배송 메시지 입력란 */}
        <MessageInput
          type='text'
          placeholder='배송 시 전달할 내용을 입력하세요 (예: 공동 현관문 비번 등..)'
          value={deliveryMessage}
          onChange={(e) => setDeliveryMessage(e.target.value)}
        />

        {/* 구분선 */}
        <Separator />
      </ContentWrapper>

      {/* 하단 고정 바: 저장 버튼 */}
      <FixedBottomBar
        type='button'
        text='등록하기'
        color='black'
        onClick={handleSave}
      />
    </Container>
  );
};

export default EditAddress;

/* Styled Components */

/**
 * Container: 페이지 전체를 감싸는 컨테이너.
 * 화면 상단부터 세로로 쌓이며, 하단 FixedBottomBar와 겹치지 않도록 padding-bottom 확보
 */
const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  margin-bottom: 50px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

/**
 * ContentWrapper: 주요 입력 폼 요소들을 세로로 쌓아주는 래퍼
 */
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

/**
 * FieldTitle: "배송지 입력 *" 타이틀
 */
const FieldTitle = styled.div`
  font-weight: 700;
  font-size: 10px;
  line-height: 11px;
  color: #000;
  margin-bottom: 8px;
`;

/**
 * SearchWrapper: 검색 입력 + 버튼을 하나의 테두리로 감싸는 컨테이너
 *  – flex로 input과 button을 가로로 배치
 *  – 부모에만 border, border-radius를 주어 하나의 박스처럼 보이게 함
 */
const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 57px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 16px; /* 다음 요소와 간격 */
`;

/**
 * SearchInput: SearchWrapper 안의 실제 텍스트 입력란
 *  – 테두리 제거 (부모에서 테두리를 대신 담당)
 *  – 좌측 패딩만 줌
 */
const SearchInput = styled.input`
  flex: 1;
  height: 100%; /* 부모 높이(57px)에 맞춤 */
  padding-left: 16px;
  box-sizing: border-box;
  background: transparent;
  border: none;
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 14px;
  color: #000;

  &::placeholder {
    color: #ddd;
  }

  &:focus {
    outline: none;
  }
`;

/**
 * SearchButton: SearchWrapper 안의 버튼
 *  – 테두리 제거, 배경색, 오른쪽만 둥글게
 */
const SearchButton = styled.button`
  width: 69px;
  height: 34px; /* 부모 높이(57px)에 맞춤 */
  margin-right: 20px;
  background: #f6ae24;
  border: none;
  border-radius: 4px;
  font-weight: 800;
  font-size: 12px;
  line-height: 13px;
  color: #fff;
  cursor: pointer;

  &:hover {
    background: #e69e1e;
  }
`;

/**
 * DetailInput: 상세주소 입력란
 *  – SearchWrapper와 같은 높이(57px), 회색 테두리, 둥근 모서리
 */
const DetailInput = styled.input`
  width: 100%;
  height: 57px;
  padding-left: 16px;
  box-sizing: border-box;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-weight: 400;
  font-size: 13px;
  line-height: 14px;
  color: #000;
  margin-bottom: 24px; /* 다음 요소와 간격 */

  &::placeholder {
    color: #ddd;
  }

  &:focus {
    outline: none;
    border-color: #000;
  }
`;

/**
 * MessageTitle: "배송 메세지 (선택)" 타이틀
 */
const MessageTitle = styled.div`
  font-weight: 700;
  font-size: 10px;
  line-height: 11px;
  color: #000;
  margin-bottom: 8px;
`;

/**
 * MessageInput: 배송 메시지 입력란
 *  – 높이 57px, 회색 테두리, 둥근 모서리
 */
const MessageInput = styled.input`
  width: 100%;
  height: 57px;
  padding-left: 16px;
  box-sizing: border-box;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-weight: 400;
  font-size: 13px;
  line-height: 14px;
  color: #000;
  margin-bottom: 24px;

  &::placeholder {
    color: #ddd;
  }

  &:focus {
    outline: none;
    border-color: #000;
  }
`;

/**
 * Separator: 구분선
 */
const Separator = styled.div`
  width: 100%;
  height: 1px;
  background: #eee;
`;
