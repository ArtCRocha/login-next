import styled from "styled-components";

interface MessageProps {
  color: string;
}

export const MessageStyle = styled.div<MessageProps>`
  background-color: ${(props) => {
    if (props.color === "red") return "#f7efe8";
    else return "#d5f2ca";
  }};

  padding: 10px 15px;
  border-radius: 5px;

  p {
    color: ${(props) => {
      if (props.color === "red") return "#f33b23";
      else return "#008c00";
    }};
    margin: 0;
  }
`;
