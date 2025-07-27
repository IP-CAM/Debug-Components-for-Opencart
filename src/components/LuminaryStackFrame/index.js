import templateHTML from './template.html?raw'

const template = document.createElement('template')
template.innerHTML = templateHTML

class LuminaryStackFrame extends HTMLElement {
    #details = null
    #fileEl = null
    #functionEl = null
    #codeLinesEl = null

    constructor() {
        super()
        this.attachShadow({ mode: 'open', delegatesFocus: true })
        this.shadowRoot.append(template.content.cloneNode(true))

        this.#details = this.shadowRoot.querySelector('.error-frame')
        this.#fileEl = this.shadowRoot.querySelector('.error-frame__file')
        this.#functionEl = this.shadowRoot.querySelector('.error-frame__function')
        this.#codeLinesEl = this.shadowRoot.querySelector('.code-lines')
    }

    static get observedAttributes() {
        return ['file', 'line', 'function', 'open', 'data-code-lines']
    }

    connectedCallback() {
        this.renderCodeLines()
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'file':
            case 'line':
                const file = this.getAttribute('file') || ''
                const line = this.getAttribute('line') || ''
                this.#fileEl.textContent = `${file}:${line}`
                break
            case 'function':
                this.#functionEl.textContent = newValue ? `${newValue}()` : ''
                break
            case 'open':
                if (this.hasAttribute('open')) {
                    this.#details.setAttribute('open', '')
                } else {
                    this.#details.removeAttribute('open')
                }
                break
            case 'data-code-lines':
                this.renderCodeLines()
                break
        }
    }

    renderCodeLines() {
        const codeLinesData = this.getAttribute('data-code-lines')
        if (!codeLinesData) return

        try {
            const lines = JSON.parse(codeLinesData)
            this.#codeLinesEl.innerHTML = ''

            lines.forEach(lineData => {
                const lineElement = document.createElement('luminary-code-line')
                lineElement.setAttribute('line-number', lineData.number)
                lineElement.setAttribute('editor-url', lineData.editorUrl)

                lineElement.setAttribute('data-tokens', JSON.stringify(lineData.tokens))

                if (lineData.isError) {
                    lineElement.setAttribute('error', '')
                }

                this.#codeLinesEl.appendChild(lineElement)
            })
        } catch (e) {
            console.error('Failed to parse code lines data:', e)
        }
    }
}

customElements.define('luminary-stack-frame', LuminaryStackFrame)
export { LuminaryStackFrame }