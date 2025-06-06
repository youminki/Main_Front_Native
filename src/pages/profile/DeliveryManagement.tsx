// src/pages/DeliveryManagement.tsx

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // useNavigate import 추가
import FixedBottomBar from '../../components/FixedBottomBar';

interface AddressItem {
  id: number;
  address: string;
  detail: string;
}

const DELIVERY_COUNT = 5;

const DeliveryManagement: React.FC = () => {
  const navigate = useNavigate(); // navigate 훅 생성

  // 5개의 빈 배송지 항목 초기화
  const [addresses, setAddresses] = useState<AddressItem[]>(
    Array.from({ length: DELIVERY_COUNT }, (_, i) => ({
      id: i,
      address: '',
      detail: '',
    }))
  );

  // 입력값 변경 핸들러
  const updateField = (
    index: number,
    field: 'address' | 'detail',
    value: string
  ) => {
    setAddresses((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, [field]: value } : item
      )
    );
  };

  // 해당 인덱스 배송지 초기화
  const clearAddress = (index: number) => {
    setAddresses((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, address: '', detail: '' } : item
      )
    );
  };

  // 수정 버튼 클릭 시 /EditAddress로 이동
  const handleEdit = (index: number) => {
    // 예시로 AddressItem 데이터나 index를 전달하고 싶다면 state 또는 쿼리 파라미터로 넘길 수 있습니다.
    // 여기서는 단순히 경로로 이동만 처리합니다.
    navigate('/EditAddress');
  };

  // 모바일 키보드 열림 감지 (BottomBar 숨김 위함)
  const initialHeight = window.visualViewport
    ? window.visualViewport.height
    : window.innerHeight;
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      const vh = window.visualViewport
        ? window.visualViewport.height
        : window.innerHeight;
      setIsKeyboardOpen(vh < initialHeight - 50);
    };
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
    } else {
      window.addEventListener('resize', handleResize);
    }
    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize);
      } else {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, [initialHeight]);

  // 배송지 등록 버튼 클릭 핸들러
  const handleRegister = () => {
    alert('배송지가 등록되었습니다.');
  };

  return (
    <>
      <Container>
        {addresses.map((item, idx) => (
          <Block key={item.id}>
            <Title>{idx === 0 ? '배송지 (기본)' : `배송지 ${idx + 1}`}</Title>
            <InputGroup>
              <CustomInput
                type='text'
                placeholder='도로명/지번을 입력하세요'
                value={item.address}
                onChange={(e) => updateField(idx, 'address', e.target.value)}
              />
              <CustomInput
                type='text'
                placeholder='상세주소를 입력하세요'
                value={item.detail}
                onChange={(e) => updateField(idx, 'detail', e.target.value)}
              />
            </InputGroup>
            <ButtonRow>
              <EditButton onClick={() => handleEdit(idx)}>수정</EditButton>
              <DeleteButton onClick={() => clearAddress(idx)}>
                삭제
              </DeleteButton>
            </ButtonRow>
            {idx < DELIVERY_COUNT - 1 && <Separator />}
          </Block>
        ))}
      </Container>

      {!isKeyboardOpen && (
        <FixedBottomBar
          type='button'
          text='배송지 등록'
          color='black'
          onClick={handleRegister}
        />
      )}
    </>
  );
};

export default DeliveryManagement;

/* Styled Components */

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  margin-bottom: 50px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 10px;
  line-height: 11px;
  color: #000000;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const CustomInput = styled.input`
  width: 100%;
  height: 57px;
  padding-left: 16px;
  box-sizing: border-box;
  background: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 4px;
  font-size: 13px;
  line-height: 14px;
  color: #000000;

  &::placeholder {
    font-weight: 400;
    color: #999999;
  }

  &:focus {
    outline: none;
    border-color: #000000;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const EditButton = styled.button`
  width: 91px;
  height: 46px;
  background: #000000;
  border: none;
  border-radius: 5px;
  font-weight: 800;
  font-size: 14px;
  line-height: 15px;
  color: #ffffff;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  width: 91px;
  height: 46px;
  background: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 5px;
  font-weight: 800;
  font-size: 14px;
  line-height: 15px;
  color: #000000;
  cursor: pointer;
`;

const Separator = styled.div`
  width: 100%;
  height: 1px;
  background: #eeeeee;
  margin: 30px 0;
`;
