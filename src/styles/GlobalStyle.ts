import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';
import './GlobalFont.css';

export const GlobalStyle = createGlobalStyle`
  ${reset};

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'NanumSquare Neo OTF', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f5f5f5;
    color: #333;
  }

  html {
    font-size: 16px;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
  }

  input, textarea {
    font-family: inherit;
    border: none;
    outline: none;
  }

  ul, ol {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  /* 스크롤바 스타일링 */
  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }

  /* 모바일 터치 하이라이트 제거 */
  -webkit-tap-highlight-color: transparent;

  /* 텍스트 선택 스타일 */
  ::selection {
    background-color: #f6ae24;
    color: white;
  }

  /* 포커스 스타일 */
  :focus {
    outline: 2px solid #f6ae24;
    outline-offset: 2px;
  }

  /* 접근성 개선 */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  html, body, div, span, h1, h2, h3, h4, h5, h6, p,
  a, dl, dt, dd, ol, ul, li, form, label, table {
    ${({ theme }) => theme.fonts.default};
    /* 변경: 'NanumSquare Neo OTF' -> 'NanumSquare Neo' */
    font-family: 'NanumSquare Neo', 'Apple SD Gothic Neo', 'Malgun Gothic', 'Segoe UI', 'Roboto', 'Arial', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-smooth: always;
    &:visited {
      text-decoration: none;
      color: black;
    }
  }

  body {
    line-height: 1;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    body {
      font-size: 12px;
    }
    h1 {
      font-size: 24px;
    }
    h2 {
      font-size: 20px;
    }
    h3 {
      font-size: 18px;
    }
    p, label {
      font-size: 14px;
    }
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    body {
      font-size: 14px;
    }
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    body {
      font-size: 18px;
    }
  }
`;
