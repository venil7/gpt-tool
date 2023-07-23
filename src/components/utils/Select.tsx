import { eq as eqmod } from "fp-ts";
import { Eq } from "fp-ts/lib/Eq";
import { Input } from "reactstrap";
import { Nullable } from "vite-node";

export type SelectProps<T> = {
  eq?: Eq<T>;
  options: T[];
  disabled?: boolean;
  selected?: Nullable<T>;
  toValue?: (t: T) => string;
  toLabel?: (t: T) => string;
  onSelect?: (option: T) => void;
};

export function Select<T>({
  options,
  onSelect,
  disabled = false,
  toValue = (t) => String(t),
  toLabel = (t) => String(t),
  eq = eqmod.fromEquals<T>((a, b) => a === b),
  selected,
}: SelectProps<T>): ReturnType<React.FC<SelectProps<T>>> {
  return (
    <Input type="select" disabled={disabled}>
      {options.map((opt) => (
        <option
          key={JSON.stringify(opt)}
          value={toValue(opt)}
          selected={eq.equals(selected!, opt)}
          onClick={() => onSelect?.(opt)}
        >
          {toLabel(opt)}
        </option>
      ))}
    </Input>
  );
}
