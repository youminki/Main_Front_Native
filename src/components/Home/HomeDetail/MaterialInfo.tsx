import React from "react";
import styled from "styled-components";
import Theme from "../../../styles/Theme";

interface MaterialData {
  [key: string]: string;
}

interface MaterialInfoProps {
  materialData?: MaterialData;
}

const sampleMaterialData: MaterialData = {
  두께감: "매우 두꺼움",
  신축성: "없음",
  안감: "부분안감",
  촉감: "적당",
  비침: "없음",
};

const MaterialInfo: React.FC<MaterialInfoProps> = ({
  materialData = sampleMaterialData,
}) => {
  const calculatePosition = (index: number, totalOptions: number): string => {
    return `${(index / (totalOptions - 1)) * 100}%`;
  };

  const materialOptions: { [key: string]: string[] } = {
    두께감: ["매우 두꺼움", "두꺼움", "적당", "얇음"],
    신축성: ["좋음", "약간있음", "없음", "허리밴딩"],
    안감: ["전체안감", "부분안감", "기모안감", "없음"],
    촉감: ["뻣뻣함", "까슬함", "적당", "부드러움"],
    비침: ["비침있음", "약간있음", "부분있음", "없음"],
  };

  return (
    <Container>
      <Title>제품소재 정보</Title>
      <MaterialInfoContainer>
        {Object.entries(materialOptions).map(([key, options]) => (
          <InfoRow key={key}>
            <Label>{key}</Label>
            <BarContainer>
              <Bar>
                <Mark
                  style={{
                    left: calculatePosition(
                      options.indexOf(materialData[key]),
                      options.length
                    ),
                  }}
                />
              </Bar>
              <Options>
                {options.map((option) => (
                  <Option
                    key={option}
                    isSelected={materialData[key] === option}
                  >
                    {option}
                  </Option>
                ))}
              </Options>
            </BarContainer>
          </InfoRow>
        ))}
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
  font-style: normal;
  font-weight: 700;
  font-size: 10px;
  line-height: 11px;
  margin-bottom: 10px;
`;

const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
`;

const Label = styled.div`
  font-weight: 800;
  font-size: 12px;
  text-align: center;
  width: 100%;
  max-width: 100px;
`;

const BarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 100px);
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
  background-color: #ffffff;
`;

const Options = styled.div`
  display: flex;
  text-align: center;
  width: 100%;
`;

const Option = styled.div<{ isSelected: boolean }>`
  font-style: normal;
  font-weight: 700;
  font-size: 10px;
  line-height: 11px;
  color: ${(props) => (props.isSelected ? "#FFA500" : "#000000")};
  font-weight: ${(props) => (props.isSelected ? "bold" : "normal")};
  transition: color 0.3s ease;
  width: 100%;
  min-width: 50px;

  &:hover {
    color: #000;
  }
`;
