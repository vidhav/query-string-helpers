# Query string helpers

A small collection of helper functions for working with query strings.

## Install

```
$ npm install query-string-helpers
```

## Usage

```js
import { getQsNumber, getQsNumbers, getQsString, getQsStrings } from 'query-string-helpers';

const searchParams = new URLSearchParams(window.location.search);

// ?id=42
const id = getQsNumber(searchParams, 'id', 0);
console.log(id);
//=> 42

// ?id=13&id=30&id=7
const ids = getQsNumbers(searchParams, 'id', []);
console.log(ids);
//=> [13, 30, 7]

// ?key=foo
const key = getQsString(searchParams, 'key', '');
console.log(key);
//=> 'foo'

// ?key=foo&key=bar&key=baz
const keys = getQsStrings(searchParams, 'key', []);
console.log(keys);
//=> ['foo', 'bar', 'baz']
```
