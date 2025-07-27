import templateHTML from './template.html?raw'

const template = document.createElement('template')
template.innerHTML = templateHTML

class LuminaryHeader extends HTMLElement {
    #titleEl = null
    #messageEl = null

    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.append(template.content.cloneNode(true))

        this.#titleEl = this.shadowRoot.querySelector('.error-header__title')
        this.#messageEl = this.shadowRoot.querySelector('.error-header__message')
    }

    static get observedAttributes() {
        return ['title', 'message']
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'title':
                if (this.#titleEl) {
                    this.#titleEl.textContent = newValue || 'Debug'
                }
                break
            case 'message':
                if (this.#messageEl) {
                    this.#messageEl.textContent = newValue || ''
                    // Hide message element if no message
                    this.#messageEl.style.display = newValue ? 'block' : 'none'
                }
                break
        }
    }

    connectedCallback() {
        // Set default values if attributes are present
        this.#titleEl.textContent = this.getAttribute('title') || 'Debug'
        const message = this.getAttribute('message')
        this.#messageEl.textContent = message || ''
        this.#messageEl.style.display = message ? 'block' : 'none'
    }
}

customElements.define('luminary-header', LuminaryHeader)
export { LuminaryHeader }