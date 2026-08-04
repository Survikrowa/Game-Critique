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
  const hoursExact = minutes / NUMBER_OF_SECONDS_IN_MINUTE;
  const hoursRounded = Math.round(hoursExact * 2) / 2;
  const hoursDisplay =
    hoursRounded % 1 === 0 ? hoursRounded.toString() : hoursRounded.toFixed(1);
  return `${hoursDisplay} ${pluralizePolish(
    Math.floor(hoursRounded),
    "godzina",
    "godziny",
    "godzin",
  )}`;
};
