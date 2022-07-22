export default function returnCondition(code) {
  if (code === 1000) return 'clear';

  const conditionCodes = [
    {
      title: 'cloudy',
      codes: [1003, 1006, 1009, 1030, 1069, 1087, 1135, 1273, 1276, 1279, 1282],
    },
    {
      title: 'rainy',
      codes: [
        1063, 1069, 1072, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1204,
        1207, 1240, 1243, 1246, 1249, 1252,
      ],
    },
  ];

  let result;

  conditionCodes.forEach((condition) => {
    const checkCondition = (item) => {
      if (item === code) result = condition.title;
    };

    condition.codes.forEach((item) => checkCondition(item));
  });

  return result || 'snowy';
}
