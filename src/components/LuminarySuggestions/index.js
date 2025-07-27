import templateHTML from './template.html?raw'

const template = document.createElement('template')
template.innerHTML = templateHTML

class LuminarySuggestions extends HTMLElement {
    #titleEl = null
    #listEl = null

    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.append(template.content.cloneNode(true))

        this.#titleEl = this.shadowRoot.querySelector('.suggestions__title')
        this.#listEl = this.shadowRoot.querySelector('.suggestions__list')
    }

    static get observedAttributes() {
        return ['title', 'data-suggestions']
    }

    connectedCallback() {
        this.#updateTitle()
        this.renderSuggestions()
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'title':
                this.#updateTitle()
                break
            case 'data-suggestions':
                this.renderSuggestions()
                break
        }
    }

    #updateTitle() {
        const title = this.getAttribute('title')
        if (this.#titleEl) {
            this.#titleEl.textContent = title || 'Suggestions'
        }
    }

    renderSuggestions() {
        const suggestionsData = this.getAttribute('data-suggestions')
        if (!suggestionsData || !this.#listEl) {
            this.setAttribute('empty', '')
            return
        }

        try {
            const suggestions = JSON.parse(suggestionsData)

            if (!Array.isArray(suggestions) || suggestions.length === 0) {
                this.setAttribute('empty', '')
                return
            }

            this.removeAttribute('empty')
            this.#listEl.innerHTML = ''

            suggestions.forEach(suggestion => {
                const itemEl = this.createSuggestionItem(suggestion)
                this.#listEl.appendChild(itemEl)
            })
        } catch (e) {
            console.error('Failed to parse suggestions data:', e)
            this.setAttribute('empty', '')
        }
    }

    createSuggestionItem(suggestion) {
        const itemEl = document.createElement('li')
        itemEl.className = 'suggestions__item'

        // Lightbulb icon SVG
        const iconEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        iconEl.setAttribute('class', 'suggestions__icon')
        iconEl.setAttribute('viewBox', '0 0 24 24')
        iconEl.setAttribute('width', '16')
        iconEl.setAttribute('height', '16')
        iconEl.innerHTML = `<path d="M11 18H13V20H11V18ZM12 2C15.3137 2 18 4.68629 18 8C18 10.3846 16.7564 12.4767 14.9389 13.6558C14.9389 13.6558 14 14.4381 14 15V16H10V15C10 13.8954 10.8823 12.9902 11.6558 12.0611C12.4767 11.0759 13 10.0845 13 9C13 8.44772 12.5523 8 12 8S11 8.44772 11 9H9C9 7.34315 10.3431 6 12 6S15 7.34315 15 9C15 10.3846 14.2436 11.5233 13.0611 12.3442C13.0611 12.3442 14 13.5619 14 15V16H10V15C10 14.1046 10.4477 13.6169 11.3442 12.9389C12.5233 12.0564 14 10.9155 14 9C14 8.44772 13.5523 8 13 8S12 8.44772 12 9H10C10 6.79086 11.7909 5 14 5S18 6.79086 18 9C18 11.3846 16.7564 13.4767 14.9389 14.6558C14.9389 14.6558 14 15.4381 14 16V17H10V16C10 14.8954 10.8823 13.9902 11.6558 13.0611C12.4767 12.0759 13 11.0845 13 10C13 9.44772 12.5523 9 12 9S11 9.44772 11 10H9C9 8.34315 10.3431 7 12 7S15 8.34315 15 10C15 11.3846 14.2436 12.5233 13.0611 13.3442C13.0611 13.3442 14 14.5619 14 16V17H10V16C10 15.1046 10.4477 14.6169 11.3442 13.9389C12.5233 13.0564 14 11.9155 14 10C14 9.44772 13.5523 9 13 9S12 9.44772 12 10H10C10 7.79086 11.7909 6 14 6S18 7.79086 18 10C18 12.3846 16.7564 14.4767 14.9389 15.6558C14.9389 15.6558 14 16.4381 14 17V18H10V17C10 15.8954 10.8823 14.9902 11.6558 14.0611C12.4767 13.0759 13 12.0845 13 11C13 10.4477 12.5523 10 12 10S11 10.4477 11 11H9C9 9.34315 10.3431 8 12 8C13.6569 8 15 9.34315 15 11C15 12.3846 14.2436 13.5233 13.0611 14.3442C13.0611 14.3442 14 15.5619 14 17V18H10V17C10 16.1046 10.4477 15.6169 11.3442 14.9389C12.5233 14.0564 14 13.9155 14 12C14 11.4477 13.5523 11 13 11S12 11.4477 12 12H10C10 10.3431 11.3431 9 13 9C14.6569 9 16 10.3431 16 12C16 13.3846 15.2436 14.5233 14.0611 15.3442C14.0611 15.3442 15 16.5619 15 18V19H11V18ZM12 3C8.68629 3 6 5.68629 6 9C6 11.6144 7.60879 13.8428 9.8956 14.7765C10.5937 15.0957 11 15.7978 11 16.5834V18H13V16.5834C13 15.7978 13.4063 15.0957 14.1044 14.7765C16.3912 13.8428 18 11.6144 18 9C18 5.68629 15.3137 3 12 3Z"/>`

        const textEl = document.createElement('span')
        textEl.className = 'suggestions__text'
        textEl.textContent = typeof suggestion === 'string' ? suggestion : suggestion.text || suggestion.message || ''

        itemEl.appendChild(iconEl)
        itemEl.appendChild(textEl)

        return itemEl
    }

    setSuggestions(suggestions) {
        this.setAttribute('data-suggestions', JSON.stringify(suggestions))
    }

    addSuggestion(suggestion) {
        try {
            const current = JSON.parse(this.getAttribute('data-suggestions') || '[]')
            current.push(suggestion)
            this.setSuggestions(current)
        } catch (e) {
            console.error('Failed to add suggestion:', e)
        }
    }

    clearSuggestions() {
        this.setAttribute('data-suggestions', '[]')
    }

    getSuggestionsCount() {
        try {
            const suggestions = JSON.parse(this.getAttribute('data-suggestions') || '[]')
            return suggestions.length
        } catch (e) {
            return 0
        }
    }
}

customElements.define('luminary-suggestions', LuminarySuggestions)
export { LuminarySuggestions }