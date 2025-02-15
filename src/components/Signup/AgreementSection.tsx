// src/components/AgreementSection.tsx
import React, { useState } from 'react';
import styled from 'styled-components';

type AgreementSectionProps = {};

type IndividualChecks = {
  agree1: boolean;
  agree2: boolean;
};

const AgreementSection: React.FC<AgreementSectionProps> = () => {
  const [allChecked, setAllChecked] = useState(false);
  const [individualChecks, setIndividualChecks] = useState<IndividualChecks>({
    agree1: false,
    agree2: false,
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleAllChecked = () => {
    const newValue = !allChecked;
    setAllChecked(newValue);
    setIndividualChecks({
      agree1: newValue,
      agree2: newValue,
    });
  };

  const handleIndividualCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setIndividualChecks((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  const handleViewDetails = (content: string) => {
    setModalContent(content);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <AgreementWrapper>
      <AllAgreeWrapper>
        <Checkbox
          type='checkbox'
          id='agreeAll'
          checked={allChecked}
          onChange={handleAllChecked}
        />
        <Label htmlFor='agreeAll'>전체동의</Label>
      </AllAgreeWrapper>

      <ContentContainer>
        <CheckboxWrapper>
          <Checkbox
            type='checkbox'
            id='agree1'
            required
            checked={individualChecks.agree1}
            onChange={handleIndividualCheck}
          />
          <Label htmlFor='agree1'>
            이용약관 동의 <RequiredText>(필수)</RequiredText>
          </Label>
        </CheckboxWrapper>
        <InputWrapper>
          <DescriptionWrapper>
            <Description>이용 전 필수사항 및 주의사항 안내.</Description>
          </DescriptionWrapper>
          <ViewDetailsButton
            onClick={() =>
              handleViewDetails(`
                본 약관은 주식회사 멜픽(이하 "회사"라 합니다.)가 제공하는 의류 및 잡화(이하 "제품"이라 합니다.) 판매 및 전자상거래에 관한 온/오프라인상의 제반 서비스(이하 "서비스"라 합니다.)를 이용함에 있어서 회사와 회원의 권리와 의무에 대한 책임사항을 규정함을 목적으로 합니다.
              `)
            }
          >
            전체보기
          </ViewDetailsButton>
        </InputWrapper>
        <CheckboxWrapper>
          <Checkbox
            type='checkbox'
            id='agree2'
            required
            checked={individualChecks.agree2}
            onChange={handleIndividualCheck}
          />
          <Label htmlFor='agree2'>
            개인정보수집 동의 <RequiredText>(필수)</RequiredText>
          </Label>
        </CheckboxWrapper>
        <InputWrapper>
          <DescriptionWrapper>
            <Description>서비스 이용에 필요한 개인정보 수집 안내.</Description>
          </DescriptionWrapper>
          <ViewDetailsButton
            onClick={() => handleViewDetails('개인정보수집 내용')}
          >
            전체보기
          </ViewDetailsButton>
        </InputWrapper>
      </ContentContainer>

      {modalVisible && (
        <Modal>
          <ModalContent>
            <ContentWrapper>
              <ModalHeader>
                <ModalTitle>이용약관</ModalTitle>
                <GrayLine />
                <SectionTitle>제1장 총칙</SectionTitle>
                <SubTitle>제1조 (목적)</SubTitle>
              </ModalHeader>
              <Text>{modalContent}</Text>
              <GrayLine />
              <CloseButtonWrapper>
                <CloseButton onClick={closeModal}>확인</CloseButton>
              </CloseButtonWrapper>
            </ContentWrapper>
          </ModalContent>
        </Modal>
      )}
    </AgreementWrapper>
  );
};

export default AgreementSection;

const AgreementWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  margin-bottom: 20px;
  width: 100%;
`;

const AllAgreeWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const ContentContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.lightgray};
  border: 1px solid ${({ theme }) => theme.colors.gray0};
  padding: 20px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray3};
  padding: 10px;
  position: relative;
`;

const Checkbox = styled.input`
  margin-bottom: 5px;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray2};
  border-radius: 3px;
  cursor: pointer;
  position: relative;

  &:checked {
    background-color: ${({ theme }) => theme.colors.white};
    border-color: ${({ theme }) => theme.colors.gray1};
  }

  &:checked::after {
    content: '';
    position: absolute;
    top: 3px;
    left: 3px;
    width: 10px;
    height: 5px;
    border-left: 3px solid orange;
    border-bottom: 3px solid orange;
    transform: rotate(-45deg);
  }

  &:focus {
    outline: none;
  }
`;

const Label = styled.label`
  ${({ theme }) => theme.fonts.default};
  color: ${({ theme }) => theme.colors.black};
`;

const RequiredText = styled.span`
  color: ${({ theme }) => theme.colors.gray2};
`;

const ViewDetailsButton = styled.button`
  width: 71px;
  height: 34px;
  background-color: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  cursor: pointer;
  font-size: 12px;
  border-radius: 5px;
  font-style: normal;
  font-weight: 800;
  text-align: center;
`;

const DescriptionWrapper = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  flex-grow: 1;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.gray};
  margin: 0;
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 13px;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 27px;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 20px;
  max-width: 500px;
  width: 100%;
  height: 670px;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  height: 486px;
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

const ModalTitle = styled.p`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 800;
  font-size: 16px;
  line-height: 16px;
  margin-top: 20px;
`;

const SectionTitle = styled.p`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 13.26px;
  margin-bottom: 20px;
`;

const SubTitle = styled.p`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 13.26px;
  margin-bottom: 20px;
`;

const Text = styled.p`
  height: 386px;
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 13.26px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.gray2};
`;

const GrayLine = styled.hr`
  border: none;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.gray0};
  margin: 20px 0;
`;

const CloseButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const CloseButton = styled.button`
  width: 100%;
  height: 56px;
  background-color: #000000;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
`;
