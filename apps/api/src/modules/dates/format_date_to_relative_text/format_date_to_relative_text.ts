import dayjs, { Dayjs } from 'dayjs';

export const formatDateToRelativeText = (date: Dayjs) => {
  const diffInDays = date.diff(dayjs(), 'day');
  switch (diffInDays) {
    case 0:
      return 'dzisiaj';
    case -1:
      return 'wczoraj';
    default:
      return `{diffInDays} dni temu`;
  }
};
