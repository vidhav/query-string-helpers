import { getQsBoolean, getQsDate, getQsNumber, getQsString } from '../index';

test('getQsNumber', () => {
  const s = new URLSearchParams([
    ['foo', '42'],
    ['bar', '13'],
    ['bar', '30'],
    ['bar', '7'],
    ['baz', '1'],
    ['baz', 'x'],
    ['baz', '2'],
  ]);

  const [foo = -1] = getQsNumber(s, 'foo');
  expect(foo).toBe(42);

  const bar = getQsNumber(s, 'bar');
  expect(bar).toEqual([13, 30, 7]);

  const baz = getQsNumber(s, 'baz');
  expect(baz).toEqual([1, 2]);

  const [nil = -1] = getQsNumber(s, 'nil');
  expect(nil).toBe(-1);
});

test('getQsString', () => {
  const s = new URLSearchParams([
    ['foo', 'lorem'],
    ['bar', 'ipsum'],
    ['bar', 'dolor'],
    ['bar', 'sit'],
  ]);

  const [foo = ''] = getQsString(s, 'foo');
  expect(foo).toBe('lorem');

  const bar = getQsString(s, 'bar');
  expect(bar).toEqual(['ipsum', 'dolor', 'sit']);

  const [nil = 'none'] = getQsString(s, 'nil');
  expect(nil).toBe('none');
});

test('getQsDate', () => {
  const s = new URLSearchParams([
    ['foo', '29 Aug 1997 02:14:00 EDT'],
    ['bar', '31 Dec 1999 23:59:59 GMT'],
    ['bar', '01 Jan 2000 00:00:01 GMT'],
    ['baz', '31 Aug 1997'],
    ['baz', '32 Aug 1997'],
  ]);

  const defaultValue = new Date('01 Jan 1970 00:00:00 GMT');

  const [foo = defaultValue] = getQsDate(s, 'foo');
  expect(foo).toEqual(new Date('29 Aug 1997 02:14:00 EDT'));

  const bar = getQsDate(s, 'bar');
  expect(bar).toEqual([new Date('31 Dec 1999 23:59:59 GMT'), new Date('01 Jan 2000 00:00:01 GMT')]);

  const baz = getQsDate(s, 'baz');
  expect(baz).toEqual([new Date('31 Aug 1997')]);

  const [nil = defaultValue] = getQsDate(s, 'nil');
  expect(nil).toEqual(defaultValue);
});

test('getQsBoolean', () => {
  const s = new URLSearchParams([
    ['foo', 'true'],
    ['bar', 'true'],
    ['bar', 't'],
    ['bar', 'yes'],
    ['bar', 'on'],
    ['bar', '1'],
    ['baz', 'false'],
    ['baz', 'f'],
    ['baz', 'no'],
    ['baz', 'off'],
    ['baz', '0'],
    ['baz', 'x'],
  ]);

  const [foo] = getQsBoolean(s, 'foo');
  expect(foo).toBe(true);

  const bar = getQsBoolean(s, 'bar');
  expect(bar).toEqual([true, true, true, true, true]);

  const baz = getQsBoolean(s, 'baz');
  expect(baz).toEqual([false, false, false, false, false, false]);

  const [nil = false] = getQsBoolean(s, 'nil');
  expect(nil).toBe(false);
});
