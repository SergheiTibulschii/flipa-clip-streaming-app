type DebouncedFunctionWithOptions = (...args: unknown[]) => void;

interface DebounceOptions {
  debounceType?: 'trailing' | 'leading';
}

export const debounce = (
  func: DebouncedFunctionWithOptions,
  wait: number,
  options: DebounceOptions = {}
): DebouncedFunctionWithOptions => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: unknown[] | null = null;
  const { debounceType = 'leading' } = options;

  return function (...args: unknown[]) {
    if (debounceType === 'leading' && !timeout) {
      func(...args);
    }

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      if (debounceType === 'trailing' && lastArgs) {
        func(...lastArgs);
      }
      timeout = null;
    }, wait);

    lastArgs = args;
  };
};
