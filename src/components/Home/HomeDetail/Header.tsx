
import styled from 'styled-components';
import Basket from '../../../assets/Home/Basket.svg';
import Mycloset from '../../../assets/Home/Mycloset.svg';
import BackButton from '../../BackButton.js';

const Header = () => {
  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <HeaderContainer>
      <BackButton onClick={handleBackClick} />
      <Icons>
        <Icon src={Basket} alt="장바구니" />
        <Icon src={Mycloset} alt="내 옷장" />
      </Icons>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 10px;
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;
