import test from 'ava'
import { createRoundRobin } from './index.js' // Update the path to your module accordingly

test('createRoundRobin routes property access into the next item', t => {
  const items = [
    { greet: () => 'Hello, Alice!' },
    { greet: () => 'Hi, Bob!' }
  ]

  const proxy = createRoundRobin(items)

  t.is(proxy.greet(), 'Hello, Alice!')
  t.is(proxy.greet(), 'Hi, Bob!')
  t.is(proxy.greet(), 'Hello, Alice!')
})

test('createRoundRobin returns undefined for non-existent properties', t => {
  const items = [{ name: 'Alice' }, { name: 'Bob' }]

  const proxy = createRoundRobin(items)

  // @ts-ignore
  t.is(proxy.age, undefined)
})

test('createRoundRobin returns correct value for non-function properties', t => {
  const items = [{ name: 'Alice' }, { name: 'Bob' }]

  const proxy = createRoundRobin(items)

  t.is(proxy.name, 'Alice')
  t.is(proxy.name, 'Bob')
  t.is(proxy.name, 'Alice')
})
