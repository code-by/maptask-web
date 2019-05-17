import moment from 'moment';

export const taskDescription = (taskType, taskSubType) =>
  `I need a ${taskType.title.toLowerCase()} to ${taskSubType.title.toLowerCase()}`;

export const formatCardDate = (date) => {
  if (date) {
    const formattedDate = moment(date).format('MMM D, H:m');
    if (
      new Date(Date.now()).getFullYear() === new Date(date).getFullYear() &&
      new Date(Date.now()).getMonth() === new Date(date).getMonth() &&
      new Date(Date.now()).getDay() === new Date(date).getDay()
    ) {
      return `Today, ${formattedDate}`;
    }
    return `${moment(date).format('ddd')}, ${formattedDate}`;
  }
  return 'unknown date';
};