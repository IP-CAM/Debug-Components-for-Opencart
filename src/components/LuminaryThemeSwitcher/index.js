import templateHTML from './template.html?raw';
import { THEME_STORAGE_KEY } from '@/constants.js';

const template = document.createElement('template');
template.innerHTML = templateHTML;

/**
 * Theme switcher component that manages application color scheme.
 * Handles light, dark, and auto (system) themes with persistence.
 *
 * @example
 * ```html
 * <luminary-theme-switcher></luminary-theme-switcher>
 * ```
 */
class LuminaryThemeSwitcher extends HTMLElement {
    #radioButtons = null;
    #indicator = null;
    #currentTheme = 'auto';
    #handleSystemThemeChange = this.#onSystemThemeChange.bind(this);

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(template.content.cloneNode(true));

        this.#setupColorScheme();
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

    #setupColorScheme() {
        document.documentElement.style.colorScheme = 'light dark';
        this.#syncColorScheme();

        const observer = new MutationObserver(() => {
            this.#syncColorScheme();
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });
    }

    #syncColorScheme() {
        const theme = document.documentElement.getAttribute('data-theme');

        switch (theme) {
            case 'light':
                document.documentElement.style.colorScheme = 'light';
                break;
            case 'dark':
                document.documentElement.style.colorScheme = 'dark';
                break;
            default:
                document.documentElement.style.colorScheme = 'light dark';
        }
    }

    #applyInitialTheme() {
        try {
            const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
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
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
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
                localStorage.setItem(THEME_STORAGE_KEY, 'light');
                break;
            case 'dark':
                root.setAttribute('data-theme', 'dark');
                localStorage.setItem(THEME_STORAGE_KEY, 'dark');
                break;
            case 'auto':
            default:
                root.removeAttribute('data-theme');
                localStorage.removeItem(THEME_STORAGE_KEY);
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
