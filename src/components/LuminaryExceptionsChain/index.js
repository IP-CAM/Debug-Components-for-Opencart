import templateHTML from './template.html?raw'

const template = document.createElement('template')
template.innerHTML = templateHTML

class LuminaryExceptionsChain extends HTMLElement {
    #listEl = null

    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.append(template.content.cloneNode(true))

        this.#listEl = this.shadowRoot.querySelector('.exceptions-chain__list')
    }

    static get observedAttributes() {
        return ['data-exceptions']
    }

    connectedCallback() {
        this.renderExceptions()
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'data-exceptions') {
            this.renderExceptions()
        }
    }

    renderExceptions() {
        const exceptionsData = this.getAttribute('data-exceptions')
        if (!exceptionsData || !this.#listEl) return

        try {
            const exceptions = JSON.parse(exceptionsData)
            this.#listEl.innerHTML = ''

            exceptions.forEach((exception, index) => {
                const itemEl = this.createExceptionItem(exception, index === 0)
                this.#listEl.appendChild(itemEl)
            })
        } catch (e) {
            console.error('Failed to parse exceptions data:', e)
        }
    }

    createExceptionItem(exception, isCurrent = false) {
        const itemEl = document.createElement('li')
        itemEl.className = `exceptions-chain__item${isCurrent ? ' exceptions-chain__item--current' : ''}`

        const classEl = document.createElement('div')
        classEl.className = 'exceptions-chain__class'
        classEl.textContent = exception.class || 'Exception'

        const messageEl = document.createElement('div')
        messageEl.className = 'exceptions-chain__message'
        messageEl.textContent = exception.message || ''

        const locationEl = document.createElement('div')
        locationEl.className = 'exceptions-chain__location'
        locationEl.textContent = `${exception.file || ''}:${exception.line || ''}`

        itemEl.appendChild(classEl)
        itemEl.appendChild(messageEl)
        itemEl.appendChild(locationEl)

        return itemEl
    }

    setExceptions(exceptions) {
        this.setAttribute('data-exceptions', JSON.stringify(exceptions))
    }

    addException(exception) {
        try {
            const current = JSON.parse(this.getAttribute('data-exceptions') || '[]')
            current.push(exception)
            this.setExceptions(current)
        } catch (e) {
            console.error('Failed to add exception:', e)
        }
    }
}

customElements.define('luminary-exceptions-chain', LuminaryExceptionsChain)
export { LuminaryExceptionsChain }