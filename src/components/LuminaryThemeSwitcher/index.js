import templateHTML from './template.html?raw';

const template = document.createElement('template');
template.innerHTML = templateHTML;

class LuminaryThemeSwitcher extends HTMLElement {
    #radioButtons = null;
    #indicator = null;
    #currentTheme = 'auto';
    #THEME_KEY = 'luminary-theme';
    #handleSystemThemeChange = this.#onSystemThemeChange.bind(this);

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(template.content.cloneNode(true));

        this.#applyInitialTheme();
    }

    connectedCallback() {
        this.#cacheDOMElements();
        this.#setupEventListeners();
        this.#initializeComponentUI();
    }

    disconnectedCallback() {
        window.matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', this.#handleSystemThemeChange);
    }

    #applyInitialTheme() {
        try {
            const savedTheme = localStorage.getItem(this.#THEME_KEY);
            const root = document.documentElement;

            if (savedTheme) {
                root.setAttribute('data-theme', savedTheme);
            } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                root.setAttribute('data-theme', 'dark');
            }
        } catch (e) {
            console.error('Failed to apply initial theme.', e);
        }
    }

    #initializeComponentUI() {
        const savedTheme = localStorage.getItem(this.#THEME_KEY);
        this.#currentTheme = savedTheme || 'auto';
        this.#updateRadioStates();
        this.#updateIndicatorPosition();
    }

    #setTheme(theme) {
        this.#currentTheme = theme;
        const root = document.documentElement;

        switch (theme) {
            case 'light':
                root.setAttribute('data-theme', 'light');
                localStorage.setItem(this.#THEME_KEY, 'light');
                break;
            case 'dark':
                root.setAttribute('data-theme', 'dark');
                localStorage.setItem(this.#THEME_KEY, 'dark');
                break;
            case 'auto':
            default:
                root.removeAttribute('data-theme');
                localStorage.removeItem(this.#THEME_KEY);
                break;
        }

        this.#updateRadioStates();
        this.#updateIndicatorPosition();
    }

    #cacheDOMElements() {
        this.#radioButtons = this.shadowRoot.querySelectorAll('luminary-icon-radio');
        this.#indicator = this.shadowRoot.querySelector('.theme-switcher__indicator');
    }

    #updateRadioStates() {
        this.#radioButtons.forEach(radio => {
            const isChecked = radio.getAttribute('value') === this.#currentTheme;

            // Use setAttribute and removeAttribute to control the visual state
            // of the custom element, as it likely relies on the attribute for styling.
            if (isChecked) {
                radio.setAttribute('checked', '');
            } else {
                radio.removeAttribute('checked');
            }
        });
    }

    #updateIndicatorPosition() {
        if (!this.#indicator) return;
        let translateX = '3rem'; // default to 'auto'
        if (this.#currentTheme === 'light') translateX = '0';
        if (this.#currentTheme === 'dark') translateX = '6rem';
        this.#indicator.style.transform = `translateX(${translateX})`;
    }

    #setupEventListeners() {
        this.shadowRoot.addEventListener('change', (e) => {
            if (e.target.tagName === 'LUMINARY-ICON-RADIO' && e.detail.value) {
                this.#setTheme(e.detail.value);
            }
        });

        window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', this.#handleSystemThemeChange);
    }

    #onSystemThemeChange() {
        if (this.#currentTheme === 'auto') {
            console.log('System theme changed. CSS will handle visuals.');
        }
    }
}

customElements.define('luminary-theme-switcher', LuminaryThemeSwitcher);

export { LuminaryThemeSwitcher };