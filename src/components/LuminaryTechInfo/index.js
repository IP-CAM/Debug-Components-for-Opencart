import templateHTML from './template.html?raw'
import { LuminaryStore } from '@/LuminaryStore.js'
import { isEmptyObject } from '@/helpers.js'
import { LUMINARY_NAMESPACE } from '@/constants.js';

const template = document.createElement('template')
template.innerHTML = templateHTML

/**
 * Custom element for displaying technical information
 * @example
 * <luminary-tech-info id="tech-info-main"></luminary-tech-info>
 */
class LuminaryTechInfo extends HTMLElement {
    #listElement = null
    #renderTimeout = null
    #unsubscribe = null

    constructor() {
        super()

        this.attachShadow({ mode: 'open' })

        const content = template.content.cloneNode(true)

        this.#listElement = content.querySelector('#tech-info-list')

        this.shadowRoot.append(content)
    }

    connectedCallback() {
        if (window[LUMINARY_NAMESPACE]?.LuminaryStore) {
            this.#unsubscribe = window[LUMINARY_NAMESPACE].LuminaryStore.subscribe(
                `${this.constructor.name}:${this.id}`,
                (value) => this.renderTechInfo(value)
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

    renderTechInfo(techInfo) {
        if (this.#renderTimeout) {
            clearTimeout(this.#renderTimeout)
        }

        this.#renderTimeout = setTimeout(() => {
            this.#performRender(techInfo)
            this.#renderTimeout = null
        }, 0)
    }

    #performRender(techInfo) {
        if (!this.#listElement || isEmptyObject(techInfo)) {
            this.#listElement?.replaceChildren()

            return
        }

        const items = Object.entries(techInfo).map(([label, value]) =>
            this.createTechInfoItem(label, value)
        )

        this.#listElement.replaceChildren(...items)
    }

    createTechInfoItem(label, value) {
        const itemElement = document.createElement('div')
        itemElement.className = 'tech-info__item'

        const labelElement = document.createElement('dt')
        labelElement.className = 'tech-info__label'
        labelElement.textContent = label

        const valueElement = document.createElement('dd')
        valueElement.className = 'tech-info__value'
        valueElement.textContent = String(value)

        itemElement.append(labelElement, valueElement)

        return itemElement
    }
}

customElements.define('luminary-tech-info', LuminaryTechInfo)
export { LuminaryTechInfo }