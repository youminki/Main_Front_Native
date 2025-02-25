import React, { useState } from 'react';
import styled from 'styled-components';

import InputField from '../../../components/InputField';
import ReusableModal from '../../../components/ReusableModal';

const AddCard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAgree, setIsAgree] = useState(false);

  return (
    <Container>
      <AgreementSection>
        <CheckboxLabel>
          <Checkbox
            type='checkbox'
            checked={isAgree}
            onChange={() => setIsAgree(!isAgree)}
          />
          <LabelText>
            카드등록에 따른 동의 <RequiredText>(필수)</RequiredText>
          </LabelText>
        </CheckboxLabel>
        <InfoRow>
          <InfoText>이용 전 필수사항 및 주의사항 안내.</InfoText>
          <ViewAllButton onClick={() => setIsModalOpen(true)}>
            전체보기
          </ViewAllButton>
        </InfoRow>
      </AgreementSection>

      <InputField
        label='카드사 선택 *'
        id='cardIssuer'
        options={['신한카드', '국민카드', '우리카드', '하나카드']}
        onSelectChange={(val: string) => console.log('카드사 선택:', val)}
      />

      <InputField
        label='카드번호 (12자리) *'
        id='cardNumber'
        placeholder='카드번호를 입력해주세요.'
        maxLength={12}
      />

      <TwoColumns>
        <ColumnItem>
          <InputField
            label='유효기간 *'
            id='cardExpiration'
            placeholder='MM / YY'
            maxLength={5}
          />
        </ColumnItem>
        <ColumnItem>
          <InputField
            label='비밀번호 (앞 2자리) *'
            id='cardPassword'
            placeholder='00'
            maxLength={2}
            type='password'
          />
        </ColumnItem>
      </TwoColumns>

      <InputField
        label='생년월일 6자리 or 사업자번호 10자리 (법인) *'
        id='birthOrBusiness'
        placeholder='800101 또는 3124512345 ( - 없이 입력해주세요 )'
      />

      <GuideMessage>
        ※ 결제를 위한 등록은 본인카드 그리고 사업자는 법인 카드가 가능합니다.
        <br />
        자세한 문의 ( 평일 09:00 ~ 18:00 ) 서비스팀에 남겨주세요.
      </GuideMessage>

      <ReusableModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title='필수사항 및 주의사항 안내'
      >
        <>이곳에 필수사항과 주의사항에 대한 상세 내용을 임시로 입력해 주세요.</>
      </ReusableModal>
    </Container>
  );
};

export default AddCard;

const Container = styled.div`
  width: 100%;

  margin: 0 auto;
  box-sizing: border-box;
  background-color: #ffffff;
`;

const AgreementSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-bottom: 20px;
  background-color: #f4f4f4;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
`;

const LabelText = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 700;
  font-size: 12px;
  color: #000000;
`;

const RequiredText = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 13px;
  color: #999999;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  appearance: none;
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 3px;
  cursor: pointer;
  position: relative;
  margin-right: 10px;
  margin-bottom: 5px;

  &:checked {
    background-color: #ffffff;
    border-color: #aaa;
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

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 10px;
`;

const InfoText = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 13px;
  color: #aaaaaa;
`;

const ViewAllButton = styled.button`
  width: 69px;
  height: 34px;
  background: #000000;
  border-radius: 5px;
  border: none;
  color: #ffffff;
  font-family: 'NanumSquare Neo OTF';
  font-weight: 800;
  font-size: 12px;
  cursor: pointer;
`;

const TwoColumns = styled.div`
  display: flex;
  gap: 10px;
`;

const ColumnItem = styled.div`
  flex: 1;
`;

const GuideMessage = styled.div`
  margin-top: 20px;
  font-family: 'NanumSquare Neo OTF';
  font-size: 12px;
  color: #999999;
  line-height: 1.4;
  padding: 0 0 30px 0;
  border-bottom: 1px solid #ccc;
`;
