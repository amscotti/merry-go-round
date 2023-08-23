/**
 * Creates a round robin proxy over the given items.
 *
 * @template {{ [key: string]: any }} T
 * @param {T[]} items - The items to iterate over.
 * @returns {T} - A Proxy wrapping the items.
 */
export function createRoundRobin (items) {
  /** @type {number} */
  let index = 0

  /**
   * @typedef {Object} Obj
   * @property {T[]} items
   * @property {function(): T} getNextItem
   */

  /**
   * @type {Obj}
   */
  const obj = {
    items,

    /**
     * Gets the next item in a round robin manner.
     * @returns {T} The next item.
     */
    getNextItem () {
      const item = this.items[index]
      index = (index + 1) % this.items.length
      return item
    }
  }

  // @ts-ignore
  return new Proxy(obj, {

    /**
     * Proxy handler that routes property access into the next item.
     *
     * @param {Obj} target - The target object.
     * @param {string|number|symbol} prop - The property to access.
     * @returns {any}
     */
    get (target, prop) {
      const item = target.getNextItem()

      if (typeof prop === 'symbol' || typeof prop === 'number' || !(prop in item)) {
        return undefined
      }

      if (typeof item[prop] === 'function') {
        /**
        * @param {...any} args
        */
        return (...args) => item[prop](...args)
      }
      return item[prop]
    }
  })
}
