import dayjs from 'dayjs';

export const formatDate = (date) => dayjs(date).format('YYYY-MM-DD');

export const prepareLineData = (data = {}) => ({
  id: data.id,
  name: data.name,
  startDate: data.date_of_start ? formatDate(data.date_of_start) : '',
  endDate: data.date_of_end ? formatDate(data.date_of_end) : '',
  source: {...data},
});
