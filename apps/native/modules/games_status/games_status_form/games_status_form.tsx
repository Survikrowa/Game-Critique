import { ErrorMessage } from "@hookform/error-message";
import { Controller, FormProvider } from "react-hook-form";
import { Button, Form, Separator, View } from "tamagui";
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

import { HStack } from "@/ui/layout/hstack/hstack";
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
        <Form onSubmit={onSubmit}>
          <VStack space="sm">
            <Text size="large" weight="bold" color="primary">
              Status*
            </Text>
            <Controller
              render={({
                fieldState: { error },
                field: { onChange, value },
              }) => {
                return (
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
                      render={(data) => {
                        return (
                          <Text size="small" weight="normal" color="warning">
                            {data.message}
                          </Text>
                        );
                      }}
                    />
                  </>
                );
              }}
              name="status"
              control={control}
            />
          </VStack>
          <Separator marginVertical={16} />

          <Text size="large" weight="bold" color="primary">
            Czas gry
          </Text>
          <HStack
            style={{ alignItems: "center", justifyContent: "space-evenly" }}
          >
            <View maxWidth={60}>
              <Controller
                render={({
                  fieldState: { error },
                  field: { onChange, value },
                }) => {
                  return (
                    <Input
                      onChange={onChange}
                      value={value || DEFAULT_VALUES.hours}
                      label="H"
                      errorMessage={error?.message}
                      inputMode="numeric"
                    />
                  );
                }}
                control={control}
                name="hours"
              />
            </View>
            <View maxWidth={60}>
              <Controller
                render={({
                  fieldState: { error },
                  field: { onChange, value },
                }) => {
                  return (
                    <Input
                      onChange={onChange}
                      value={value || DEFAULT_VALUES.minutes}
                      label="M"
                      errorMessage={error?.message}
                      inputMode="numeric"
                    />
                  );
                }}
                control={control}
                name="minutes"
              />
            </View>
            <View maxWidth={60}>
              <Controller
                render={({
                  fieldState: { error },
                  field: { onChange, value },
                }) => {
                  return (
                    <Input
                      onChange={onChange}
                      value={value || DEFAULT_VALUES.seconds}
                      label="S"
                      errorMessage={error?.message}
                      inputMode="numeric"
                    />
                  );
                }}
                control={control}
                name="seconds"
              />
            </View>
          </HStack>
          <Separator marginVertical={16} />
          <VStack space="sm">
            <Text size="large" weight="bold" color="primary">
              Platforma*
            </Text>
            <Controller
              render={({
                fieldState: { error },
                field: { onChange, value },
              }) => {
                return (
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
                      render={(data) => {
                        return (
                          <Text size="small" weight="normal" color="warning">
                            {data.message}
                          </Text>
                        );
                      }}
                    />
                  </>
                );
              }}
              name="platform"
              control={control}
            />
          </VStack>
          <Separator marginVertical={16} />
          <VStack space="md">
            <Text size="large" weight="bold" color="primary">
              Osiągnięcia
            </Text>
            {isPlatformWithAchievements ? (
              <Controller
                render={({
                  fieldState: { error },
                  field: { onChange, value },
                }) => {
                  return (
                    <Checkbox
                      onChange={onChange}
                      value={value}
                      isChecked={value}
                      label="Osiągnieto 100% gry"
                      errorMessage={error?.message}
                    />
                  );
                }}
                name="platinium"
              />
            ) : (
              <Text size="large" weight="bold" color="secondary">
                Ta gra lub platforma nie posiada osiągnięć
              </Text>
            )}
          </VStack>
          <Separator marginVertical={16} />
          <VStack space="sm">
            <Text size="large" weight="bold" color="primary">
              Ocena
            </Text>
            <HStack
              style={{
                alignItems: "center",
                gap: 16,
                justifyContent: "center",
              }}
            >
              <Controller
                render={({
                  fieldState: { error },
                  field: { onChange, value },
                }) => {
                  return (
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
                        render={(data) => {
                          return (
                            <Text size="small" weight="normal" color="warning">
                              {data.message}
                            </Text>
                          );
                        }}
                      />
                    </>
                  );
                }}
                control={control}
                name="score"
              />
            </HStack>
            <Controller
              render={({
                fieldState: { error },
                field: { onChange, value },
              }) => {
                return (
                  <TextArea
                    onChange={onChange}
                    value={value || DEFAULT_VALUES.review}
                    label="Opcjonalne miejsce na recenzje"
                    errorMessage={error?.message}
                  />
                );
              }}
              control={control}
              name="review"
            />
          </VStack>

          <Form.Trigger asChild marginTop={16}>
            <Button
              theme="active"
              backgroundColor="black"
              color="white"
              borderColor="white"
            >
              {methods.formState.isSubmitting
                ? "Trwa zapisywanie..."
                : "Zapisz"}
            </Button>
          </Form.Trigger>
        </Form>
      </View>
    </FormProvider>
  );
};
