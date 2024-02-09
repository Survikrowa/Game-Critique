import { ReactNode, useState } from "react";
import { Select as TamaguiSelect, Adapt, Sheet } from "tamagui";

type SelectProps = {
  defaultValue?: string;
  placeholder: string;
  label: string;
  items: Readonly<SelectItem[]>;
  onChange: (value: string) => void;
  value: string;
  icon?: ReactNode;
};

type SelectItem = {
  name: string;
  value: string;
};
export const Select = ({
  defaultValue = "",
  placeholder,
  label,
  items,
  value,
  icon,
  onChange,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <TamaguiSelect
      defaultValue={defaultValue}
      onValueChange={onChange}
      value={value}
      onOpenChange={setIsOpen}
      open={isOpen}
    >
      <TamaguiSelect.Trigger onPress={() => setIsOpen(true)}>
        <TamaguiSelect.Value placeholder={placeholder} />
      </TamaguiSelect.Trigger>
      {/*
       *
       *  TS-IGNORE is here because the types in tamagui are not correct
       *  */}
      {/*
        // @ts-ignore */}
      <Adapt when="sm" platform="touch">
        <Sheet
          modal
          dismissOnSnapToBottom
          animationConfig={{
            type: "spring",
            damping: 20,
            mass: 1.2,
            stiffness: 250,
          }}
        >
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>
      <TamaguiSelect.Content zIndex={200000}>
        <TamaguiSelect.Viewport>
          <TamaguiSelect.Group alignItems="center" display="flex" height="100%">
            <TamaguiSelect.Label>{label}</TamaguiSelect.Label>
            {items.map((item, index) => (
              <TamaguiSelect.Item
                key={item.value}
                value={item.value}
                index={index}
              >
                <TamaguiSelect.ItemText>{item.name}</TamaguiSelect.ItemText>
                {icon}
              </TamaguiSelect.Item>
            ))}
          </TamaguiSelect.Group>
        </TamaguiSelect.Viewport>
      </TamaguiSelect.Content>
    </TamaguiSelect>
  );
};
