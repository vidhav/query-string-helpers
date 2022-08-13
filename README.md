# Query string utils

A small collection of utility functions for working with query strings.

## Install

```
$ npm install query-string-utils
```

## Usage

```js
import { getQsDate, getQsDates, getQsNumber, getQsNumbers, getQsString, getQsStrings } from 'query-string-utils';

const searchParams = new URLSearchParams(window.location.search);

// ?id=42
const [ id = 0 ] = getQsNumber(searchParams, 'id');
console.log(id);
//=> 42

// ?id=13&id=30&id=7
const ids = getQsNumber(searchParams, 'id');
console.log(ids);
//=> [13, 30, 7]

// ?key=foo
const [ key = '' ] = getQsString(searchParams, 'key');
console.log(key);
//=> 'foo'

// ?key=foo&key=bar&key=baz
const keys = getQsString(searchParams, 'key');
console.log(keys);
//=> ['foo', 'bar', 'baz']

// ?key=1970-01-01T13:30:07
const [ date = new Date() ] = getQsDate(searchParams, 'date');
console.log(date);
//=> Date Thu Jan 01 1970 13:30:07 GMT+0100 (Central European Standard Time)

// ?date=1962-10-16&date=1962-10-28
const dates = getQsDate(searchParams, 'date');
console.log(dates);
//=> [ Date Tue Oct 16 1962 01:00:00 GMT+0100 (Central European Standard Time), Date Sun Oct 28 1962 01:00:00 GMT+0100 (Central European Standard Time) ]

// ?status=true
const [ status = false ] = getQsBoolean(searchParams, 'status');
console.log(active);
//=> true

// ?status=true&status=yes&status=false&status=on
const statuses = getQsBoolean(searchParams, 'status');
console.log(statuses);
//=> true, true, false, true
```
