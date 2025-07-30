import templateHTML from './template.html?raw'
import { isEmptyObject } from '@/helpers.js'
import { LUMINARY_NAMESPACE } from '@/constants.js'

const template = document.createElement('template')
template.innerHTML = templateHTML

/**
 * Displays helpful suggestions or recommendations to resolve errors.
 * Renders a list of actionable items to help users debug issues.
 *
 * @example
 * ```html
 * <luminary-suggestions id="suggestions-main"></luminary-suggestions>
 * ```
 */
class LuminarySuggestions extends HTMLElement {
    #titleElement = null
    #listElement = null
    #renderTimeout = null
    #unsubscribe = null

    constructor() {
        super()
        this.attachShadow({ mode: 'open' })

        const content = template.content.cloneNode(true)

        this.#titleElement = content.querySelector('.suggestions__title')
        this.#listElement = content.querySelector('.suggestions__list')

        this.shadowRoot.append(content)
    }

    connectedCallback() {
        if (window[LUMINARY_NAMESPACE]?.LuminaryStore) {
            this.#unsubscribe = window[LUMINARY_NAMESPACE].LuminaryStore.subscribe(
                `LuminarySuggestions:${this.id}`,
                (value) => this.renderSuggestions(value)
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

    renderSuggestions(data) {
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
            this.setAttribute('empty', '')
            this.#listElement?.replaceChildren()

            return
        }

        this.removeAttribute('empty')

        // Update title
        if (this.#titleElement && data.title) {
            this.#titleElement.textContent = data.title
        }

        // Update suggestions list
        if (this.#listElement && Array.isArray(data.items)) {
            const items = data.items.map(suggestion => this.createSuggestionItem(suggestion))
            this.#listElement.replaceChildren(...items)
        }
    }

    createSuggestionItem(suggestion) {
        const itemElement = document.createElement('li')
        itemElement.className = 'suggestions__item'

        const textElement = document.createElement('span')
        textElement.className = 'suggestions__text'
        textElement.textContent = typeof suggestion === 'string' ? suggestion : suggestion.text || suggestion.message || ''

        itemElement.append(textElement)

        return itemElement
    }
}

customElements.define('luminary-suggestions', LuminarySuggestions)
export { LuminarySuggestions }
