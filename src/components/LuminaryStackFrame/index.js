import templateHTML from './template.html?raw'
import { isEmptyObject } from '@/helpers.js'
import { LUMINARY_NAMESPACE } from '@/constants.js'

const template = document.createElement('template')
template.innerHTML = templateHTML

/**
 * Custom element for displaying stack frame
 * @example
 * <luminary-stack-frame id="frame-1"></luminary-stack-frame>
 */
class LuminaryStackFrame extends HTMLElement {
    #details = null
    #fileElement = null
    #functionElement = null
    #renderTimeout = null
    #unsubscribe = null

    constructor() {
        super()
        this.attachShadow({ mode: 'open' })

        const content = template.content.cloneNode(true)

        this.#details = content.querySelector('.error-frame')
        this.#fileElement = content.querySelector('.error-frame__file')
        this.#functionElement = content.querySelector('.error-frame__function')

        this.shadowRoot.append(content)
    }

    connectedCallback() {
        if (window[LUMINARY_NAMESPACE]?.LuminaryStore) {
            this.#unsubscribe = window[LUMINARY_NAMESPACE].LuminaryStore.subscribe(
                `${this.constructor.name}:${this.id}`,
                (value) => this.renderFrame(value)
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

    renderFrame(data) {
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
            this.#clearContent()
            return
        }

        this.removeAttribute('empty')

        this.#updateFrameHeader(data)
        this.#updateOpenState(data.open)
    }

    #clearContent() {
        if (this.#fileElement) {
            this.#fileElement.textContent = ''
        }
        if (this.#functionElement) {
            this.#functionElement.textContent = ''
        }
        if (this.#details) {
            this.#details.removeAttribute('open')
        }
    }

    #updateFrameHeader(data) {
        if (this.#fileElement) {
            const file = data.file || ''
            const line = data.line || ''
            this.#fileElement.textContent = file && line ? `${file}:${line}` : ''
        }

        if (this.#functionElement) {
            const functionName = data.function
            this.#functionElement.textContent = functionName ? `${functionName}()` : ''
        }
    }

    #updateOpenState(isOpen) {
        if (this.#details) {
            if (isOpen) {
                this.#details.setAttribute('open', '')
            } else {
                this.#details.removeAttribute('open')
            }
        }
    }
}

customElements.define('luminary-stack-frame', LuminaryStackFrame)
export { LuminaryStackFrame }
