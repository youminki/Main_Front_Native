import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// 상세 데이터 타입 정의
type PolicyDetail = {
  id: string;
  category: string;
  title: string;
  date: string;
  content: string;
};

// 상세 페이지용 정책 데이터 (실제 환경에서는 API 호출 등을 이용)
const policyDetails: PolicyDetail[] = [
  {
    id: '1',
    category: '개인정보방침',
    title: '개인정보의 항목 및 수집방법',
    date: '2025.02.01',
    content: '개인정보의 항목 및 수집방법에 대한 상세 내용입니다.',
  },
  {
    id: '2',
    category: '개인정보방침',
    title: '개인정보의 이용목적',
    date: '2025.02.01',
    content: '개인정보의 이용목적에 대한 상세 내용입니다.',
  },
  {
    id: '3',
    category: '개인정보방침',
    title: '개인정보의 보유 및 이용기간',
    date: '2025.02.01',
    content: '개인정보의 보유 및 이용기간에 대한 상세 내용입니다.',
  },
  {
    id: '4',
    category: '개인정보처리방침',
    title: '동의의 거부권 및 거부시 고지사항',
    date: '2025.02.01',
    content: '동의의 거부권 및 거부시 고지사항에 대한 상세 내용입니다.',
  },
  {
    id: '5',
    category: '파기절차',
    title: '개인정보의 파기절차 및 방법',
    date: '2025.02.01',
    content: '개인정보의 파기절차 및 방법에 대한 상세 내용입니다.',
  },
  {
    id: '6',
    category: '기타',
    title: '고지 의무에 따른 안내사항',
    date: '2025.02.01',
    content: '고지 의무에 따른 안내사항에 대한 상세 내용입니다.',
  },
];

const PersonalInformationProcessingPolicyDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // URL 파라미터 id로 해당 정책 데이터 찾기
  const policy = policyDetails.find((item) => item.id === id);

  if (!policy) {
    return <DetailContainer>해당 정책을 찾을 수 없습니다.</DetailContainer>;
  }

  return (
    <DetailContainer>
      <BackButton onClick={() => navigate(-1)}>뒤로가기</BackButton>
      <DetailHeader>
        <DetailCategory>{policy.category}</DetailCategory>
        <DetailTitle>{policy.title}</DetailTitle>
        <DetailDate>{policy.date}</DetailDate>
      </DetailHeader>
      <DetailContent>{policy.content}</DetailContent>
    </DetailContainer>
  );
};

export default PersonalInformationProcessingPolicyDetail;

const DetailContainer = styled.div`
  padding: 20px;
  font-family: 'NanumSquare Neo OTF', sans-serif;
`;

const BackButton = styled.button`
  margin-bottom: 20px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
`;

const DetailHeader = styled.div`
  margin-bottom: 20px;
`;

const DetailCategory = styled.div`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 5px;
`;

const DetailTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 5px;
`;

const DetailDate = styled.div`
  font-size: 12px;
  color: #aaaaaa;
`;

const DetailContent = styled.div`
  font-size: 14px;
  line-height: 1.6;
`;
