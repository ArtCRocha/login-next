import { MessageProps } from "@/app/types/message";
import { MessageStyle } from "./styles";

export default function Message({ children, color }: MessageProps) {
  return (
    <MessageStyle color={color}>
      <p>{children}</p>
    </MessageStyle>
  );
}
