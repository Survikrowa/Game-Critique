import dayjs, { Dayjs } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/pl';
dayjs.extend(relativeTime);

export const formatDateToRelativeText = (date: Dayjs) => {
  return dayjs().locale('pl').to(date);
};
