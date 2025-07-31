import templateHTML from './template.html?raw'
import { isEmptyObject } from '@/helpers.js'
import { LUMINARY_NAMESPACE } from '@/constants.js'

const template = document.createElement('template')
template.innerHTML = templateHTML

/**
 * Displays a stack trace with collapsible frames for detailed error analysis.
 * Provides a structured view of the call stack to help with debugging.
 *
 * @example
 * ```html
 * <luminary-stack-trace id="stack-trace-main"></luminary-stack-trace>
 * ```
 */
class LuminaryStackTrace extends HTMLElement {
    #titleElement = null;
    #containerElement = null;
    #renderTimeout = null
    #unsubscribe = null

    constructor() {
        super()
        this.attachShadow({ mode: 'open' })

        const content = template.content.cloneNode(true)
        this.#titleElement = content.querySelector('.stack-trace__title')
        this.#containerElement = content.querySelector('.stack-trace__frames')
        this.shadowRoot.append(content)
    }

    connectedCallback() {
        if (window[LUMINARY_NAMESPACE]?.LuminaryStore) {
            this.#unsubscribe = window[LUMINARY_NAMESPACE].LuminaryStore.subscribe(
                `LuminaryStackTrace:${this.id}`,
                (value) => this.renderStackTrace(value)
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

    renderStackTrace(data) {
        if (this.#renderTimeout) {
            clearTimeout(this.#renderTimeout)
        }

        this.#renderTimeout = setTimeout(() => {
            this.#performRender(data)
            this.#renderTimeout = null
        }, 0)
    }

    #performRender(data) {
        this.toggleAttribute('empty', !data);

        if (this.#titleElement) {
            this.#titleElement.textContent = data?.title || 'Stack Trace';
        }

        this.#containerElement.innerHTML = '';

        if (!data?.frames || !Array.isArray(data.frames)) {
            return;
        }

        const store = window[LUMINARY_NAMESPACE]?.LuminaryStore;

        if (!store) {
            console.warn('LuminaryStore not found during child rendering.');
            return;
        }

        const fragment = document.createDocumentFragment();

        data.frames.forEach(frameData => {
            const frameEl = document.createElement('luminary-stack-frame');
            frameEl.id = frameData.id;

            store.state[`LuminaryStackFrame:${frameData.id}`] = frameData;

            frameData.codeLines.forEach((lineData, lineIndex) => {
                const lineId = `${frameData.id}-line-${lineIndex}`;
                const lineEl = document.createElement('luminary-code-line');
                lineEl.id = lineId;
                store.state[`LuminaryCodeLine:${lineId}`] = lineData;
                frameEl.appendChild(lineEl);
            });

            fragment.appendChild(frameEl);
        });

        this.#containerElement.appendChild(fragment);
    }
}

customElements.define('luminary-stack-trace', LuminaryStackTrace)
export { LuminaryStackTrace }
