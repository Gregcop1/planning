import {Dayjs} from 'dayjs';

export const dateHelper = {
  getOlder(first: Dayjs, second: Dayjs): Dayjs {
    return first.isBefore(second) ? first : second;
  },
  getNewer(first: Dayjs, second: Dayjs): Dayjs {
    return first.isBefore(second) ? second : first;
  },
};
