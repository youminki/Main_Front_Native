import React from 'react';
import styled from 'styled-components';

/**
 * "구독권 상세" 페이지 예시
 * absolute 대신 flex, display 기반 레이아웃
 */
const SubscriptionPassDetail: React.FC = () => {
  return (
    <Container>
      <ContentArea>
        {/* 1) 이용 중인 이용권 */}
        <Section>
          <SectionTitle>이용 중인 이용권</SectionTitle>
          {/* 인풋 필드 스타일 박스(검정 테두리) 안에 텍스트 + 버튼 */}
          <InFieldBoxBlack>
            <PassName>
              정기 구독권 <GrayText>( 월 4회권 )</GrayText>
            </PassName>
            <InFieldButton>설정변경</InFieldButton>
          </InFieldBoxBlack>
        </Section>

        {/* 2) 이용권 사용기간 */}
        <Section>
          <SectionTitle>이용권 사용기간</SectionTitle>
          <ReadOnlyBox>
            2025.02.01 ~ 2025.02.28 <GrayText>(유효기간)</GrayText>
          </ReadOnlyBox>
        </Section>

        {/* 3) 이용권 결제일시 */}
        <Section>
          <SectionTitle>이용권 결제일시</SectionTitle>
          <ReadOnlyBox>
            2025.02.01 <GrayText>(14:40:38)</GrayText>
          </ReadOnlyBox>
        </Section>

        {/* 4) 이용권(매달) 결제금액 + 5) 다음 결제일 */}
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

        {/* 6) 이용권 코드 */}
        <Section>
          <SectionTitle>이용권 코드</SectionTitle>
          {/* Code | PASSI3Y8OTXFXTSG -> 각각 다른 폰트 스타일 */}
          <InFieldBox>
            <CodeLabel>Code</CodeLabel>
            <Pipe> | </Pipe>
            <CodeValue>PASSI3Y8OTXFXTSG</CodeValue>
          </InFieldBox>
        </Section>

        {/* 7) 시즌 자동연장 */}
        <Section>
          <SectionTitle>시즌 자동연장</SectionTitle>
          {/* 인풋 필드 스타일 박스(회색 테두리) 안에 텍스트 + 버튼 */}
          <InFieldBoxGray>
            <Row>
              <SeasonLabel>다음 시즌</SeasonLabel>
              <Pipe> | </Pipe>
              <SeasonValue>2025 SUMMER</SeasonValue>
            </Row>
            <InFieldButton>취소신청</InFieldButton>
          </InFieldBoxGray>
        </Section>

        {/* 8) 구분선 */}
        <Divider />

        {/* 9) 안내 메시지 */}
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

/* ---------------------------
   styled-components
---------------------------- */

const Container = styled.div`
  position: relative;
  background: #ffffff;
  margin: 0 auto;

  display: flex;
  justify-content: center;
`;

const ContentArea = styled.div`
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

/* 구분선 */
const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #dddddd;
  margin: 30px 0;
`;

/* "이용 중인 이용권", "이용권 사용기간" 등 각 섹션 타이틀 */
const SectionTitle = styled.div`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 700;
  font-size: 10px;
  line-height: 11px;
  color: #000000;
  margin-bottom: 10px;
`;

/* 가로로 나란히 배치할 때 쓰는 Row */
const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

/* 반반 영역 */
const HalfSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

/* 텍스트만 들어가는 읽기전용 박스 */
const ReadOnlyBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 57px;
  border: 1px solid #eeeeee;
  border-radius: 4px;

  display: flex;
  align-items: center;
  padding: 0 16px;

  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 800;
  font-size: 13px;
  line-height: 14px;
  color: #000000;
`;

/* 가격에만 적용할 굵기/크기 예시 */
const PriceText = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 900;
  font-size: 13px;
  line-height: 14px;
  color: #000000;
`;

/* ---------------------------------------
   "정기 구독권 ( 월 4회권 )" + "설정변경"
   검정 테두리
----------------------------------------*/
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
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
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

  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 800;
  font-size: 12px;
  line-height: 13px;
  text-align: center;

  color: #ffffff;
`;

const InFieldBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 57px;
  border: 1px solid #dddddd;
  border-radius: 4px;

  display: flex;
  align-items: center;

  padding: 0 16px;
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

const CodeLabel = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 14px;
  color: #999999;
  margin-right: 4px;
`;

const Pipe = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 14px;
  color: #cccccc;

  margin: 0 4px;
`;

const CodeValue = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 800;
  font-size: 13px;
  line-height: 14px;
  color: #999999;
  margin-left: 4px;
`;

const SeasonLabel = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 14px;
  color: #000000;
  margin-right: 4px;
`;

const SeasonValue = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
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
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 13px;
  color: #999999;
`;

const OrangeBold = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 13px;
  color: #f6ae24;
`;

const GrayText = styled.span`
  padding-left: 3px;
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 14px;

  color: #999999;
`;
