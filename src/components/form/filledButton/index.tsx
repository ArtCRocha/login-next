import { FilledButtonProps } from "@/app/types/filledButton";
import Spinner from "../../spinner";
import { ButtonStyle } from "./styles";

export default function FilledButton(props: FilledButtonProps) {
  return (
    <ButtonStyle {...props} type={props.type}>
      {props.loading ? <Spinner size={props.size} /> : props.children}
    </ButtonStyle>
  );
}
