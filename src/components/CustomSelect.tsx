// 예: StyledSelect.ts (새 파일) 또는 Signup.tsx 내부에 선언
import styled from 'styled-components';

export const CustomSelect = styled.select`
  /* 기본 select UI 제거 */
  appearance: none;
  -webkit-appearance: none; /* 사파리 호환 */

  /* 커스텀 화살표 이미지 */
  background: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D'10'%20height%3D'6'%20viewBox%3D'0%200%2010%206'%20xmlns%3D'http%3A//www.w3.org/2000/svg'%3E%3Cpath%20d%3D'M5%206%200%200%2010%200z'%20fill%3D'%23aaa'%20/%3E%3C/svg%3E")
    no-repeat right 10px center/10px; /* 화살표 이미지를 select 오른쪽에 배치 */

  /* 배경색, 필요시 조정 */
  background-color: #fff;

  /* 드롭다운 화살표가 select 오른쪽에 보이도록 여유를 둠 */
  padding-right: 35px;
`;
