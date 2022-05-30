export const stocksAndInterval = (stocksArray, interval) => {
  return { stocksArray, interval: interval / 1000 };
};

export const checkInterval = (inputValue) =>
  (inputValue < 1 ? 1 : inputValue > 60 ? 60 : Math.round(inputValue)) * 1000;
