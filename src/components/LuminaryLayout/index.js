import templateHTML from './template.html?raw'
import { LUMINARY_NAMESPACE } from '@/constants.js'

const template = document.createElement('template')
template.innerHTML = templateHTML

/**
 * Root layout container component that manages page structure and document title.
 *
 * @example
 * ```html
 * <luminary-layout id="layout-main">
 *   <luminary-header slot="header">...</luminary-header>
 *   <luminary-stack-trace slot="main">...</luminary-stack-trace>
 * </luminary-layout>
 * ```
 */
class LuminaryLayout extends HTMLElement {
    #unsubscribe = null

    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.append(template.content.cloneNode(true))
    }

    connectedCallback() {
        if (window[LUMINARY_NAMESPACE]?.LuminaryStore) {
            this.#unsubscribe = window[LUMINARY_NAMESPACE].LuminaryStore.subscribe(
                `LuminaryLayout:${this.id}`,
                (layoutData) => this.render(layoutData)
            )
        } else {
            console.warn('LuminaryStore not found. Import luminary-store.js or main.js first.')
        }
    }

    disconnectedCallback() {
        this.#unsubscribe?.()
    }

    render(layoutData) {
        if (!layoutData || typeof layoutData !== 'object') {
            return
        }

        this.#updatePageTitle(layoutData.title)
    }

    #updatePageTitle(title) {
        if (title && document.title !== title) {
            document.title = title
        }
    }
}

customElements.define('luminary-layout', LuminaryLayout)
export { LuminaryLayout }
