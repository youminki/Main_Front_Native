// StyledSelect.ts
import styled from 'styled-components';

export const CustomSelect = styled.select`
  font-size: 16px;
  border: 1px solid #000000;
  border-radius: 4px;
  height: 57px;
  width: 100%;
  padding: 0 40px 0 16px; /* 오른쪽에 아이콘 들어갈 공간 확보 */

  font-style: normal;
  font-weight: 800;
  font-size: 13px;
  line-height: 14px;
  color: #000000;
  appearance: none;
  background: ${({ disabled }) =>
    disabled
      ? '#f0f0f0'
      : `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D'10'%20height%3D'6'%20viewBox%3D'0%200%2010%206'%20xmlns%3D'http%3A//www.w3.org/2000/svg'%3E%3Cpath%20d%3D'M0%200l5%206l5-6z'%20fill%3D'%23000'%20/%3E%3C/svg%3E")
        no-repeat right 16px center/10px 6px`};
  &:focus {
    outline: none;
    border-color: #000000;
  }
`;
