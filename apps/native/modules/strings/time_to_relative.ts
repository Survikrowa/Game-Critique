import { getRelativeTimeDiff } from "../dates/get_relative_time_diff";

export const timeToRelative = (isoString: string): string => {
  const { seconds, minutes, hours, days } = getRelativeTimeDiff(isoString);

  if (seconds < 60) return "przed chwilą";
  if (minutes < 60) return `${minutes} min temu`;
  if (hours < 24) return `${hours} godz. temu`;
  if (days < 7) return `${days} dni temu`;
  return new Date(isoString).toLocaleDateString("pl-PL");
};
