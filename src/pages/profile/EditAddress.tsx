// src/pages/Profile/EditAddress.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import FixedBottomBar from '../../components/FixedBottomBar';
import { AddressApi, CreateAddressRequest } from '../../api/address/address';

const EditAddress: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [deliveryMessage, setDeliveryMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    // TODO: 주소 검색 API 호출 로직 추가 (예: Daum 우편번호 서비스)
    alert(`주소 검색: ${searchQuery}`);
  };

  const handleSave = async () => {
    if (!searchQuery.trim() || !detailAddress.trim()) {
      alert('주소와 상세주소를 모두 입력해주세요.');
      return;
    }

    setLoading(true);
    const payload: CreateAddressRequest = {
      address: searchQuery,
      addressDetail: detailAddress,
    };

    try {
      const result = await AddressApi.createAddress(payload);
      // 필요하다면 deliveryMessage는 로컬 상태나 다른 API로 저장 처리
      alert(`주소가 등록되었습니다!\nID: ${result.id}`);
      navigate(-1);
    } catch (error: any) {
      console.error('주소 등록 실패:', error);
      alert('주소 등록 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
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
        text={loading ? '등록 중...' : '등록하기'}
        color='black'
        onClick={handleSave}
        disabled={loading}
      />
    </Container>
  );
};

export default EditAddress;

/* Styled Components */

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  margin-bottom: 50px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const FieldTitle = styled.div`
  font-weight: 700;
  font-size: 10px;
  line-height: 11px;
  color: #000;
  margin-bottom: 8px;
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 57px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 16px;
`;

const SearchInput = styled.input`
  flex: 1;
  height: 100%;
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

const SearchButton = styled.button`
  width: 69px;
  height: 34px;
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
  margin-bottom: 24px;

  &::placeholder {
    color: #ddd;
  }

  &:focus {
    outline: none;
    border-color: #000;
  }
`;

const MessageTitle = styled.div`
  font-weight: 700;
  font-size: 10px;
  line-height: 11px;
  color: #000;
  margin-bottom: 8px;
`;

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

const Separator = styled.div`
  width: 100%;
  height: 1px;
  background: #eee;
`;
