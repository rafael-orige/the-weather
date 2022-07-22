export default function debounce(callback, time = 1000) {
  let timer;

  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback();
    }, time);
  };
}
