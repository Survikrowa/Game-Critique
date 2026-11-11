import { Controller, type Control, useWatch } from "react-hook-form";
import { TextInput, View } from "react-native";

import { ChallengeType } from "../../../../../../__generated__/types";
import { CreateChallengeFormFields } from "../create_challenge_form_schema";

import { haptic } from "@/modules/haptics/haptic";
import { Pressable } from "@/ui/forms/pressable/pressable";
import { Text } from "@/ui/typography/text";

type TypeToggleOption = {
  value: ChallengeType;
  label: string;
};

const TYPE_TOGGLE_OPTIONS: TypeToggleOption[] = [
  { value: ChallengeType.BeatGame, label: "Ukończ grę" },
  { value: ChallengeType.InGameChallenge, label: "Wyzwanie w grze" },
];

type TypeToggleFieldProps = {
  control: Control<CreateChallengeFormFields>;
};

export const TypeToggleField = ({ control }: TypeToggleFieldProps) => {
  const type = useWatch<CreateChallengeFormFields>({ control, name: "type" });

  return (
    <View style={{ gap: 4 }}>
      <Text size="small" weight="normal" color="secondary">
        Typ wyzwania
      </Text>
      <Controller
        control={control}
        name="type"
        render={({ field: { value, onChange } }) => (
          <View className="flex-row gap-2">
            {TYPE_TOGGLE_OPTIONS.map((option) => {
              const isActive = option.value === value;
              return (
                <Pressable
                  key={option.value}
                  className={`min-h-[44px] flex-1 items-center justify-center rounded-xl ${
                    isActive ? "bg-primary-500" : "bg-background-50"
                  }`}
                  onPress={() => {
                    haptic.light();
                    onChange(option.value);
                  }}
                >
                  <Text
                    size="medium"
                    weight="semiBold"
                    color={isActive ? "white" : "primary"}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        )}
      />
      {type === ChallengeType.InGameChallenge && (
        <Controller
          control={control}
          name="description"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <View style={{ gap: 4 }}>
              <Text size="small" weight="normal" color="secondary">
                Opis
              </Text>
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder="Opisz swój cel…"
                className="rounded-xl bg-background-50 px-4 py-3"
              />
              {error && (
                <Text size="small" weight="normal" color="warning">
                  {error.message}
                </Text>
              )}
            </View>
          )}
        />
      )}
    </View>
  );
};
