import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/pl';
dayjs.extend(relativeTime);

export const formatDateToRelativeText = (date: Date) => {
  return dayjs().locale('pl').to(dayjs(date));
};
