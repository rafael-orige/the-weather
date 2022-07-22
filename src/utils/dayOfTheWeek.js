export default function dayOfTheWeek(day, month, year) {
  const week = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  const date = new Date(`${year},${month}, ${day}`);
  const weekday = date.getDay();

  return week[weekday]
};