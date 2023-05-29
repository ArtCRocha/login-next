import { ReactNode } from "react";
import { SubtitleStyle } from "./styles";

interface SubtitleProps {
  children: ReactNode;
  margin?: string;
}

export default function Subtitle({ children, margin }: SubtitleProps) {
  return <SubtitleStyle margin={margin}>{children}</SubtitleStyle>;
}
