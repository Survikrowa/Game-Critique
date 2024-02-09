import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Button, Form, Separator, View, XStack, YStack } from "tamagui";
import { Checkbox } from "ui/forms/checkbox";
import { Input } from "ui/forms/input";
import { Select } from "ui/forms/select";
import { TextArea } from "ui/forms/text_area";
import { Text } from "ui/typography/text";
import { z } from "zod";

import { GAMES_SCORES } from "./games_scores";
import { GAMES_STATUSES } from "./games_statuses";
import { GameInfoQuery } from "../game/use_get_game_info/game_info.generated";

const NUMBERS_ONLY_REGEX = /^\d+$/;

const GamesStatusAddFormSchema = z
  .object({
    hours: z.string().optional(),
    minutes: z.string().max(60, "W godzinie występuje tylko 60 minut."),
    seconds: z.string().max(100, "W minucie jest tylko 100 sekund"),
    platform: z.string().min(1, "Platforma jest wymagana"),
    score: z.string().optional(),
    status: z.string().min(1, "Status jest wymagany"),
    review: z.string().optional(),
    platinium: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (data.hours && !NUMBERS_ONLY_REGEX.test(data.hours)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["hours"],
        message: "Akceptuję tylko liczby",
      });
    }
    if (data.minutes && !NUMBERS_ONLY_REGEX.test(data.minutes)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["minutes"],
        message: "Akceptuję tylko liczby",
      });
    }
    if (data.seconds && !NUMBERS_ONLY_REGEX.test(data.seconds)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["seconds"],
        message: "Akceptuję tylko liczby",
      });
    }

    if (data.status === "completed" && data.score?.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["score"],
        message: "Ocena jest wymagana",
      });
    }
  });

type GamesStatusAddFormFields = z.infer<typeof GamesStatusAddFormSchema>;

type GamesStatusFormProps = {
  initialValues?: {
    hours?: string;
    minutes?: string;
    seconds?: string;
    platform: string;
    score?: string;
    status: string;
    review?: string;
    platinium?: boolean;
  };
  game: GameInfoQuery["game"];
};

const DEFAULT_VALUES = {
  hours: "",
  minutes: "",
  seconds: "",
  platform: "",
  score: "",
  status: "",
  review: "",
  platinium: false,
};

const getInitialValues = (
  initialValues: GamesStatusFormProps["initialValues"],
) => {
  if (!initialValues) return DEFAULT_VALUES;
  return {
    hours: initialValues?.hours || DEFAULT_VALUES.hours,
    minutes: initialValues?.minutes || DEFAULT_VALUES.minutes,
    seconds: initialValues?.seconds || DEFAULT_VALUES.seconds,
    platform: initialValues.platform,
    score: initialValues.score || DEFAULT_VALUES.score,
    status: initialValues.status,
    review: initialValues.review || DEFAULT_VALUES.review,
    platinium: initialValues.platinium || DEFAULT_VALUES.platinium,
  };
};

export const GamesStatusForm = ({
  initialValues,
  game,
}: GamesStatusFormProps) => {
  const methods = useForm<GamesStatusAddFormFields>({
    resolver: zodResolver(GamesStatusAddFormSchema),
    defaultValues: getInitialValues(initialValues),
  });
  const { control, handleSubmit, reset, watch } = methods;

  const sonyConsolesIds = game.platforms.flatMap((platform) => {
    if (platform.name.includes("PlayStation")) {
      return platform.id;
    }
    return [];
  });

  const isSonyPlayStationConsole = sonyConsolesIds.includes(
    Number(watch("platform")),
  );
  const onSubmit = handleSubmit((data) => {
    const gameData = {
      ...data,
      platinium: isSonyPlayStationConsole ? data.platinium : false,
    };
    console.log(gameData);
    reset();
  });

  return (
    <View>
      <FormProvider {...methods}>
        <Form onSubmit={onSubmit}>
          <YStack gap={8}>
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
          </YStack>
          <Separator marginVertical={16} />

          <Text size="large" weight="bold" color="primary">
            Czas gry
          </Text>
          <XStack alignItems="center" justifyContent="space-evenly">
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
                      value={value}
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
                      value={value}
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
          </XStack>
          <Separator marginVertical={16} />
          <YStack gap={8}>
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
          </YStack>
          <Separator marginVertical={16} />
          <YStack gap={16}>
            <Text size="large" weight="bold" color="primary">
              Osiągnięcia
            </Text>
            {isSonyPlayStationConsole ? (
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
                      label="Osiągnieto platyne"
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
          </YStack>
          <Separator marginVertical={16} />
          <YStack gap={8}>
            <Text size="large" weight="bold" color="primary">
              Ocena
            </Text>
            <XStack alignItems="center" gap={16} justifyContent="center">
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
            </XStack>
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
          </YStack>

          <Form.Trigger asChild marginTop={16}>
            <Button theme="active" backgroundColor="black" color="white">
              Dodaj
            </Button>
          </Form.Trigger>
        </Form>
      </FormProvider>
    </View>
  );
};
