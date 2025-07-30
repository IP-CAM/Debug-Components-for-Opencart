import templateHTML from './template.html?raw'
import { isEmptyObject } from '@/helpers.js'
import { LUMINARY_NAMESPACE } from '@/constants.js'

const template = document.createElement('template')
template.innerHTML = templateHTML

/**
 * Displays the main error header with title and message.
 * Shows the error title and an optional detailed message in a clean, accessible format.
 *
 * @example
 * ```html
 * <luminary-header id="header-main"></luminary-header>
 * ```
 */
class LuminaryHeader extends HTMLElement {
    #titleElement = null
    #messageElement = null
    #renderTimeout = null
    #unsubscribe = null

    constructor() {
        super()
        this.attachShadow({ mode: 'open' })

        const content = template.content.cloneNode(true)

        this.#titleElement = content.querySelector('.error-header__title')
        this.#messageElement = content.querySelector('.error-header__message')

        this.shadowRoot.append(content)
    }

    connectedCallback() {
        if (window[LUMINARY_NAMESPACE]?.LuminaryStore) {
            this.#unsubscribe = window[LUMINARY_NAMESPACE].LuminaryStore.subscribe(
                `${this.constructor.name}:${this.id}`,
                (value) => this.renderHeader(value)
            )
        } else {
            console.warn('LuminaryStore not found. Import luminary-store.js or main.js first.')
        }
    }

    disconnectedCallback() {
        this.#unsubscribe?.()

        if (this.#renderTimeout) {
            clearTimeout(this.#renderTimeout)
            this.#renderTimeout = null
        }
    }

    renderHeader(data) {
        if (this.#renderTimeout) {
            clearTimeout(this.#renderTimeout)
        }

        this.#renderTimeout = setTimeout(() => {
            this.#performRender(data)
            this.#renderTimeout = null
        }, 0)
    }

    #performRender(data) {
        if (!data || isEmptyObject(data)) {
            // Set defaults if no data
            if (this.#titleElement) {
                this.#titleElement.textContent = 'Debug'
            }
            if (this.#messageElement) {
                this.#messageElement.textContent = ''
                this.#messageElement.style.display = 'none'
            }
            return
        }

        // Update title
        if (this.#titleElement) {
            this.#titleElement.textContent = data.title || 'Debug'
        }

        // Update message
        if (this.#messageElement) {
            const message = data.message || ''
            this.#messageElement.textContent = message
            this.#messageElement.style.display = message ? 'block' : 'none'
        }
    }
}

customElements.define('luminary-header', LuminaryHeader)
export { LuminaryHeader }
