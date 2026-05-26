const debounce = (
  callback: (value: string) => void,
  delay: number
) => {
  let timer: ReturnType<typeof setTimeout>;

  return (value: string) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      callback(value);
    }, delay);
  };
};

export default debounce;