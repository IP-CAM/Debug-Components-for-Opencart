import templateHTML from './template.html?raw'

const template = document.createElement('template')
template.innerHTML = templateHTML

class LuminaryCodeLine extends HTMLElement {
    #lineNumberEl = null
    #editorLinkEl = null
    #contentEl = null

    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.append(template.content.cloneNode(true))

        this.#lineNumberEl = this.shadowRoot.querySelector('.code-line__number')
        this.#editorLinkEl = this.shadowRoot.querySelector('.editor-link')
        this.#contentEl = this.shadowRoot.querySelector('.code-line__content')
    }

    static get observedAttributes() {
        return ['line-number', 'editor-url', 'error', 'data-tokens']
    }

    connectedCallback() {
        this.renderTokens()
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'line-number':
                if (this.#lineNumberEl) {
                    this.#lineNumberEl.textContent = newValue || ''
                }
                break
            case 'editor-url':
                if (this.#editorLinkEl) {
                    this.#editorLinkEl.href = newValue || '#'
                }
                break
            case 'error':
                this.classList.toggle('code-line--error', this.hasAttribute('error'))
                break
            case 'data-tokens':
                this.renderTokens()
                break
        }
    }

    renderTokens() {
        if (!this.#contentEl) return

        const tokensData = this.getAttribute('data-tokens')
        if (!tokensData) return

        try {
            const tokens = JSON.parse(tokensData)
            this.#contentEl.innerHTML = this.buildTokensHtml(tokens)
        } catch (e) {
            console.error('Failed to parse tokens:', e)
        }
    }

    buildTokensHtml(tokens) {
        return tokens.map(token => {
            const escaped = this.escapeHtml(token.content)

            if (token.type === 'whitespace' || token.type === 'punctuation') {
                return escaped
            }

            return `<span class="code-line__token--${token.type}">${escaped}</span>`
        }).join('')
    }

    escapeHtml(text) {
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