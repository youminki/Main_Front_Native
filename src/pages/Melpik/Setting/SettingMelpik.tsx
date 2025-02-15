import React, { useState } from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import Theme from '../../../styles/Theme';
import StatsSection from '../../../components/Melpik/StatsSection';
import InputField from '../../../components/InputField';
import DeleteIcon from '../../../assets/Melpik/DeleteIcon.svg';

const SettingMelpik: React.FC = () => {
  const visits = '@styleweex';
  const sales = '4개';
  const dateRange = '2025.01.06 ~ 01.10';

  const visitLabel = '인스타 계정';
  const salesLabel = '등록된 링크';

  const [links, setLinks] = useState([
    {
      id: 1,
      label: '링크 1',
      url: 'youtu.be/Kw482drmWqw',
      title: '밍또의 세상',
    },
    {
      id: 2,
      label: '링크 2',
      url: 'youtu.be/UfLf_60xa2a',
      title: '서비스 소개 링크',
    },
    {
      id: 3,
      label: '링크 3',
      url: 'myteatime.kr/con...',
      title: '2024 티타임지 인터뷰',
    },
    {
      id: 4,
      label: '링크 4',
      url: 'myteatime.kr/cont1...',
      title: '2024 네이버 인터뷰',
    },
  ]);

  const handleDelete = (linkId) => {
    setLinks(links.filter((link) => link.id !== linkId));
  };

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
            required
            maxLength={12}
            prefix='melpick.com/'
          />

          <InputField
            placeholder='등록하실 링크를 추가하세요'
            buttonLabel='켜짐/꺼짐'
            label='멜픽 자동생성 설정'
            id='personal-link'
            type='text'
          />

          <InputField
            placeholder='등록하실 링크를 추가하세요'
            buttonLabel='등록/변경'
            buttonColor='yellow'
            label='정산 계좌정보 (필수)'
            id='personal-link'
            type='text'
          />

          <InputField
            placeholder='등록하실 링크를 추가하세요'
            buttonLabel='링크등록'
            buttonColor='black'
            label='개인 링크 설정 (선택)'
            id='personal-link'
            type='text'
          />
        </Section>

        <Section>
          <LinkList>
            {links.map((link) => (
              <LinkItem key={link.id}>
                <Label>{link.label}</Label>
                <LinkContent>
                  <LinkTitle>{link.title}</LinkTitle>
                  <Separator>|</Separator>
                  <LinkUrl>{link.url}</LinkUrl>
                  <DeleteButton onClick={() => handleDelete(link.id)}>
                    <img
                      src={DeleteIcon}
                      alt='Delete'
                      style={{ marginLeft: 'auto' }}
                    />
                  </DeleteButton>
                </LinkContent>
              </LinkItem>
            ))}
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

const LinkList = styled.ul`
  margin-top: 10px;
  list-style: none;
  padding: 0;
`;

const LinkItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 10px;
`;

const Label = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 900;
  font-size: 12px;
  line-height: 16px;
  color: #000000;
`;

const LinkContent = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${Theme.colors.gray1};
  padding: 10px;
  margin-left: 14px;
  flex-grow: 1;
`;

const LinkTitle = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #000000;
`;

const Separator = styled.span`
  color: #aaa;
  margin: 0 5px;
`;

const LinkUrl = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #000000;
`;

const StatsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: auto;
`;
