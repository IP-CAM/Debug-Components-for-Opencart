import '@css/global.css'
import '@css/fonts.css';

// Import store first
import { LuminaryStore } from './LuminaryStore.js'

// Import components
import { LuminaryCodeLine } from '@components/LuminaryCodeLine'
import { LuminaryExceptionsChain } from '@components/LuminaryExceptionsChain'
import { LuminaryHeader } from '@components/LuminaryHeader'
import { LuminaryIconRadio } from './components/LuminaryIconRadio'
import { LuminaryLayout } from '@components/LuminaryLayout'
import { LuminaryStackFrame } from '@components/LuminaryStackFrame'
import { LuminaryStackTrace } from '@components/LuminaryStackTrace'
import { LuminarySuggestions } from './components/LuminarySuggestions'
import { LuminaryTechInfo } from './components/LuminaryTechInfo'
import { LuminaryThemeSwitcher } from './components/LuminaryThemeSwitcher'

// Export components
export {
    LuminaryStore,
    LuminaryCodeLine,
    LuminaryExceptionsChain,
    LuminaryHeader,
    LuminaryIconRadio,
    LuminaryLayout,
    LuminaryStackFrame,
    LuminaryStackTrace,
    LuminarySuggestions,
    LuminaryTechInfo,
    LuminaryThemeSwitcher,
}

// Auto-register function
// export const register = () =>  {
//     console.log('Luminary components registered:', {
//         'luminary-code-line': !!customElements.get('luminary-code-line'),
//         'luminary-exceptions-chain': !!customElements.get('luminary-exceptions-chain'),
//         'luminary-header': !!customElements.get('luminary-header'),
//         'luminary-icon-radio': !!customElements.get('luminary-icon-radio'),
//         'luminary-layout': !!customElements.get('luminary-layout'),
//         'luminary-stack-frame': !!customElements.get('luminary-stack-frame'),
//         'luminary-stack-trace': !!customElements.get('luminary-stack-trace'),
//         'luminary-suggestions': !!customElements.get('luminary-suggestions'),
//         'luminary-tech-info': !!customElements.get('luminary-tech-info'),
//         'luminary-theme-switcher': !!customElements.get('luminary-theme-switcher'),
//     })
// }

// Auto-register when imported
// if (typeof window !== 'undefined') {
//     register()
// }