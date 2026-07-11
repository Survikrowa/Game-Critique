import { tva } from "@gluestack-ui/utils/nativewind-utils";
import { ChevronDown } from "lucide-react-native";
import { ReactNode, useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

type SelectItem = {
  name: string;
  value: string;
};

type SelectProps = {
  defaultValue?: string;
  placeholder: string;
  label: string;
  items: Readonly<SelectItem[]>;
  onChange: (value: string) => void;
  value: string;
  icon?: ReactNode;
};

const triggerStyle = tva({
  base: "flex-row items-center justify-between border-2 rounded-xl px-4 py-3",
  variants: {
    open: {
      true: "border-primary-500",
      false: "border-outline-200",
    },
  },
});

const itemStyle = tva({
  base: "px-4 py-3 rounded-xl",
  variants: {
    selected: {
      true: "bg-primary-500/20",
      false: "bg-transparent",
    },
  },
});

export const Select = ({
  placeholder,
  label,
  items,
  value,
  icon,
  onChange,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedItem = items.find((item) => item.value === value);

  return (
    <>
      <Pressable
        onPress={() => setIsOpen(true)}
        className={triggerStyle({ open: isOpen })}
      >
        <View className="flex-row items-center gap-2">
          {icon}
          <Text className="text-typography-100 text-base">
            {selectedItem?.name ?? placeholder}
          </Text>
        </View>
        <ChevronDown size={18} color="#64748B" />
      </Pressable>

      <Modal
        visible={isOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
          <View className="flex-1 justify-end bg-black/50">
            <TouchableWithoutFeedback>
              <View className="bg-background-50 rounded-t-3xl pb-8 pt-4">
                <View className="w-12 h-1 bg-outline-200 rounded-full self-center mb-4" />
                <Text className="text-typography-100 text-heading font-semibold px-5 mb-3">
                  {label}
                </Text>
                <FlatList
                  data={items}
                  keyExtractor={(item) => item.value}
                  renderItem={({ item }) => (
                    <Pressable
                      className={itemStyle({ selected: item.value === value })}
                      onPress={() => {
                        onChange(item.value);
                        setIsOpen(false);
                      }}
                    >
                      <Text
                        className={
                          item.value === value
                            ? "text-primary-500 text-base font-semibold"
                            : "text-typography-100 text-base"
                        }
                      >
                        {item.name}
                      </Text>
                    </Pressable>
                  )}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};
