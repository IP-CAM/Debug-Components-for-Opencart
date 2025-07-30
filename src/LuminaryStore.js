import { LUMINARY_NAMESPACE } from './constants.js'
import { isEqualObjects } from '@/helpers.js'

class LuminaryStore {
    #state = {}
    #subscribers = new Map()
    state

    constructor(initialState = {}) {
        this.#state = { ...initialState };

        this.state = new Proxy(this.#state, {
            set: (target, key, value) => {
                const oldValue = target[key]

                if (this.#isValuesEqual(oldValue, value)) {
                    return true
                }

                target[key] = value
                this.#notify(key)

                return true
            }
        })
    }

    /**
     * Retrieves data for a given key.
     * @param {string} key
     * @returns {any | undefined}
     */
    get(key) {
        return this.#state[key]
    }

    /**
     * Subscribes a callback to changes for a specific key.
     * @param {string} key
     * @param {function(*): void} callback
     * @returns {() => void} A function to unsubscribe.
     */
    subscribe(key, callback) {
        if (!this.#subscribers.has(key)) {
            this.#subscribers.set(key, [])
        }

        const subscribers = this.#subscribers.get(key)
        subscribers.push(callback)

        this.#notify(key)

        return () => {
            const index = subscribers.indexOf(callback)

            if (index > -1) {
                subscribers.splice(index, 1)

                if (subscribers.length === 0) {
                    this.#subscribers.delete(key)
                }
            }
        }
    }

    #isValuesEqual(oldValue, newValue) {
        if (oldValue === newValue) {
            return true
        }

        if (Number.isNaN(oldValue) && Number.isNaN(newValue)) {
            return true
        }

        if (
            typeof oldValue === 'object' && oldValue !== null &&
            typeof newValue === 'object' && newValue !== null
        ) {
            return isEqualObjects(oldValue, newValue)
        }

        return false
    }

    /**
     * Notifies all subscribers for a given key.
     * @param {string} key
     * @private
     */
    #notify(key) {
        const subscribers = this.#subscribers.get(key)

        if (!subscribers) {
            return
        }

        const value = this.#state[key]

        subscribers.forEach(callback => {
            try {
                callback(value)
            } catch (error) {
                console.error(`Error in subscriber callback for key "${key}":`, error)
            }
        })
    }
}

// Ensure the global namespace object exists.
window[LUMINARY_NAMESPACE] = window[LUMINARY_NAMESPACE] || {}

// Read the initial state from the namespace.
const initialState = window[LUMINARY_NAMESPACE].initialState || {}

// Create an instance of the class.
const instance = new LuminaryStore(initialState)

// Attach the instance to the global namespace.
window[LUMINARY_NAMESPACE].LuminaryStore = instance

// Export the instance under the name 'LuminaryStore'.
export { instance as LuminaryStore }
