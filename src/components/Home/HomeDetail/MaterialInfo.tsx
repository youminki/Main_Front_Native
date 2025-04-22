import React from 'react';
import styled from 'styled-components';

export interface MaterialData {
  [key: string]: string;
}

export interface MaterialInfoProps {
  materialData: MaterialData;
}

// 옵션별 선택지 정의
const materialOptions: Record<string, string[]> = {
  두께감: ['매우 두꺼움', '두꺼움', '적당', '얇음'],
  신축성: ['좋음', '약간있음', '없음', '허리밴딩'],
  안감: ['전체안감', '부분안감', '기모안감', '안감없음'],
  촉감: ['뻣뻣함', '까슬함', '적당', '부드러움'],
  비침: ['비침있음', '약간있음', '적당', '비침없음'],
};

// 선택 값 가져오기
const getSelectedValue = (
  key: string,
  options: string[],
  data: MaterialData
) => {
  const value = data[key];
  return options.includes(value) ? value : options[0];
};

// 마크 위치 계산 (각 옵션의 중앙을 계산)
const calculatePosition = (index: number, total: number) =>
  `${(index / total) * 100 + 100 / total / 2}%`;

// 각 옵션에 대한 색상 정의 (예시)
const optionColors: Record<string, string[]> = {
  두께감: ['#D3D3D3', '#A9A9A9', '#808080', '#696969'],
  신축성: ['#D3D3D3', '#A9A9A9', '#808080', '#696969'],
  안감: ['#D3D3D3', '#A9A9A9', '#808080', '#696969'],
  촉감: ['#D3D3D3', '#A9A9A9', '#808080', '#696969'],
  비침: ['#D3D3D3', '#A9A9A9', '#808080', '#696969'],
};

const MaterialInfo: React.FC<MaterialInfoProps> = ({ materialData }) => (
  <Container>
    <Title>제품소재 정보</Title>
    <List>
      {Object.entries(materialOptions).map(([key, options]) => {
        const selected = getSelectedValue(key, options, materialData);
        const position = calculatePosition(
          options.indexOf(selected),
          options.length
        );

        return (
          <Item key={key}>
            <Label>{key}</Label>
            <BarWrapper>
              <Track>
                {options.map((option, index) => (
                  <ColoredBar
                    key={option}
                    style={{
                      left: `${(index / options.length) * 100}%`,
                      width: `${(1 / options.length) * 100}%`,
                      backgroundColor: optionColors[key][index], // 각 옵션별 색상
                    }}
                  />
                ))}
                <Thumb style={{ left: position }} />
              </Track>
              <OptionList>
                {options.map((option, index) => (
                  <Option
                    key={option}
                    selected={option === selected}
                    style={{
                      left: `${(index / options.length) * 100}%`, // 옵션을 각 영역의 중앙에 배치
                      width: `${(1 / options.length) * 100}%`, // 각 옵션이 동일한 넓이를 가짐
                    }}
                  >
                    {option}
                  </Option>
                ))}
              </OptionList>
            </BarWrapper>
          </Item>
        );
      })}
    </List>
  </Container>
);

export default MaterialInfo;

// Styled Components
const Container = styled.div`
  margin-top: 40px;
`;

const Title = styled.h3`
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  margin-bottom: 15px;
  text-align: center;
`;

const List = styled.div`
  border: 1px solid #ccc;

  padding: 8px 0;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 10px;
`;

const Label = styled.div`
  width: 40px;
  font-weight: 800;
  font-size: 13px;
  text-align: center;
  color: #333;
  margin-right: 20px;
`;

const BarWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Track = styled.div`
  position: relative;
  width: 100%;
  height: 4px;
  background-color: #e0e0e0;
  border-radius: 2px;
  margin-bottom: 8px;
`;

const ColoredBar = styled.div`
  position: absolute;
  height: 4px;
  border-radius: 2px;
`;

const Thumb = styled.div`
  position: absolute;
  top: -8px; /* Ensure the Thumb is always above the track */
  width: 14px;
  height: 14px;
  border: 3px solid #f6ae24;
  border-radius: 50%;
  background-color: #fff;
  transform: translateX(-50%);
  transition: left 0.3s ease;
`;

const OptionList = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 5px;
  margin-left: 70px;
  position: relative;
`;

const Option = styled.div<{ selected: boolean }>`
  position: absolute;
  text-align: center;
  font-size: 11px;
  font-weight: 700;
  color: ${(props) => (props.selected ? '#f6ae24' : '#555')};
  cursor: pointer;
  transition: color 0.3s ease;
  width: 100%;
  transform: translateX(-50%);
`;
