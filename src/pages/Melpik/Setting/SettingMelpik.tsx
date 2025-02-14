import React from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import Theme from '../../../styles/Theme';
import StatsSection from '../../../components/Melpik/StatsSection';
import InputField from '../../../components/InputField';
import Button02 from '../../../components/Button02';

const SettingMelpik: React.FC = () => {
  const visits = '@styleweex';
  const sales = '4개';
  const dateRange = '2025.01.06 ~ 01.10';

  const visitLabel = '인스타 계정';
  const salesLabel = '등록된 링크';

  return (
    <ThemeProvider theme={Theme}>
      <Container>
        <Header>
          <Title>멜픽 설정</Title>
          <Subtitle>내 채널을 통해 나는 브랜드가 된다</Subtitle>
        </Header>

        <StatsRow>
          <StatsSection
            visits={visits}
            sales={sales}
            dateRange={dateRange}
            visitLabel={visitLabel}
            salesLabel={salesLabel}
          />
        </StatsRow>
        <Divider />

        <Section>
          <InputField
            label='멜픽 주소 (변경불가)'
            id='melpickAddress'
            type='text'
            placeholder='주소를 입력하세요'
            buttonLabel='체크'
            buttonColor='yellow'
            required
            maxLength={12}
            prefix='melpick.com/'
          />

          <InputField
            placeholder='등록하실 링크를 추가하세요'
            buttonLabel='등록/변경'
            label='멜픽 자동생성 설정'
            id='personal-link'
            type='text'
          />
          <InputField
            placeholder='등록하실 링크를 추가하세요'
            buttonLabel='등록/변경'
            label='멜픽 자동생성 설정'
            id='personal-link'
            type='text'
          />

          <InputField
            placeholder='등록하실 링크를 추가하세요'
            buttonLabel='링크등록'
            label='개인 링크 설정 (선택)'
            id='personal-link'
            type='text'
          />
        </Section>

        <Section>
          <Label>정산 계좌정보 (필수)</Label>
          <AccountInfo>4532**-**-***544 (국민)</AccountInfo>
          <Button02>등록/변경</Button02>
        </Section>

        <Section>
          <InputField
            placeholder='등록하실 링크를 추가하세요'
            buttonLabel='링크등록'
            label='개인 링크 설정 (선택)'
            id='personal-link'
            type='text'
          />
          <LinkList>
            <LinkItem>
              <LinkText>밍또의 세상 | youtu.be/Kw482drmWqw</LinkText>
              <DeleteButton>✕</DeleteButton>
            </LinkItem>
            <LinkItem>
              <LinkText>서비스 소개 링크 | youtu.be/UfLf_60xa2a</LinkText>
              <DeleteButton>✕</DeleteButton>
            </LinkItem>
            <LinkItem>
              <LinkText>2024 티타임지 인터뷰 | myteatime.kr/con...</LinkText>
              <DeleteButton>✕</DeleteButton>
            </LinkItem>
            <LinkItem>
              <LinkText>2024 네이버 인터뷰 | myteatime.kr/cont1...</LinkText>
              <DeleteButton>✕</DeleteButton>
            </LinkItem>
          </LinkList>
        </Section>
      </Container>
    </ThemeProvider>
  );
};

export default SettingMelpik;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #fff;
`;

const Header = styled.div`
  width: 100%;
  margin-bottom: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #000;
`;

const Subtitle = styled.p`
  font-size: 12px;
  color: #aaa;
`;

const StatsSectionRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #ddd;
  margin: 20px 0;
`;

const Section = styled.div`
  width: 100%;
  padding: 10px 0;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const FixedInput = styled.div`
  background: #f6f6f6;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
`;

const ToggleButton = styled.button`
  background: black;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  width: 100%;
`;

const AccountInfo = styled.div`
  font-weight: bold;
  color: #f6ae24;
  margin-bottom: 5px;
`;

const LinkList = styled.ul`
  margin-top: 10px;
  list-style: none;
  padding: 0;
`;

const LinkItem = styled.li`
  display: flex;
  justify-content: space-between;
  background: #f6f6f6;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 5px;
`;

const LinkText = styled.span`
  font-size: 14px;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: red;
  font-size: 16px;
  cursor: pointer;
`;

const StatsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
`;
