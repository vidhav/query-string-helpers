const TRUE_VALUES = ['true', 't', 'yes', 'on', '1'];

/**
 * Get a list of valid numbers from the query string.
 */
export const getQsNumber = (searchParams: URLSearchParams, key: string): number[] => {
  if (searchParams.has(key) === false) {
    return [];
  }
  return searchParams
    .getAll(key)
    .map((value) => Number(value))
    .filter((value) => isNaN(value) === false);
};

/**
 * Get a list of strings from the query string.
 */
export const getQsString = (searchParams: URLSearchParams, key: string): string[] => {
  if (searchParams.has(key) === false) {
    return [];
  }
  return searchParams.getAll(key);
};

/**
 * Get a list of valid dates from the query string.
 */
export const getQsDate = (searchParams: URLSearchParams, key: string): Date[] => {
  if (searchParams.has(key) === false) {
    return [];
  }
  return searchParams
    .getAll(key)
    .filter((value) => isNaN(Date.parse(value)) === false)
    .map((value) => new Date(value));
};

/**
 * Get a list of truthy values from the query string.
 *
 * Truthy values: true, t, yes, on, 1
 */
export const getQsBoolean = (searchParams: URLSearchParams, key: string): boolean[] => {
  if (searchParams.has(key) === false) {
    return [];
  }
  return searchParams.getAll(key).map((value) => TRUE_VALUES.includes(value.trim().toLowerCase()));
};
