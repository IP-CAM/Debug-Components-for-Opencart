import templateHTML from './template.html?raw';

const template = document.createElement('template');
template.innerHTML = templateHTML;

class LuminaryIconRadio extends HTMLElement {
    // Declare the private field for the internal input element.
    #input = null;

    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(template.content.cloneNode(true));
        this.#input = this.shadowRoot.querySelector('input');
    }

    static get observedAttributes() {
        return ['name', 'value', 'checked', 'disabled', 'variant'];
    }

    connectedCallback() {
        // Set up the event listener once the component is connected to the DOM.
        this.#input.addEventListener('change', (e) => {
            // Dispatch a custom event to notify parent components of the change.
            this.dispatchEvent(new CustomEvent('change', {
                detail: { value: e.target.value, checked: e.target.checked },
                bubbles: true
            }));
        });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'name':
                this.#input.name = newValue;
                break;
            case 'value':
                this.#input.value = newValue;
                break;
            case 'checked':
                // hasAttribute returns a boolean, which is perfect for the .checked property.
                this.#input.checked = this.hasAttribute('checked');
                break;
            case 'disabled':
                this.#input.disabled = this.hasAttribute('disabled');
                break;
            case 'variant':
                // Reset the old variant class if it existed.
                if (oldValue) {
                    this.#input.classList.remove(`theme-switcher__radio--${oldValue}`);
                }

                // Set the new variant class.
                if (newValue) {
                    this.#input.classList.add(`theme-switcher__radio--${newValue}`);
                }
                break;
        }
    }
}

customElements.define('luminary-icon-radio', LuminaryIconRadio);

export { LuminaryIconRadio };