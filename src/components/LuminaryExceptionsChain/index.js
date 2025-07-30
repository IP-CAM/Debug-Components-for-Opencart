import templateHTML from './template.html?raw'
import { isEmptyObject } from '@/helpers.js'
import { LUMINARY_NAMESPACE } from '@/constants.js'

const template = document.createElement('template')
template.innerHTML = templateHTML

/**
 * Displays a chain of exceptions with their class, message, and location.
 * Shows the complete exception hierarchy in a clear, navigable format.
 *
 * @example
 * ```html
 * <luminary-exceptions-chain id="exceptions-main"></luminary-exceptions-chain>
 * ```
 */
class LuminaryExceptionsChain extends HTMLElement {
    #titleElement = null
    #listElement = null
    #renderTimeout = null
    #unsubscribe = null

    constructor() {
        super()
        this.attachShadow({ mode: 'open' })

        const content = template.content.cloneNode(true)

        this.#titleElement = content.querySelector('.exceptions-chain__title')
        this.#listElement = content.querySelector('.exceptions-chain__list')

        this.shadowRoot.append(content)
    }

    connectedCallback() {
        if (window[LUMINARY_NAMESPACE]?.LuminaryStore) {
            this.#unsubscribe = window[LUMINARY_NAMESPACE].LuminaryStore.subscribe(
                `${this.constructor.name}:${this.id}`,
                (value) => this.renderExceptions(value)
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

    renderExceptions(data) {
        if (this.#renderTimeout) {
            clearTimeout(this.#renderTimeout)
        }

        this.#renderTimeout = setTimeout(() => {
            this.#performRender(data)
            this.#renderTimeout = null
        }, 0)
    }

    #performRender(data) {
        if (!data || isEmptyObject(data) || !Array.isArray(data.exceptions) || data.exceptions.length === 0) {
            this.setAttribute('empty', '')
            this.#listElement?.replaceChildren()
            return
        }

        this.removeAttribute('empty')

        // Update title if provided
        if (this.#titleElement && data.title) {
            this.#titleElement.textContent = data.title
        }

        // Update exceptions list
        if (this.#listElement && Array.isArray(data.exceptions)) {
            const items = data.exceptions.map((exception, index) =>
                this.createExceptionItem(exception, index === 0)
            )
            this.#listElement.replaceChildren(...items)
        }
    }

    createExceptionItem(exception, isCurrent = false) {
        const itemElement = document.createElement('li')
        itemElement.className = `exceptions-chain__item${isCurrent ? ' exceptions-chain__item--current' : ''}`

        const classElement = document.createElement('div')
        classElement.className = 'exceptions-chain__class'
        classElement.textContent = exception.class || 'Exception'

        const messageElement = document.createElement('div')
        messageElement.className = 'exceptions-chain__message'
        messageElement.textContent = exception.message || ''

        const locationElement = document.createElement('div')
        locationElement.className = 'exceptions-chain__location'
        locationElement.textContent = `${exception.file || ''}:${exception.line || ''}`

        itemElement.append(classElement, messageElement, locationElement)

        return itemElement
    }
}

customElements.define('luminary-exceptions-chain', LuminaryExceptionsChain)
export { LuminaryExceptionsChain }
