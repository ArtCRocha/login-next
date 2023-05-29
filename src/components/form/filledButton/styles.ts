import styled from "styled-components";
import { StyledButtonProps } from "./types";

export const ButtonStyle = styled.button<StyledButtonProps>`
  border: none;
  border-radius: 5px;

  background-color: #3e838c;
  color: #fff;
  margin: 23px 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 20px;

  font-size: 1rem;

  :hover {
    background-color: #8ebdb6;
  }
`;
