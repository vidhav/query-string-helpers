export const getQsNumber = (searchParams: URLSearchParams, key: string, defaultValue: number = 0): number => {
  const value = searchParams.get(key);
  if (value === null || value === '') {
    return defaultValue;
  }
  const numeric = Number(value);
  return isNaN(numeric) ? defaultValue : numeric;
};

export const getQsString = (searchParams: URLSearchParams, key: string, defaultValue: string = ''): string => {
  const value = searchParams.get(key);
  if (value === null) {
    return defaultValue;
  }
  return value;
};

export const getQsNumbers = (searchParams: URLSearchParams, key: string, defaultValue: number[] = []): number[] => {
  const values = searchParams
    .getAll(key)
    .map((value) => Number(value))
    .filter((value) => isNaN(value) === false);
  if (values.length === 0) {
    return defaultValue;
  }
  return values;
};

export const getQsStrings = (searchParams: URLSearchParams, key: string, defaultValue: string[] = []): string[] => {
  const values = searchParams.getAll(key);
  if (values.length === 0) {
    return defaultValue;
  }
  return values;
};
