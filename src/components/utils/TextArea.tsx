import { FormEvent } from "react";
import { Input, InputProps } from "reactstrap";
import { Identity } from "../../domain/action";

export type TextAreaProps = Identity<
  Omit<InputProps, "onChange" | "onInput"> & {
    onChange?: (s: string) => void;
    onInput?: (s: string) => void;
  }
>;

export const TextArea: React.FC<TextAreaProps> = ({
  onChange,
  onInput,
  ...props
}) => {
  const changeHanlder = ({
    currentTarget,
  }: FormEvent<HTMLInputElement>): void => onChange?.(currentTarget.value);

  const inputHandler = ({ currentTarget }: FormEvent<HTMLInputElement>): void =>
    onInput?.(currentTarget.value);

  return (
    <Input
      {...props}
      type="textarea"
      onChange={changeHanlder}
      onInput={inputHandler}
    />
  );
};
