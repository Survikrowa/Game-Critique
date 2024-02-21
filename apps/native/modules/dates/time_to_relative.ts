import { pluralizePolish } from "../strings/pluralize";

const NUMBER_OF_SECONDS_IN_MINUTE = 60;

export const timeToRelative = (seconds: number) => {
  const minutes = Math.floor(seconds / NUMBER_OF_SECONDS_IN_MINUTE);
  if (minutes < NUMBER_OF_SECONDS_IN_MINUTE) {
    return `${minutes} ${pluralizePolish(
      minutes,
      "minuta",
      "minuty",
      "minut",
    )}`;
  }
  const hours = minutes / NUMBER_OF_SECONDS_IN_MINUTE;
  return `${Math.floor(hours)} ${pluralizePolish(
    hours,
    "godzina",
    "godzin",
    "godziny",
  )}`;
};
