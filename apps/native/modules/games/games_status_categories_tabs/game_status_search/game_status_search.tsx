import { Input } from "ui/forms/input";

type GameStatusSearchProps = {
  onChange: (value: string) => void;
  value: string;
};

export const GameStatusSearch = ({
  onChange,
  value,
}: GameStatusSearchProps) => {
  return <Input onChange={onChange} value={value} label="Wpisz nazwe gry" />;
};
