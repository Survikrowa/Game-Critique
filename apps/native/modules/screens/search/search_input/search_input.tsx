import { Search } from "@tamagui/lucide-icons";
import { Input } from "tamagui";

import { HStack } from "@/ui/layout/hstack/hstack";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <HStack className="p-h-16 w-full flex items-center justify-center gap-1">
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
        onChangeText={onChange}
        width="100%"
      />
      <Search color="white" />
    </HStack>
  );
};
