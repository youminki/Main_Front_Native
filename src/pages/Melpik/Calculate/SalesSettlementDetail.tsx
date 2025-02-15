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
          settlement: '10,000',
        },
        {
          product: 'JNS2219 (55) - SANDRO',
          buyer: 'styleweex01',
          price: '386,000',
          settlement: '10,000',
        },
        {
          product: 'JNS2219 (55) - SANDRO',
          buyer: 'styleweex01',
          price: '386,000',
          settlement: '10,000',
        },
        {
          product: 'JNS2219 (55) - SANDRO',
          buyer: 'styleweex01',
          price: '386,000',
          settlement: '10,000',
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
        <InputField>
          <Label>정산회차</Label>
          <Input readOnly value={settlement.date} />

          <InputField>
            <Label>정산일시</Label>
            <Input readOnly value={settlement.time} />
          </InputField>

          <InputField>
            <Label>정산금액</Label>
            <Input readOnly value={settlement.amount} />
          </InputField>
        </InputField>

        <SectionRow>
          <InputField>
            <Label>정산금액</Label>
            <Input readOnly value={settlement.amount} />
          </InputField>

          <InputField>
            <Label>공제세액 (4%)</Label>
            <Input readOnly value={settlement.deduction} />
          </InputField>
        </SectionRow>
      </Section>

      <Note>
        ※ 정산금액은 세액 공제 및 신고비용을 제외한 나머지 금액입니다.
      </Note>

      <Divider />
      <Table>
        <thead>
          <tr>
            <ThRight>판매제품 / 구매자 정보</ThRight>
            <ThLeft>결제금액 / 정산금액</ThLeft>
          </tr>
        </thead>
        <tbody>
          {settlement.salesList.map((sale, index) => (
            <tr key={index}>
              <TdLeft>
                <ProductName isBold={sale.product.includes('JNS2219')}>
                  {sale.product}
                </ProductName>
                <SubInfo>{`${settlement.date} - 구매자: ${sale.buyer}`}</SubInfo>
              </TdLeft>
              <TdRight>
                {sale.price}
                <SubInfo isBold>{sale.settlement}</SubInfo>
              </TdRight>
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

const SectionRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputField = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  margin-top: 30px;
`;

const Label = styled.label`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 700;
  font-size: 10px;
  color: #000;
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 21px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-weight: 800;
  font-size: 13px;
  color: #000;
  background: #f9f9f9;
`;

const Note = styled.p`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 13px;

  color: #999999;

  margin-top: 20px;
`;

const Table = styled.table`
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
`;

const ThRight = styled.th`
  text-align: left;
  font-weight: 800;
  font-size: 10px;
  padding: 15px 20px;

  color: #000;
  background-color: #dddddd;
`;
const ThLeft = styled.th`
  text-align: right;
  font-weight: 800;
  font-size: 10px;
  padding: 15px 20px;

  color: #000;
  background-color: #dddddd;
`;

const TdLeft = styled.td`
  padding: 20px;
  border: 1px solid #dddddd;
  text-align: left;
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 800;
  font-size: 12px;
  line-height: 13px;

  color: #000000;
`;

const TdRight = styled.td`
  padding: 20px;
  border: 1px solid #dddddd;
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 13px;
  text-align: right;

  color: #000000;
`;

const ProductName = styled.span<{ isBold?: boolean }>`
  font-weight: ${({ isBold }) => (isBold ? 800 : 400)};
`;

const SubInfo = styled.p<{ isBold?: boolean }>`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 13px;

  color: #000000;

  margin-top: 4px;
  font-weight: ${({ isBold }) => (isBold ? 800 : 400)};
  font-size: 12px;
  line-height: 13px;
  color: #000;
  margin-top: 4px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #dddddd;
  margin: 30px 0;
`;
