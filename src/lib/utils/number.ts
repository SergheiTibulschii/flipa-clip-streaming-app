export const abbreviateNumber = (num: number): string => {
  const scales = {
    B: 1e9,
    M: 1e6,
    K: 1e3,
  };

  for (const [suffix, value] of Object.entries(scales)) {
    if (num >= value) {
      const result = Math.floor((num / value) * 10) / 10;

      const formattedResult =
        result % 1 === 0 ? result.toFixed(0) : result.toFixed(1);
      return formattedResult + suffix;
    }
  }

  return num.toString();
};
