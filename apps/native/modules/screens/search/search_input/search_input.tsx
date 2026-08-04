import { Search } from "lucide-react-native";
import { TextInput } from "react-native";

import { HStack } from "@/ui/layout/hstack/hstack";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <HStack className="w-full items-center gap-2 border border-primary-500 rounded-xl px-3 py-2">
      <Search size={18} color="#64748B" />
      <TextInput
        placeholder="Wyszukaj"
        placeholderTextColor="#64748B"
        value={value}
        onChangeText={onChange}
        className="flex-1 text-typography-100 text-base"
      />
    </HStack>
  );
};
