import React, { useState } from 'react';
import styled from 'styled-components';

import ReusableModal2 from '../../../components/ReusableModal2';

const SubscriptionPassDetail: React.FC = () => {
  const [isCancelled, setIsCancelled] = useState(false);

  const [isModalOpen, setModalOpen] = useState(false);

  const [modalMessage, setModalMessage] = useState('');

  const [onModalConfirm, setOnModalConfirm] = useState<() => void>(() => {});

  const [isSettingOpen, setIsSettingOpen] = useState(false);

  const [selectedPlan, setSelectedPlan] = useState<
    '월 4회권' | '무제한 이용권'
  >('월 4회권');

  const handleOpenSetting = () => {
    setIsSettingOpen(true);
  };

  const handleSubmitChange = () => {
    setIsSettingOpen(false);
  };

  const handleButtonClick = () => {
    if (!isCancelled) {
      setModalMessage('다음 시즌 자동연장을 취소 하시겠습니까?');
      setOnModalConfirm(() => () => {
        setIsCancelled(true);
        setModalOpen(false);
      });
      setModalOpen(true);
    } else {
      setModalMessage('시즌 자동연장을 다시 하시겠습니까?');
      setOnModalConfirm(() => () => {
        setIsCancelled(false);
        setModalOpen(false);
      });
      setModalOpen(true);
    }
  };

  return (
    <Container>
      <ContentArea>
        <Section>
          <SectionTitle>이용 중인 이용권</SectionTitle>
          <InFieldBoxBlack>
            <PassName>
              정기 구독권 <GrayText>({selectedPlan})</GrayText>
            </PassName>
            <InFieldButton onClick={handleOpenSetting}>설정변경</InFieldButton>
          </InFieldBoxBlack>
        </Section>

        {isSettingOpen && (
          <CustomModal onClose={() => setIsSettingOpen(false)}>
            <ModalTitle>이용권 설정변경</ModalTitle>

            <SubTitle>이용 중인 이용권</SubTitle>
            <GrayBox>정기 구독권</GrayBox>

            <SubTitle>이용권 설정 *</SubTitle>
            <BlackBox>
              <SelectStyle
                value={selectedPlan}
                onChange={(e) =>
                  setSelectedPlan(
                    e.target.value as '월 4회권' | '무제한 이용권'
                  )
                }
              >
                <option value='월 4회권'>월 4회권</option>
                <option value='무제한 이용권'>무제한 이용권</option>
              </SelectStyle>
            </BlackBox>

            <SubmitBtn onClick={handleSubmitChange}>변경신청</SubmitBtn>
          </CustomModal>
        )}

        <Section>
          <SectionTitle>이용권 사용기간</SectionTitle>
          <ReadOnlyBox>
            2025.02.01 ~ 2025.02.28 <GrayText>(유효기간)</GrayText>
          </ReadOnlyBox>
        </Section>

        <Section>
          <SectionTitle>이용권 결제일시</SectionTitle>
          <ReadOnlyBox>
            2025.02.01 <GrayText>(14:40:38)</GrayText>
          </ReadOnlyBox>
        </Section>

        <Section>
          <Row style={{ gap: '20px' }}>
            <HalfSection>
              <SectionTitle>이용권(매달) 결제금액</SectionTitle>
              <ReadOnlyBox>
                <PriceText>120,000</PriceText>
              </ReadOnlyBox>
            </HalfSection>
            <HalfSection>
              <SectionTitle>다음 결제일</SectionTitle>
              <ReadOnlyBox>2025.03.01</ReadOnlyBox>
            </HalfSection>
          </Row>
        </Section>

        <Section>
          <SectionTitle>시즌 자동연장</SectionTitle>
          <InFieldBoxGray>
            <Row>
              <SeasonLabel>다음 시즌</SeasonLabel>
              <Pipe> | </Pipe>
              <SeasonValue>2025 SUMMER</SeasonValue>
            </Row>
            <InFieldButton onClick={handleButtonClick}>
              {isCancelled ? '취소신청 완료' : '취소신청'}
            </InFieldButton>
          </InFieldBoxGray>
        </Section>

        <ReusableModal2
          isOpen={isModalOpen}
          title='시즌 자동연장'
          onClose={() => setModalOpen(false)}
          onConfirm={onModalConfirm}
        >
          {modalMessage}
        </ReusableModal2>

        <Divider />

        <NoticeArea>
          <NoticeText>
            ※ 이용 중인 구독권은 시즌 중간에{' '}
            <OrangeBold>취소가 불가</OrangeBold>합니다.
          </NoticeText>
          <NoticeText>
            만약, 취소가 필요할 경우는 서비스팀에 문의해 주시기 바랍니다.
          </NoticeText>
        </NoticeArea>
      </ContentArea>
    </Container>
  );
};

