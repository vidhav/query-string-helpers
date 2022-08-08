import { getQsDate, getQsDates, getQsNumber, getQsNumbers, getQsString, getQsStrings } from '../index';

test('getQsNumber', () => {
  const s = new URLSearchParams([
    ['foo', '42'],
    ['bar', 'x'],
  ]);

  const foo = getQsNumber(s, 'foo', -1);
  expect(foo).toBe(42);

  const bar = getQsNumber(s, 'bar', -1);
  expect(bar).toBe(-1);

  const baz = getQsNumber(s, 'baz', -1);
  expect(baz).toBe(-1);
});

test('getQsNumbers', () => {
  const s = new URLSearchParams([
    ['foo', '13'],
    ['foo', '30'],
    ['foo', '7'],
    ['bar', 'x'],
    ['bar', 'y'],
    ['bar', 'z'],
    ['baz', '42'],
    ['baz', 'n'],
    ['baz', '12'],
  ]);

  const foo = getQsNumbers(s, 'foo', [99]);
  expect(foo).toHaveLength(3);
  expect(foo).toEqual([13, 30, 7]);

  const bar = getQsNumbers(s, 'bar', [99]);
  expect(bar).toHaveLength(1);
  expect(bar).toEqual([99]);

  const baz = getQsNumbers(s, 'baz', [99]);
  expect(baz).toHaveLength(2);
  expect(baz).toEqual([42, 12]);

  const nil = getQsNumbers(s, 'nil', [99]);
  expect(nil).toHaveLength(1);
  expect(nil).toEqual([99]);
});

test('getQsString', () => {
  const s = new URLSearchParams([['txt', 'foobarbaz']]);

  const txt = getQsString(s, 'txt', 'none');
  expect(txt).toBe('foobarbaz');

  const nil = getQsString(s, 'nil', 'none');
  expect(nil).toBe('none');
});

test('getQsStrings', () => {
  const s = new URLSearchParams([
    ['txt', 'foo'],
    ['txt', 'bar'],
    ['txt', 'baz'],
  ]);

  const txt = getQsStrings(s, 'txt', ['none']);
  expect(txt).toHaveLength(3);
  expect(txt).toEqual(['foo', 'bar', 'baz']);

  const nil = getQsStrings(s, 'nil', ['none']);
  expect(nil).toHaveLength(1);
  expect(nil).toEqual(['none']);
});

test('getQsDate', () => {
  const s = new URLSearchParams([
    ['foo', '1997-08-29'],
    ['bar', '29 Aug 1997 02:14:00 EDT'],
    ['baz', '32 Aug 1997'],
  ]);

  const defaultValue = new Date('01 Jan 1970 00:00:00 GMT');

  const foo = getQsDate(s, 'foo', defaultValue);
  expect(foo).toEqual(new Date('1997-08-29'));

  const bar = getQsDate(s, 'bar', defaultValue);
  expect(bar).toEqual(new Date('29 Aug 1997 02:14:00 EDT'));

  const baz = getQsDate(s, 'baz', defaultValue);
  expect(baz).toBe(defaultValue);

  const nil = getQsDate(s, 'nil', defaultValue);
  expect(nil).toBe(defaultValue);
});

test('getQsDates', () => {
  const s = new URLSearchParams([
    ['foo', '1962-10-16'],
    ['foo', '1962-10-28'],
    ['bar', '31 Dec 1999 23:59:59 GMT'],
    ['bar', '01 Jan 2000 00:00:01 GMT'],
    ['baz', '30 Dec 1999'],
    ['baz', '31 Dec 1999'],
    ['baz', '32 Dec 1999'],
  ]);

  const foo = getQsDates(s, 'foo', []);
  expect(foo).toEqual([new Date('1962-10-16'), new Date('1962-10-28')]);

  const bar = getQsDates(s, 'bar', []);
  expect(bar).toEqual([new Date('31 Dec 1999 23:59:59 GMT'), new Date('01 Jan 2000 00:00:01 GMT')]);

  const baz = getQsDates(s, 'baz', []);
  expect(baz).toEqual([new Date('30 Dec 1999'), new Date('31 Dec 1999')]);
});
