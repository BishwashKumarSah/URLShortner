# Small Id
_Small and fast collision resistant id generator_
___

Q: _Why?_ <br>
A: _We wanted a fast and low maintenance, url friendly id generator._

## Example
```js
const smallId = require('small-id');

const id = smallId();

const getSafeId = async() => await smallId.safe();
```

## Character pallet
Generator uses a pallet of URL friendly characters
___

## Generation
- The ids are generated from the current timestamp with an appended 3 digit counter
- The counter increments with each call and reset when it hits 1000
- You should not use those ids for serious cryptographic purposes, since they can give away the timestamp at which they were generated.

## A word about the collision resistance

In case of single source of generation the ids are:
 - collision-resistant if you generate less than 1000 per second
 - collision-proof if you use `await smallId.safe()`
  - `await smallId.safe()` defers the generation process by a millisecond if the counter rolled over

In case of multiple sources of generation it's advised to also use a source identifier with the ids, then same rules as above apply.

# License
License can be found [here](https://github.com/findie/small-id/blob/master/license.md)

