import React from 'react';
import styled from 'styled-components';
import Theme from '../../../styles/Theme';
import SizeInfoImageSrc from '../../../assets/Home/HomeDetail/SizeInfo.svg';

const SizeInfo: React.FC = () => {
  return (
    <SizeInfoContainer>
      <label>사이즈 정보</label>
      <img src={SizeInfoImageSrc} alt='Size Information' />
      <TableRow>
        <TableHeader></TableHeader>
        <TableHeader>A</TableHeader>
        <TableHeader>B</TableHeader>
        <TableHeader>C</TableHeader>
        <TableHeader>D</TableHeader>
        <TableHeader>E</TableHeader>
      </TableRow>
      <TableRow>
        <TableCell>S (44)</TableCell>
        <TableCell>37</TableCell>
        <TableCell>85</TableCell>
        <TableCell>72</TableCell>
        <TableCell>57</TableCell>
        <TableCell>100</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>M (55)</TableCell>
        <TableCell>38</TableCell>
        <TableCell>86</TableCell>
        <TableCell>74</TableCell>
        <TableCell>59</TableCell>
        <TableCell>102</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>L (66)</TableCell>
        <TableCell>39</TableCell>
        <TableCell>87</TableCell>
        <TableCell>80</TableCell>
        <TableCell>60</TableCell>
        <TableCell>104</TableCell>
      </TableRow>
    </SizeInfoContainer>
  );
};

export default SizeInfo;

const SizeInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  label {
    font-weight: 700;
    font-size: 10px;
    line-height: 11px;
    color: ${Theme.colors.black};
  }
`;

const TableRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 8px 0;
`;

const TableHeader = styled.div`
  font-weight: 900;
  font-size: 12px;
  background-color: ${Theme.colors.gray1};
  flex: 1;
  text-align: center;
  padding: 10px 0;
`;

const TableCell = styled.div`
  font-weight: 700;
  font-size: 12px;
  border: 1px solid ${Theme.colors.gray1};
  flex: 1;
  text-align: center;
  padding: 8px 0;
`;
