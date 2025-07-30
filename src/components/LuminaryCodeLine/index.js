import templateHTML from './template.html?raw'
import { LUMINARY_NAMESPACE } from '@/constants.js'

const template = document.createElement('template')
template.innerHTML = templateHTML

class LuminaryCodeLine extends HTMLElement {
    #lineNumberEl = null
    #editorLinkEl = null
    #contentEl = null
    #unsubscribe = null
    #renderTimeout = null

    constructor() {
        super()
        this.attachShadow({ mode: 'open' })

        const content = template.content.cloneNode(true)

        this.#lineNumberEl = content.querySelector('.code-line__number')
        this.#editorLinkEl = content.querySelector('.editor-link')
        this.#contentEl = content.querySelector('.code-line__content')

        this.shadowRoot.append(content)
    }

    connectedCallback() {
        if (window[LUMINARY_NAMESPACE]?.LuminaryStore) {
            this.#unsubscribe = window[LUMINARY_NAMESPACE].LuminaryStore.subscribe(
                `${this.constructor.name}:${this.id}`,
                (lineData) => this.render(lineData)
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

    render(lineData) {
        if (this.#renderTimeout) {
            clearTimeout(this.#renderTimeout)
        }

        this.#renderTimeout = setTimeout(() => {
            this.#performRender(lineData)
            this.#renderTimeout = null
        }, 0)
    }

    #performRender(lineData) {
        if (!lineData || typeof lineData !== 'object') {
            this.#clearContent()
            return
        }

        this.#updateLineNumber(lineData.number)
        this.#updateEditorLink(lineData.editorUrl)
        this.#updateErrorState(lineData.isError)
        this.#updateTokens(lineData.tokens)
    }

    #clearContent() {
        this.#lineNumberEl.textContent = ''
        this.#editorLinkEl.href = '#'
        this.#contentEl.innerHTML = ''
        this.classList.remove('code-line--error')
    }

    #updateLineNumber(lineNumber) {
        this.#lineNumberEl.textContent = lineNumber || ''
    }

    #updateEditorLink(editorUrl) {
        this.#editorLinkEl.href = editorUrl || '#'
    }

    #updateErrorState(isError) {
        this.classList.toggle('code-line--error', !!isError)
    }

    #updateTokens(tokens) {
        if (!Array.isArray(tokens)) {
            this.#contentEl.innerHTML = ''
            return
        }

        this.#contentEl.innerHTML = this.#buildTokensHtml(tokens)
    }

    #buildTokensHtml(tokens) {
        return tokens.map(token => {
            const escaped = this.#escapeHtml(token.content)

            if (token.type === 'whitespace' || token.type === 'punctuation') {
                return escaped
            }

            return `<span class="code-line__token--${token.type}">${escaped}</span>`
        }).join('')
    }

    #escapeHtml(text) {
        return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
    }
}

customElements.define('luminary-code-line', LuminaryCodeLine)
export { LuminaryCodeLine }
