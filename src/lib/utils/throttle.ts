type ThrottledFunction = (...args: unknown[]) => void;

export const throttle = (fn: ThrottledFunction, wait: number = 2000) => {
  let lastCalled = 0;

  return function (...args: unknown[]) {
    const now = Date.now();

    if (now - lastCalled >= wait) {
      fn(...args);
      lastCalled = now;
    }
  };
};
