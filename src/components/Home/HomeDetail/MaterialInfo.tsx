// src/components/Home/HomeDetail/MaterialInfo.tsx
import React from 'react';
import styled from 'styled-components';
import Theme from '../../../styles/Theme';

export interface MaterialData {
  [key: string]: string;
}

export interface MaterialInfoProps {
  materialData: MaterialData;
}

const MaterialInfo: React.FC<MaterialInfoProps> = ({ materialData }) => {
  // 옵션별 범위(예시)
  const materialOptions: { [key: string]: string[] } = {
    두께감: ['매우 두꺼움', '두꺼움', '적당', '얇음'],
    신축성: ['좋음', '약간있음', '없음', '허리밴딩'],
    안감: ['전체안감', '부분안감', '기모안감', '안감없음'],
    촉감: ['뻣뻣함', '까슬함', '적당', '부드러움'],
    비침: ['비침있음', '약간있음', '적당', '비침없음'],
  };

  // 각 옵션별 선택된 값이 materialData에 없거나, 옵션 배열에 포함되어 있지 않으면 기본값(첫번째 값)을 사용
  const getSelectedValue = (key: string, options: string[]) =>
    materialData[key] && options.includes(materialData[key])
      ? materialData[key]
      : options[0];

  const calculatePosition = (index: number, totalOptions: number): string => {
    return `${(index / (totalOptions - 1)) * 100}%`;
  };

  return (
    <Container>
      <Title>제품소재 정보</Title>
      <MaterialInfoContainer>
        {Object.entries(materialOptions).map(([key, options]) => {
          const selectedValue = getSelectedValue(key, options);
          return (
            <InfoRow key={key}>
              <Label>{key}</Label>
              <BarContainer>
                <Bar>
                  <Mark
                    style={{
                      left: calculatePosition(
                        options.indexOf(selectedValue),
                        options.length
                      ),
                    }}
                  />
                </Bar>
                <Options>
                  {options.map((option) => (
                    <Option key={option} isSelected={option === selectedValue}>
                      {option}
                    </Option>
                  ))}
                </Options>
              </BarContainer>
            </InfoRow>
          );
        })}
      </MaterialInfoContainer>
    </Container>
  );
};

export default MaterialInfo;

const Container = styled.div`
  margin-top: 40px;
`;

const MaterialInfoContainer = styled.div`
  border: 1px solid ${Theme.colors.gray1};
  padding: 10px 10px 0 0;
`;

const Title = styled.h3`
  font-weight: 700;
  font-size: 12px;
  line-height: 11px;
  margin-bottom: 10px;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;

  padding: 10px;
`;

const Label = styled.div`
  width: 50px;
  font-weight: 800;
  font-size: 14px;
  text-align: center;
  margin-left: 20px;
`;

const BarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 50px);
  align-items: center;
  margin-top: 3px;
`;

const Bar = styled.div`
  position: relative;
  height: 4px;
  border: 1px solid ${Theme.colors.gray1};
  border-radius: 2px;
  width: 75%;
  margin-bottom: 10px;
`;

const Mark = styled.div`
  position: absolute;
  top: -8px;
  width: 12px;
  height: 12px;
  border: 3px solid ${Theme.colors.yellow};
  border-radius: 50%;
  transition: left 0.3s ease;
  transform: translateX(-50%);
  background-color: #fff;
`;

const Options = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const Option = styled.div<{ isSelected: boolean }>`
  font-weight: 700;
  font-size: 12px;
  color: ${(props) => (props.isSelected ? '#FFA500' : '#000')};
  transition: color 0.3s ease;
  width: 100%;
  min-width: 50px;
  text-align: center;
`;