export default SubscriptionPassDetail;

interface CustomModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({ onClose, children }) => {
  return (
    <>
      <Overlay onClick={onClose} />
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContainer>
    </>
  );
};

const Overlay = styled.div`
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

const ModalContainer = styled.div`
  background: #ffffff;
  border-radius: 6px;
  box-sizing: border-box;

  padding: 20px;

  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 9999;
  padding: 1rem;
`;

const ModalTitle = styled.div`
  font-weight: 800;
  font-size: 16px;
  line-height: 18px;
  color: #000000;
`;

const SubTitle = styled.div`
  font-weight: 700;
  font-size: 10px;
  line-height: 11px;
  color: #000000;
  margin-bottom: 6px;
`;

const GrayBox = styled.div`
  height: 57px;
  background: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 4px;

  display: flex;
  align-items: center;
  padding: 0 16px;

  font-weight: 800;
  font-size: 13px;
  color: #000000;
`;

const BlackBox = styled.div`
  height: 57px;
  background: #ffffff;
  border: 1px solid #000000;
  border-radius: 4px;

  display: flex;
  align-items: center;
  padding: 0 16px;
`;

const SelectStyle = styled.select`
  width: 100%;
  height: 100%;

  font-size: 13px;
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;
`;

const SubmitBtn = styled.button`
  width: 100%;
  height: 56px;
  background: #000000;
  border-radius: 6px;
  border: none;
  cursor: pointer;

  font-weight: 800;
  font-size: 16px;
  line-height: 18px;
  color: #ffffff;
`;

const Container = styled.div`
  position: relative;
  background: #ffffff;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  max-width: 600px;
  padding: 1rem;
`;

const ContentArea = styled.div`
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #dddddd;
  margin-bottom: 30px;
`;

const SectionTitle = styled.div`
  font-weight: 700;
  font-size: 10px;
  line-height: 11px;
  color: #000000;
  margin-bottom: 10px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HalfSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ReadOnlyBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 57px;
  border: 1px solid #eeeeee;
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 0 16px;

  font-weight: 800;
  font-size: 13px;
  line-height: 14px;
  color: #000000;
`;

const PriceText = styled.span`
  font-weight: 900;
  font-size: 13px;
  line-height: 14px;
  color: #000000;
`;

const InFieldBoxBlack = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 57px;
  border: 1px solid #000000;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
`;

const PassName = styled.span`
  font-weight: 800;
  font-size: 13px;
  line-height: 14px;
  color: #000000;
`;

const InFieldButton = styled.button`
  background: #000000;
  border-radius: 5px;
  padding: 10px;
  border: none;
  cursor: pointer;

  font-weight: 800;
  font-size: 12px;
  line-height: 13px;
  text-align: center;
  color: #ffffff;
`;

const InFieldBoxGray = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 57px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
`;

const Pipe = styled.span`
  font-weight: 400;
  font-size: 13px;
  line-height: 14px;
  color: #cccccc;
  margin: 0 4px;
`;

const SeasonLabel = styled.span`
  font-weight: 400;
  font-size: 13px;
  line-height: 14px;
  color: #000000;
  margin-right: 4px;
`;

const SeasonValue = styled.span`
  font-weight: 800;
  font-size: 13px;
  line-height: 14px;
  color: #000000;
  margin-left: 4px;
`;

const NoticeArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const NoticeText = styled.p`
  margin: 0;

  font-weight: 400;
  font-size: 12px;
  line-height: 13px;
  color: #999999;
`;

const OrangeBold = styled.span`
  font-weight: 700;
  font-size: 12px;
  line-height: 13px;
  color: #f6ae24;
`;

const GrayText = styled.span`
  padding-left: 3px;

  font-weight: 700;
  font-size: 13px;
  line-height: 14px;
  color: #999999;
`;
