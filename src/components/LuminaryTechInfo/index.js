import templateHTML from './template.html?raw'

const template = document.createElement('template')
template.innerHTML = templateHTML

class LuminaryTechInfo extends HTMLElement {
    #listEl = null

    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.append(template.content.cloneNode(true))

        this.#listEl = this.shadowRoot.querySelector('.tech-info__list')
    }

    static get observedAttributes() {
        return ['data-tech-info']
    }

    connectedCallback() {
        this.renderTechInfo()
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'data-tech-info') {
            this.renderTechInfo()
        }
    }

    renderTechInfo() {
        const techInfoData = this.getAttribute('data-tech-info')
        if (!techInfoData || !this.#listEl) return

        try {
            const techInfo = JSON.parse(techInfoData)
            this.#listEl.innerHTML = ''

            Object.entries(techInfo).forEach(([label, value]) => {
                const itemEl = this.createTechInfoItem(label, value)
                this.#listEl.appendChild(itemEl)
            })
        } catch (e) {
            console.error('Failed to parse tech info data:', e)
        }
    }

    createTechInfoItem(label, value) {
        const itemEl = document.createElement('div')
        itemEl.className = 'tech-info__item'

        const labelEl = document.createElement('dt')
        labelEl.className = 'tech-info__label'
        labelEl.textContent = label

        const valueEl = document.createElement('dd')
        valueEl.className = 'tech-info__value'
        valueEl.textContent = String(value)

        itemEl.appendChild(labelEl)
        itemEl.appendChild(valueEl)

        return itemEl
    }

    setTechInfo(techInfo) {
        this.setAttribute('data-tech-info', JSON.stringify(techInfo))
    }

    addTechInfoItem(label, value) {
        try {
            const current = JSON.parse(this.getAttribute('data-tech-info') || '{}')
            current[label] = value
            this.setTechInfo(current)
        } catch (e) {
            console.error('Failed to add tech info item:', e)
        }
    }
}

customElements.define('luminary-tech-info', LuminaryTechInfo)
export { LuminaryTechInfo }