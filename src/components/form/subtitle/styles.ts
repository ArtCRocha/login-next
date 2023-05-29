import styled from "styled-components";

interface SubtitlePropsStyle {
  margin?: string;
}

export const SubtitleStyle = styled.h3<SubtitlePropsStyle>`
  color: #2a2a2a;
  margin: ${(props) => props.margin || "0"};
  font-weight: 400;
  font-size: 15px;

  a {
    color: red;
  }
`;
