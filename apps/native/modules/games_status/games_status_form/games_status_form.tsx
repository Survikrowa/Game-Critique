import { ErrorMessage } from "@hookform/error-message";
import { Controller, FormProvider } from "react-hook-form";
import { View } from "react-native";
import { Checkbox } from "ui/forms/checkbox";
import { Input } from "ui/forms/input";
import { Select } from "ui/forms/select";
import { TextArea } from "ui/forms/text_area";
import { Text } from "ui/typography/text";

import { GAMES_SCORES } from "./games_scores";
import { GAMES_STATUSES } from "./games_statuses";
import {
  DEFAULT_VALUES,
  InitialValues,
  useGamesStatusForm,
} from "./use_games_status_form";
import { GameInfoQuery } from "../../screens/game/use_get_game_info/game_info.generated";

import { Button, ButtonText } from "@/ui/forms/button/button";
import { HStack } from "@/ui/layout/hstack/hstack";
import { Separator } from "@/ui/layout/separator/separator";
import { VStack } from "@/ui/layout/vstack/vstack";

type GamesStatusFormProps = {
  initialValues?: InitialValues;
  gameStatusId?: number;
  game: GameInfoQuery["game"];
};

export const GamesStatusForm = ({
  initialValues,
  game,
  gameStatusId,
}: GamesStatusFormProps) => {
  const { onSubmit, control, isPlatformWithAchievements, methods } =
    useGamesStatusForm({
      initialValues,
      game,
      gameStatusId,
    });

  return (
    <FormProvider {...methods}>
      <View>
        <VStack className="gap-4">
          <VStack className="gap-1">
            <Text size="large" weight="bold" color="primary">
              Status*
            </Text>
            <Controller
              render={({
                fieldState: { error },
                field: { onChange, value },
              }) => (
                <>
                  <Select
                    placeholder="Wybierz status gry..."
                    onChange={onChange}
                    value={value}
                    label="Status"
                    items={GAMES_STATUSES}
                  />
                  <ErrorMessage
                    name="status"
                    message={error?.message}
                    render={(data) => (
                      <Text size="small" weight="normal" color="warning">
                        {data.message}
                      </Text>
                    )}
                  />
                </>
              )}
              name="status"
              control={control}
            />
          </VStack>

          <Separator />

          <VStack className="gap-1">
            <Text size="large" weight="bold" color="primary">
              Czas gry
            </Text>
            <HStack className="items-center justify-evenly">
              <View className="max-w-[60px]">
                <Controller
                  render={({
                    fieldState: { error },
                    field: { onChange, value },
                  }) => (
                    <Input
                      onChange={onChange}
                      value={value || DEFAULT_VALUES.hours}
                      label="H"
                      errorMessage={error?.message}
                      inputMode="numeric"
                    />
                  )}
                  control={control}
                  name="hours"
                />
              </View>
              <View className="max-w-[60px]">
                <Controller
                  render={({
                    fieldState: { error },
                    field: { onChange, value },
                  }) => (
                    <Input
                      onChange={onChange}
                      value={value || DEFAULT_VALUES.minutes}
                      label="M"
                      errorMessage={error?.message}
                      inputMode="numeric"
                    />
                  )}
                  control={control}
                  name="minutes"
                />
              </View>
              <View className="max-w-[60px]">
                <Controller
                  render={({
                    fieldState: { error },
                    field: { onChange, value },
                  }) => (
                    <Input
                      onChange={onChange}
                      value={value || DEFAULT_VALUES.seconds}
                      label="S"
                      errorMessage={error?.message}
                      inputMode="numeric"
                    />
                  )}
                  control={control}
                  name="seconds"
                />
              </View>
            </HStack>
          </VStack>

          <Separator />

          <VStack className="gap-1">
            <Text size="large" weight="bold" color="primary">
              Platforma*
            </Text>
            <Controller
              render={({
                fieldState: { error },
                field: { onChange, value },
              }) => (
                <>
                  <Select
                    defaultValue={initialValues?.platform || ""}
                    placeholder="Wybierz platforme..."
                    onChange={onChange}
                    value={value}
                    label="Platforma"
                    items={game.platforms.map((platform) => ({
                      name: platform.name,
                      value: String(platform.id),
                    }))}
                  />
                  <ErrorMessage
                    name="platform"
                    message={error?.message}
                    render={(data) => (
                      <Text size="small" weight="normal" color="warning">
                        {data.message}
                      </Text>
                    )}
                  />
                </>
              )}
              name="platform"
              control={control}
            />
          </VStack>

          <Separator />

          <VStack className="gap-2">
            <Text size="large" weight="bold" color="primary">
              Osiągnięcia
            </Text>
            {isPlatformWithAchievements ? (
              <Controller
                render={({
                  fieldState: { error },
                  field: { onChange, value },
                }) => (
                  <Checkbox
                    onChange={onChange}
                    value={value}
                    isChecked={value}
                    label="Osiągnieto 100% gry"
                    errorMessage={error?.message}
                  />
                )}
                name="platinium"
              />
            ) : (
              <Text size="large" weight="bold" color="secondary">
                Ta gra lub platforma nie posiada osiągnięć
              </Text>
            )}
          </VStack>

          <Separator />

          <VStack className="gap-1">
            <Text size="large" weight="bold" color="primary">
              Ocena
            </Text>
            <Controller
              render={({
                fieldState: { error },
                field: { onChange, value },
              }) => (
                <>
                  <Select
                    placeholder="Wybierz ocene..."
                    onChange={onChange}
                    value={value || ""}
                    label="Ocena"
                    items={GAMES_SCORES.map((score) => ({
                      name: score.name,
                      value: score.value,
                    }))}
                  />
                  <ErrorMessage
                    name="score"
                    message={error?.message}
                    render={(data) => (
                      <Text size="small" weight="normal" color="warning">
                        {data.message}
                      </Text>
                    )}
                  />
                </>
              )}
              control={control}
              name="score"
            />
            <Controller
              render={({
                fieldState: { error },
                field: { onChange, value },
              }) => (
                <TextArea
                  onChange={onChange}
                  value={value || DEFAULT_VALUES.review}
                  label="Opcjonalne miejsce na recenzje"
                  errorMessage={error?.message}
                />
              )}
              control={control}
              name="review"
            />
          </VStack>

          <Button action="primary" className="mt-4" onPress={onSubmit}>
            <ButtonText>
              {methods.formState.isSubmitting
                ? "Trwa zapisywanie..."
                : "Zapisz"}
            </ButtonText>
          </Button>
        </VStack>
      </View>
    </FormProvider>
  );
};
