# merry-go-round
Round robin proxy for iterating over arrays.

## Install
```bash
npm install @amscotti/merry-go-round
```

## Usage

```js
import { createRoundRobin } from '@amscotti/merry-go-round'

const items = [{
  name: 'Alice',
  greet() {
    return `Hello, ${this.name}` 
  }
}, {
  name: 'Bob',
  greet() {
    return `Hi, ${this.name}`
  }
}]

const proxy = createRoundRobin(items)

proxy.greet() // 'Hello, Alice!' 
proxy.greet() // 'Hi, Bob!'
proxy.greet() // 'Hello, Alice!'
```

`createRoundRobin` takes an array and returns a Proxy that rotates over the items, exposing their properties and methods.

This allows iterating over an array in a round robin manner easily.

## API

### createRoundRobin

```ts
function createRoundRobin<T>(items: T[]): T
```

Creates a round robin proxy over the given array of items.

- `items` - Array of objects to iterate over.
- Returns a Proxy wrapping the items.

The proxy will rotate over the items and proxy property/method access to the next item.