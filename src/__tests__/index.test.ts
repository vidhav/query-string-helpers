import { getQsNumber, getQsNumbers, getQsString, getQsStrings } from '../index';

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
