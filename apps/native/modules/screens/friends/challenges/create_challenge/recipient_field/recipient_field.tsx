import { Controller, type Control } from "react-hook-form";
import { View } from "react-native";

import { CreateChallengeFormFields } from "../create_challenge_form_schema";
import { ChallengeGroupMemberList } from "../use_create_challenge_form/use_create_challenge_form";

import { haptic } from "@/modules/haptics/haptic";
import { Pressable } from "@/ui/forms/pressable/pressable";
import { Text } from "@/ui/typography/text";

type RecipientFieldProps = {
  control: Control<CreateChallengeFormFields>;
  members: ChallengeGroupMemberList;
};

export const RecipientField = ({ control, members }: RecipientFieldProps) => {
  return (
    <View style={{ gap: 4 }}>
      <Text size="small" weight="normal" color="secondary">
        Odbiorca
      </Text>
      <Controller
        control={control}
        name="recipientId"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <View style={{ gap: 4 }}>
            {members.map((member) => {
              const isSelected = value === member.oauthId;
              return (
                <Pressable
                  key={member.oauthId}
                  className={`min-h-[44px] items-center rounded-xl px-4 ${
                    isSelected ? "bg-primary-500" : "bg-background-50"
                  }`}
                  onPress={() => {
                    haptic.light();
                    onChange(member.oauthId);
                  }}
                >
                  <Text
                    size="medium"
                    weight="semiBold"
                    color={isSelected ? "white" : "primary"}
                  >
                    {isSelected ? "✓ " : ""}
                    {member.oauthId}
                  </Text>
                </Pressable>
              );
            })}
            {members.length === 0 && (
              <Text size="small" weight="normal" color="secondary">
                Brak innych członków w tej grupie
              </Text>
            )}
            {error && (
              <Text size="small" weight="normal" color="warning">
                {error.message}
              </Text>
            )}
          </View>
        )}
      />
    </View>
  );
};
