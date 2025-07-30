import { LUMINARY_NAMESPACE } from '@/constants.js'

window[LUMINARY_NAMESPACE] = window[LUMINARY_NAMESPACE] || {}

window[LUMINARY_NAMESPACE].initialState = {
    'LuminaryTechInfo:tech-info-main': {
        'PHP Version': '8.2.0',
        'Memory Usage': '128MB',
        'Execution Time': '0.045s',
        'Environment': 'development',
        'Request Method': 'POST',
        'Response Time': '342ms'
    },

    'LuminaryTechInfo:tech-info-secondary': {
        'Database': 'MySQL 8.0',
        'Cache Driver': 'Redis',
        'Queue Driver': 'Database'
    }
}

window.updateTechInfo = function(componentId, newData) {
    if (window[LUMINARY_NAMESPACE].LuminaryStore) {
        const stateKey = `LuminaryTechInfo:${componentId}`

        window[LUMINARY_NAMESPACE].LuminaryStore.state[stateKey] = newData

        console.log(`Updated ${stateKey}:`, newData)
    } else {
        console.error('LuminaryStore not initialized yet')
    }
}

console.log('Mock data initialized for LuminaryStore')
