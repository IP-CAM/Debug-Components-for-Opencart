import templateHTML from './template.html?raw'
import { isEmptyObject } from '@/helpers.js'
import { LUMINARY_NAMESPACE } from '@/constants.js'

const template = document.createElement('template')
template.innerHTML = templateHTML

/**
 * Displays a stack trace with collapsible frames for detailed error analysis.
 * Provides a structured view of the call stack to help with debugging.
 *
 * @example
 * ```html
 * <luminary-stack-trace id="stack-trace-main"></luminary-stack-trace>
 * ```
 */
class LuminaryStackTrace extends HTMLElement {
    #titleElement = null
    #renderTimeout = null
    #unsubscribe = null

    constructor() {
        super()
        this.attachShadow({ mode: 'open' })

        const content = template.content.cloneNode(true)
        this.#titleElement = content.querySelector('.stack-trace__title')
        this.shadowRoot.append(content)
    }

    connectedCallback() {
        if (window[LUMINARY_NAMESPACE]?.LuminaryStore) {
            this.#unsubscribe = window[LUMINARY_NAMESPACE].LuminaryStore.subscribe(
                `LuminaryStackTrace:${this.id}`,
                (value) => this.renderStackTrace(value)
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

    renderStackTrace(data) {
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
            if (this.#titleElement) {
                this.#titleElement.textContent = 'Stack Trace'
            }
            return
        }

        this.removeAttribute('empty')

        if (this.#titleElement) {
            this.#titleElement.textContent = data.title || 'Stack Trace'
        }
    }
}

customElements.define('luminary-stack-trace', LuminaryStackTrace)
export { LuminaryStackTrace }
