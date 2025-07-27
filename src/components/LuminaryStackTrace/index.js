import templateHTML from './template.html?raw'

const template = document.createElement('template')
template.innerHTML = templateHTML

class LuminaryStackTrace extends HTMLElement {
    #titleEl = null

    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.append(template.content.cloneNode(true))

        this.#titleEl = this.shadowRoot.querySelector('.stack-trace__title')
    }

    static get observedAttributes() {
        return ['title', 'data-frames']
    }

    connectedCallback() {
        this.#updateTitle()
        this.#renderFrames()
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'title':
                this.#updateTitle()
                break
            case 'data-frames':
                this.#renderFrames()
                break
        }
    }

    #updateTitle() {
        const title = this.getAttribute('title')
        if (this.#titleEl) {
            this.#titleEl.textContent = title || 'Stack Trace'
        }
    }

    #renderFrames() {
        const framesData = this.getAttribute('data-frames')
        if (!framesData) return

        try {
            const frames = JSON.parse(framesData)

            // Clear existing frames
            this.innerHTML = ''

            frames.forEach((frameData, index) => {
                const frameEl = document.createElement('luminary-stack-frame')

                frameEl.setAttribute('file', frameData.file || '')
                frameEl.setAttribute('line', frameData.line || '')
                frameEl.setAttribute('function', frameData.function || '')

                if (frameData.codeLines) {
                    frameEl.setAttribute('data-code-lines', JSON.stringify(frameData.codeLines))
                }

                // First frame should be open by default
                if (index === 0) {
                    frameEl.setAttribute('open', '')
                }

                this.appendChild(frameEl)
            })
        } catch (e) {
            console.error('Failed to parse frames data:', e)
        }
    }

    setFrames(frames) {
        this.setAttribute('data-frames', JSON.stringify(frames))
    }

    addFrame(frameData) {
        const frameEl = document.createElement('luminary-stack-frame')

        frameEl.setAttribute('file', frameData.file || '')
        frameEl.setAttribute('line', frameData.line || '')
        frameEl.setAttribute('function', frameData.function || '')

        if (frameData.codeLines) {
            frameEl.setAttribute('data-code-lines', JSON.stringify(frameData.codeLines))
        }

        this.appendChild(frameEl)
    }

    clearFrames() {
        this.innerHTML = ''
    }

    getFramesCount() {
        return this.querySelectorAll('luminary-stack-frame').length
    }
}

customElements.define('luminary-stack-trace', LuminaryStackTrace)
export { LuminaryStackTrace }