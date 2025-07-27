import templateHTML from './template.html?raw'

const template = document.createElement('template')
template.innerHTML = templateHTML

class LuminaryLayout extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.append(template.content.cloneNode(true))
    }

    static get observedAttributes() {
        return ['title']
    }

    connectedCallback() {
        this.#updatePageTitle()
        this.#setupColorScheme()
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'title') {
            this.#updatePageTitle()
        }
    }

    #updatePageTitle() {
        const title = this.getAttribute('title')
        if (title && document.title !== title) {
            document.title = title
        }
    }

    #setupColorScheme() {
        document.documentElement.style.colorScheme = 'light dark'

        this.#syncColorScheme()

        const observer = new MutationObserver(() => {
            this.#syncColorScheme()
        })

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        })
    }

    #syncColorScheme() {
        const theme = document.documentElement.getAttribute('data-theme')

        switch (theme) {
            case 'light':
                document.documentElement.style.colorScheme = 'light'
                break
            case 'dark':
                document.documentElement.style.colorScheme = 'dark'
                break
            default:
                document.documentElement.style.colorScheme = 'light dark'
        }
    }
}

customElements.define('luminary-layout', LuminaryLayout)
export { LuminaryLayout }