import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const SalesSettlementDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // 더미 데이터 (SalesSettlement에서 가져온 데이터 참고)
  const settlements = [
    {
      id: 1,
      date: '2025-01 (2차)',
      time: '2025년 1월 24일 (금) - 18:30:40',
      amount: '86,400원',
      deduction: '-3,600원',
      salesList: [
        {
          product: 'JNS2219 (55) - SANDRO',
          buyer: 'styleweex01',
          price: '386,000',
          settlement: '10,000원',
        },
        {
          product: 'JNS2219 (55) - SANDRO',
          buyer: 'styleweex01',
          price: '386,000',
          settlement: '10,000원',
        },
        {
          product: 'JNS2219 (55) - SANDRO',
          buyer: 'styleweex01',
          price: '386,000',
          settlement: '10,000원',
        },
        {
          product: 'JNS2219 (55) - SANDRO',
          buyer: 'styleweex01',
          price: '386,000',
          settlement: '10,000원',
        },
      ],
    },
  ];

  const settlement = settlements.find((s) => s.id.toString() === id);

  if (!settlement) {
    return <Container>정산 내역을 찾을 수 없습니다.</Container>;
  }

  return (
    <Container>
      <Section>
        <Label>정산회차</Label>
        <Input readOnly value={settlement.date} />
      </Section>

      <Section>
        <Label>정산일시</Label>
        <Input readOnly value={settlement.time} />
      </Section>

      <Section>
        <Label>정산금액</Label>
        <Input readOnly value={settlement.amount} />
      </Section>

      <Section>
        <Label>공제세액 (4%)</Label>
        <Input readOnly value={settlement.deduction} />
      </Section>

      <Note>
        ※ 정산금액은 세액 공제 및 신고비용을 제외한 나머지 금액입니다.
      </Note>

      <Table>
        <thead>
          <tr>
            <Th>판매제품 / 구매자 정보</Th>
            <Th>결제금액 / 정산금액</Th>
          </tr>
        </thead>
        <tbody>
          {settlement.salesList.map((sale, index) => (
            <tr key={index}>
              <Td>
                {sale.product}
                <SubInfo>{`${settlement.date} - 구매자: ${sale.buyer}`}</SubInfo>
              </Td>
              <Td>
                {sale.price}원<SubInfo>{sale.settlement}</SubInfo>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default SalesSettlementDetail;

// 스타일 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #fff;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  background: #f9f9f9;
`;

const Note = styled.p`
  font-size: 12px;
  color: #888;
  margin-top: 5px;
`;

const Table = styled.table`
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  font-size: 14px;
  font-weight: bold;
  padding: 10px;
  border-bottom: 2px solid #ddd;
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
`;

const SubInfo = styled.p`
  font-size: 12px;
  color: #777;
  margin-top: 4px;
`;
