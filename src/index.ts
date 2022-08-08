/**
 * Returns a single numeric value.
 *
 * If value is not a number, the defaultValue will be returned.
 */
export const getQsNumber = (searchParams: URLSearchParams, key: string, defaultValue: number = 0): number => {
  const value = searchParams.get(key);
  if (value === null || value === '') {
    return defaultValue;
  }
  const numeric = Number(value);
  return isNaN(numeric) ? defaultValue : numeric;
};

/**
 * Returns a single string value.
 */
export const getQsString = (searchParams: URLSearchParams, key: string, defaultValue: string = ''): string => {
  const value = searchParams.get(key);
  if (value === null) {
    return defaultValue;
  }
  return value;
};

/**
 * Returns a Date object.
 *
 * If value is not a parsable date string, defaultValue is returned.
 */
export const getQsDate = (searchParams: URLSearchParams, key: string, defaultValue: Date = new Date()): Date => {
  const value = searchParams.get(key);
  if (value === null || isNaN(Date.parse(value))) {
    return defaultValue;
  }
  return new Date(value);
};

/**
 * Returns an array of numeric values.
 *
 * Values that are not a number, will be excluded from result.
 */
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

/**
 * Returns an array of strings.
 */
export const getQsStrings = (searchParams: URLSearchParams, key: string, defaultValue: string[] = []): string[] => {
  const values = searchParams.getAll(key);
  if (values.length === 0) {
    return defaultValue;
  }
  return values;
};

/**
 * Returns a Date object.
 *
 * If value is not a parsable by JavaScript Date, defaultValue is returned.
 */
export const getQsDates = (searchParams: URLSearchParams, key: string, defaultValue: Date[] = []): Date[] => {
  const values = searchParams
    .getAll(key)
    .filter((value) => isNaN(Date.parse(value)) === false)
    .map((value) => new Date(value));
  if (values.length === 0) {
    return defaultValue;
  }
  return values;
};
