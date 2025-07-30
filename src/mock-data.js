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
    },

    'LuminarySuggestions:suggestions-main': {
        title: 'How to fix this',
        items: [
            'Check if the email field is properly validated before processing',
            'Ensure the request contains valid email data',
            'Add null checks in the UserValidator class'
        ]
    },

    'LuminaryExceptionsChain:exceptions-main': {
        title: 'Exception Chain',
        exceptions: [
            {
                class: 'InvalidArgumentException',
                message: 'User email cannot be null or empty',
                file: '/var/www/app/src/Validators/UserValidator.php',
                line: 28
            },
            {
                class: 'ValidationException',
                message: 'User data validation failed',
                file: '/var/www/app/src/Services/UserService.php',
                line: 42
            }
        ]
    },

    'LuminaryStackFrame:frame-1': {
        file: '/var/www/app/src/Validators/UserValidator.php',
        line: 28,
        function: 'validateEmail',
        open: true,
        codeLines: [
            {
                number: 25,
                isError: false,
                editorUrl: 'phpstorm://open?file=/var/www/app/src/Validators/UserValidator.php&line=25',
                tokens: [
                    { type: 'whitespace', content: '    ' },
                    { type: 'keyword', content: 'public' },
                    { type: 'whitespace', content: ' ' },
                    { type: 'keyword', content: 'function' },
                    { type: 'whitespace', content: ' ' },
                    { type: 'string-literal', content: 'validateEmail' },
                    { type: 'punctuation', content: '(' },
                    { type: 'punctuation', content: '?' },
                    { type: 'string-literal', content: 'string' },
                    { type: 'whitespace', content: ' ' },
                    { type: 'variable', content: '$email' },
                    { type: 'punctuation', content: ')' },
                    { type: 'punctuation', content: ':' },
                    { type: 'whitespace', content: ' ' },
                    { type: 'string-literal', content: 'bool' }
                ]
            },
            {
                number: 26,
                isError: false,
                editorUrl: 'phpstorm://open?file=/var/www/app/src/Validators/UserValidator.php&line=26',
                tokens: [
                    { type: 'whitespace', content: '    ' },
                    { type: 'punctuation', content: '{' }
                ]
            },
            {
                number: 27,
                isError: false,
                editorUrl: 'phpstorm://open?file=/var/www/app/src/Validators/UserValidator.php&line=27',
                tokens: [
                    { type: 'whitespace', content: '        ' },
                    { type: 'control', content: 'if' },
                    { type: 'whitespace', content: ' ' },
                    { type: 'punctuation', content: '(' },
                    { type: 'builtin', content: 'empty' },
                    { type: 'punctuation', content: '(' },
                    { type: 'variable', content: '$email' },
                    { type: 'punctuation', content: ')' },
                    { type: 'punctuation', content: ')' },
                    { type: 'whitespace', content: ' ' },
                    { type: 'punctuation', content: '{' }
                ]
            },
            {
                number: 28,
                isError: true,
                editorUrl: 'phpstorm://open?file=/var/www/app/src/Validators/UserValidator.php&line=28',
                tokens: [
                    { type: 'whitespace', content: '            ' },
                    { type: 'control', content: 'throw' },
                    { type: 'whitespace', content: ' ' },
                    { type: 'keyword', content: 'new' },
                    { type: 'whitespace', content: ' ' },
                    { type: 'string-literal', content: 'InvalidArgumentException' },
                    { type: 'punctuation', content: '(' },
                    { type: 'string', content: '"User email cannot be null or empty"' },
                    { type: 'punctuation', content: ')' },
                    { type: 'punctuation', content: ';' }
                ]
            },
            {
                number: 29,
                isError: false,
                editorUrl: 'phpstorm://open?file=/var/www/app/src/Validators/UserValidator.php&line=29',
                tokens: [
                    { type: 'whitespace', content: '        ' },
                    { type: 'punctuation', content: '}' }
                ]
            },
            {
                number: 30,
                isError: false,
                editorUrl: 'phpstorm://open?file=/var/www/app/src/Validators/UserValidator.php&line=30',
                tokens: []
            },
            {
                number: 31,
                isError: false,
                editorUrl: 'phpstorm://open?file=/var/www/app/src/Validators/UserValidator.php&line=31',
                tokens: [
                    { type: 'whitespace', content: '        ' },
                    { type: 'control', content: 'return' },
                    { type: 'whitespace', content: ' ' },
                    { type: 'builtin', content: 'filter_var' },
                    { type: 'punctuation', content: '(' },
                    { type: 'variable', content: '$email' },
                    { type: 'punctuation', content: ',' },
                    { type: 'whitespace', content: ' ' },
                    { type: 'literal', content: 'FILTER_VALIDATE_EMAIL' },
                    { type: 'punctuation', content: ')' },
                    { type: 'whitespace', content: ' ' },
                    { type: 'punctuation', content: '!' },
                    { type: 'punctuation', content: '=' },
                    { type: 'punctuation', content: '=' },
                    { type: 'whitespace', content: ' ' },
                    { type: 'literal', content: 'false' },
                    { type: 'punctuation', content: ';' }
                ]
            }
        ]
    },

    'LuminaryStackFrame:frame-2': {
        file: '/var/www/app/src/Services/UserService.php',
        line: 42,
        function: 'createUser',
        open: false,
        codeLines: [
            {
                number: 40,
                isError: false,
                editorUrl: 'phpstorm://open?file=/var/www/app/src/Services/UserService.php&line=40',
                tokens: [
                    { type: 'whitespace', content: '        ' },
                    { type: 'comment', content: '// Validate user data before saving' }
                ]
            },
            {
                number: 41,
                isError: false,
                editorUrl: 'phpstorm://open?file=/var/www/app/src/Services/UserService.php&line=41',
                tokens: [
                    { type: 'whitespace', content: '        ' },
                    { type: 'variable', content: '$validator' },
                    { type: 'whitespace', content: ' ' },
                    { type: 'punctuation', content: '=' },
                    { type: 'whitespace', content: ' ' },
                    { type: 'keyword', content: 'new' },
                    { type: 'whitespace', content: ' ' },
                    { type: 'string-literal', content: 'UserValidator' },
                    { type: 'punctuation', content: '(' },
                    { type: 'punctuation', content: ')' },
                    { type: 'punctuation', content: ';' }
                ]
            },
            {
                number: 42,
                isError: true,
                editorUrl: 'phpstorm://open?file=/var/www/app/src/Services/UserService.php&line=42',
                tokens: [
                    { type: 'whitespace', content: '        ' },
                    { type: 'variable', content: '$validator' },
                    { type: 'punctuation', content: '-' },
                    { type: 'punctuation', content: '>' },
                    { type: 'string-literal', content: 'validateEmail' },
                    { type: 'punctuation', content: '(' },
                    { type: 'variable', content: '$userData' },
                    { type: 'punctuation', content: '[' },
                    { type: 'string', content: '"email"' },
                    { type: 'punctuation', content: ']' },
                    { type: 'whitespace', content: ' ' },
                    { type: 'punctuation', content: '?' },
                    { type: 'punctuation', content: '?' },
                    { type: 'whitespace', content: ' ' },
                    { type: 'literal', content: 'null' },
                    { type: 'punctuation', content: ')' },
                    { type: 'punctuation', content: ';' }
                ]
            },
            {
                number: 43,
                isError: false,
                editorUrl: 'phpstorm://open?file=/var/www/app/src/Services/UserService.php&line=43',
                tokens: []
            },
            {
                number: 44,
                isError: false,
                editorUrl: 'phpstorm://open?file=/var/www/app/src/Services/UserService.php&line=44',
                tokens: [
                    { type: 'whitespace', content: '        ' },
                    { type: 'comment', content: '// Create new user instance' }
                ]
            }
        ]
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

window.updateSuggestions = function(componentId, newData) {
    if (window[LUMINARY_NAMESPACE].LuminaryStore) {
        const stateKey = `LuminarySuggestions:${componentId}`
        window[LUMINARY_NAMESPACE].LuminaryStore.state[stateKey] = newData
        console.log(`Updated ${stateKey}:`, newData)
    } else {
        console.error('LuminaryStore not initialized yet')
    }
}

window.updateExceptionsChain = function(componentId, newData) {
    if (window[LUMINARY_NAMESPACE].LuminaryStore) {
        const stateKey = `LuminaryExceptionsChain:${componentId}`
        window[LUMINARY_NAMESPACE].LuminaryStore.state[stateKey] = newData
        console.log(`Updated ${stateKey}:`, newData)
    } else {
        console.error('LuminaryStore not initialized yet')
    }
}

window.updateStackFrame = function(frameId, newData) {
    if (window[LUMINARY_NAMESPACE].LuminaryStore) {
        const stateKey = `LuminaryStackFrame:${frameId}`

        window[LUMINARY_NAMESPACE].LuminaryStore.state[stateKey] = newData

        console.log(`Updated ${stateKey}:`, newData)
    } else {
        console.error('LuminaryStore not initialized yet')
    }
}

window.toggleStackFrame = function(frameId) {
    if (window[LUMINARY_NAMESPACE].LuminaryStore) {
        const stateKey = `LuminaryStackFrame:${frameId}`
        const currentData = window[LUMINARY_NAMESPACE].LuminaryStore.get(stateKey)

        if (currentData) {
            const newData = { ...currentData, open: !currentData.open }
            window[LUMINARY_NAMESPACE].LuminaryStore.state[stateKey] = newData
            console.log(`Toggled ${frameId} open state to:`, newData.open)
        }
    } else {
        console.error('LuminaryStore not initialized yet')
    }
}

console.log('Mock data initialized for LuminaryStore')
