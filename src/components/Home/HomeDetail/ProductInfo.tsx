import React, { useState } from 'react';
import styled from 'styled-components';
import Theme from '../../../styles/Theme';
import AddTekImage from '../../../assets/ClosetIcon.svg';
import { addToCloset } from '../../../api/closet/closetApi';
import ReusableModal from '../../ReusableModal'; // ReusableModal import

export interface ProductInfoProps {
  item: {
    brand: string;
    product_num: string;
    name: string;
    originalPrice: number;
    discountPercent: number;
    discountPrice: number;
  };
  productId: number;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ item, productId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  const handleAddTekClick = async () => {
    try {
      await addToCloset(productId);
      setModalMessage('찜 목록에 추가되었습니다!');
      setModalTitle('성공');
      setIsModalOpen(true);
    } catch (err: any) {
      const status = err?.response?.status;
      if (status === 409) {
        setModalMessage('이미 찜한 상품입니다.');
        setModalTitle('오류');
        setIsModalOpen(true);
      } else if (status === 401) {
        setModalMessage('로그인이 필요합니다.');
        setModalTitle('오류');
        setIsModalOpen(true);
      } else {
        setModalMessage('찜 추가 중 오류가 발생했습니다.');
        setModalTitle('오류');
        setIsModalOpen(true);
        console.error(err);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <InfoContainer>
      <CategoryText>
        브랜드 <span className='gt'>&gt;</span> {item.brand}
      </CategoryText>

      <ProductTitle>
        {item.product_num} / {item.name}
      </ProductTitle>

      <ContentContainer>
        <PriceContainer>
          <OriginalPrice>{item.originalPrice.toLocaleString()}</OriginalPrice>
          <DiscountRow>
            <DiscountPercent>{item.discountPercent}%</DiscountPercent>
            <DiscountPrice>{item.discountPrice.toLocaleString()}</DiscountPrice>
          </DiscountRow>
        </PriceContainer>

        <TekImageContainer onClick={handleAddTekClick}>
          <TekImage src={AddTekImage} alt='찜 추가' />
        </TekImageContainer>
      </ContentContainer>

      <ReusableModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalTitle}
        children={modalMessage}
      />
    </InfoContainer>
  );
};

export default ProductInfo;

const InfoContainer = styled.div`
  width: 100%;
  margin-bottom: 30px;
`;

const CategoryText = styled.p`
  font-weight: 400;
  font-size: 11px;
  line-height: 11px;
  color: #000;

  & > span.gt {
    color: #dddddd;
    padding: 0 4px;
  }
`;

const ProductTitle = styled.h2`
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  color: #000;
  margin: 8px 0;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0 16px 0;
`;

const OriginalPrice = styled.span`
  font-weight: 700;
  font-size: 13px;
  text-decoration: line-through;
  color: #999;
`;

const DiscountRow = styled.div`
  display: flex;
  align-items: baseline;
  margin-top: 10px;
`;

const DiscountPercent = styled.span`
  color: ${Theme.colors.yellow};
  margin-right: 10px;
  font-weight: 900;
  font-size: 16px;
`;

const DiscountPrice = styled.span`
  font-weight: 900;
  font-size: 16px;
  line-height: 20px;
`;

const TekImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const TekImage = styled.img`
  width: 80px;
  height: 80px;
`;
