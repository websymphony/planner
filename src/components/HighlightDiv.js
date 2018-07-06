import styled, { keyframes } from "styled-components";

const highlight = keyframes`
  0% {
    background-color: rgb(255, 255, 255);
  }
  10% {
    background-color: rgb(255, 255, 255);
  }
  20% {
    background-color: rgb(255, 250, 205);
  }
  30% {
    background-color: rgb(255, 255, 255);
  }
  40% {
    background-color: rgb(255, 255, 255);
  }
  50% {
    background-color: rgb(255, 250, 205);
  }
  100% {
    background-color: rgb(255, 255, 255);
  }
`;

const HighlightDiv = styled.div`
  animation: 2s ${highlight} ease-out;
`;

export default HighlightDiv;
