import templateHTML from './template.html?raw'
import { LUMINARY_NAMESPACE } from '@/constants.js'

const template = document.createElement('template')
template.innerHTML = templateHTML

class LuminaryStackFrame extends HTMLElement {
    #details = null
    #fileEl = null
    #functionEl = null
    #codeLinesEl = null
    #codeLineElements = []
    #unsubscribe = null
    #renderTimeout = null

    constructor() {
        super()
        this.attachShadow({ mode: 'open' })

        const content = template.content.cloneNode(true)

        this.#details = content.querySelector('.error-frame')
        this.#fileEl = content.querySelector('.error-frame__file')
        this.#functionEl = content.querySelector('.error-frame__function')
        this.#codeLinesEl = content.querySelector('.code-lines')

        this.shadowRoot.append(content)
    }

    connectedCallback() {
        this.#codeLineElements = Array.from(this.querySelectorAll('luminary-code-line'))

        if (window[LUMINARY_NAMESPACE]?.LuminaryStore) {
            this.#unsubscribe = window[LUMINARY_NAMESPACE].LuminaryStore.subscribe(
                `${this.constructor.name}:${this.id}`,
                (frameData) => this.render(frameData)
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

    render(frameData) {
        if (this.#renderTimeout) {
            clearTimeout(this.#renderTimeout)
        }

        this.#renderTimeout = setTimeout(() => {
            this.#performRender(frameData)
            this.#renderTimeout = null
        }, 0)
    }

    #performRender(frameData) {
        if (!frameData || typeof frameData !== 'object') {
            this.#clearContent()
            return
        }

        this.#updateFrameHeader(frameData)
        this.#updateOpenState(frameData.open)
        this.#updateCodeLines(frameData.codeLines)
    }

    #clearContent() {
        this.#fileEl.textContent = ''
        this.#functionEl.textContent = ''
        this.#details.removeAttribute('open')
        this.#codeLinesEl.replaceChildren()
    }

    #updateFrameHeader(frameData) {
        const file = frameData.file || ''
        const line = frameData.line || ''
        this.#fileEl.textContent = file && line ? `${file}:${line}` : ''

        const functionName = frameData.function
        this.#functionEl.textContent = functionName ? `${functionName}()` : ''
    }

    #updateOpenState(isOpen) {
        if (isOpen) {
            this.#details.setAttribute('open', '')
        } else {
            this.#details.removeAttribute('open')
        }
    }

    #updateCodeLines(codeLines) {
        console.log('Available code line elements:', this.#codeLineElements.length)

        if (!Array.isArray(codeLines) || codeLines.length === 0) {
            this.#codeLinesEl.replaceChildren()
            return
        }

        const elementsToShow = this.#codeLineElements.slice(0, codeLines.length)
        this.#codeLinesEl.replaceChildren(...elementsToShow)

        codeLines.forEach((lineData, index) => {
            const lineElement = elementsToShow[index]
            if (lineElement?.id) {
                console.log(`Updating line ${lineElement.id}:`, lineData)
                window[LUMINARY_NAMESPACE].LuminaryStore.state[`LuminaryCodeLine:${lineElement.id}`] = lineData
            }
        })
    }
}

customElements.define('luminary-stack-frame', LuminaryStackFrame)
export { LuminaryStackFrame }
