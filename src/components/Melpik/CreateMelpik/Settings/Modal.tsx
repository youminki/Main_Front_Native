import React, { useState } from 'react';
import styled from 'styled-components';
import Theme from '../../../../styles/Theme';
import ReusableModal2 from '../../../../components/ReusableModal2.tsx';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (brands: string[]) => void;
  selectedBrands: string[];
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  selectedBrands: initialSelectedBrands,
}) => {
  const brands = [
    'CC Collect',
    'CLUB Monaco',
    'DECO',
    'DEW L',
    'EGOIST',
    'it MICHAA',
    'JIGOTT',
    'JJ JIGOTT',
    'KENNETH LADY',
    'LÄTT BY T',
    'LINE',
  ];

  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    initialSelectedBrands
  );
  const [warningModalVisible, setWarningModalVisible] = useState(false);
  const [cancelConfirmationVisible, setCancelConfirmationVisible] =
    useState(false);

  const handleBrandSelect = (brand: string) => {
    const isSelected = selectedBrands.includes(brand);
    if (isSelected) {
      setSelectedBrands((prev) => prev.filter((b) => b !== brand));
    } else if (selectedBrands.length < 3) {
      setSelectedBrands((prev) => [...prev, brand]);
    }
  };

  const handleCompleteSelection = () => {
    if (selectedBrands.length < 3) {
      setWarningModalVisible(true);
    } else {
      onSelect(selectedBrands);
      onClose();
    }
  };

  const handleCancelClick = () => {
    setCancelConfirmationVisible(true);
  };

  return (
    <>
      {isOpen && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>
                브랜드 선택 <GrayText>(3가지 선택)</GrayText>
              </ModalTitle>
              <GrayLine />
            </ModalHeader>

            <ModalBody>
              <BrandSelectionGrid>
                {brands.map((brand) => (
                  <BrandOption
                    key={brand}
                    selected={selectedBrands.includes(brand)}
                    onClick={() => handleBrandSelect(brand)}
                  >
                    {brand}
                  </BrandOption>
                ))}
              </BrandSelectionGrid>
            </ModalBody>

            <GrayLine />
            <ButtonRow>
              <CancelButton onClick={handleCancelClick}>취소</CancelButton>
              <CompleteButton onClick={handleCompleteSelection}>
                선택완료
              </CompleteButton>
            </ButtonRow>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* 3가지 브랜드 선택 경고 모달 */}
      <ReusableModal2
        isOpen={warningModalVisible}
        onClose={() => setWarningModalVisible(false)}
        title='경고'
      >
        <p>3가지 브랜드를 선택해야 합니다.</p>
      </ReusableModal2>

      {/* 취소 확인 모달 */}
      <ReusableModal2
        isOpen={cancelConfirmationVisible}
        onClose={() => setCancelConfirmationVisible(false)}
        onConfirm={onClose}
        title='선택 취소'
      >
        <p>설정하신 내용을 취소 하시겠습니까?</p>
      </ReusableModal2>
    </>
  );
};

export default Modal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 27px;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: ${Theme.colors.white};
  padding: 20px;
  max-width: 500px;
  width: 100%;
  height: 670px;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

const ModalTitle = styled.p`
  font-weight: 800;
  font-size: 16px;
`;

const GrayText = styled.span`
  color: ${Theme.colors.gray1};
`;

const GrayLine = styled.hr`
  border: none;
  width: 100%;
  border: 1px solid ${Theme.colors.gray0};
  margin: 20px 0;
`;

const ModalBody = styled.div`
  flex-grow: 1;
`;

const BrandSelectionGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const BrandOption = styled.div<{ selected: boolean }>`
  padding: 10px;
  background-color: ${Theme.colors.white};
  color: ${(props) =>
    props.selected ? Theme.colors.yellow : Theme.colors.black};
  border: ${(props) =>
    props.selected
      ? `3px solid ${Theme.colors.yellow}`
      : `1px solid ${Theme.colors.gray1}`};
  text-align: center;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 800;
  font-size: 12px;
  line-height: 13px;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: auto;
`;

const CancelButton = styled.button`
  width: 100%;
  height: 56px;
  background-color: ${Theme.colors.gray1};
  color: ${Theme.colors.white};
  border: none;
  border-radius: 6px;
  cursor: pointer;

  font-weight: 800;
  font-size: 16px;
`;

const CompleteButton = styled(CancelButton)`
  background-color: ${Theme.colors.black};
`;
