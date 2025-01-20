import styled from 'styled-components';
import Content from '../components/Analysis/AnalysisContent.tsx';
import Theme from '../styles/Theme.js';

const Analysis = () => {
  return (
    <AnalysisContainer>
      <ContentWrapper>
        <Content />
      </ContentWrapper>
    </AnalysisContainer>
  );
};

export default Analysis;

const AnalysisContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
  margin: 0 auto;
  border: 1px solid ${Theme.colors.gray1};
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
`;
