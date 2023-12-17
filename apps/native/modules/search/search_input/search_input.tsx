import { Search } from "@tamagui/lucide-icons";
import { Input, XStack } from "tamagui";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <XStack
      paddingHorizontal={8}
      width="100"
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap={4}
    >
      <Input
        placeholder="Wyszukaj"
        value={value}
        borderRadius={8}
        borderColor="$purple8"
        borderWidth={1}
        borderTopWidth={0}
        borderLeftWidth={0}
        borderRightWidth={0}
        overflow="hidden"
        onChangeText={(value) => onChange(value)}
        width="100%"
      />
      <Search />
    </XStack>
  );
};
