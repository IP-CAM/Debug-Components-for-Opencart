// This mock data simulates the output of the server-side StoreDataTransformer
// and is used for the library's development and demo page (index.html).
export const mockInitialState = {
    // Data for the <luminary-layout> component
    'LuminaryLayout:layout-main': {
        title: 'Error: Undefined variable $user in /app/controller/User.php',
    },

    // Data for the <luminary-header> component
    'LuminaryHeader:header-main': {
        title: 'Error in /app/controller/User.php on line 42',
        message: 'Undefined variable $user',
    },

    // Data for the <luminary-exceptions-chain> component
    'LuminaryExceptionsChain:exceptions-main': {
        title: 'Exception Chain',
        exceptions: [
            {
                class: 'Error',
                message: 'Undefined variable $user',
                file: '/app/controller/User.php',
                line: 42,
            },
            {
                class: 'RuntimeException',
                message: 'Failed to process user request',
                file: '/app/service/Processor.php',
                line: 115,
            },
        ],
    },

    // Data for the <luminary-suggestions> component
    'LuminarySuggestions:suggestions-main': {
        title: 'How to fix this',
        items: [
            {
                icon: '✍️',
                text: 'Variable `$user` was not defined. Check for typos in the name.',
            },
            {
                icon: '📤',
                text: 'Ensure the variable is initialized or passed from the controller.',
            },
        ],
    },

    // Data for the <luminary-tech-info> component
    'LuminaryTechInfo:tech-info-main': {
        'PHP Version': '8.3.4',
        'OpenCart Version': '4.0.2.3',
        'Peak Memory': '12.5 MB / 256M',
        'Request URI': '/index.php?route=account/login',
    },

    // Data for the <luminary-stack-trace> component
    // This is the main nested data structure.
    'LuminaryStackTrace:stack-trace-main': {
        title: 'Stack Trace',
        frames: [
            // Frame 0 (The error frame, should be open by default)
            {
                id: 'frame-0',
                file: '/app/controller/User.php',
                line: 42,
                function: 'process',
                open: true,
                codeLines: [
                    {
                        number: 40,
                        tokens: [{ type: 'whitespace', content: '    ' }, { type: 'keyword', content: 'if' }, { type: 'punctuation', content: ' (' }, { type: 'variable', content: '$this' }, { type: 'punctuation', content: '->' }, { type: 'string-literal', content: 'validate' }, { type: 'punctuation', content: '()) {' }],
                        isError: false,
                        editorUrl: '#',
                    },
                    {
                        number: 41,
                        tokens: [{ type: 'whitespace', content: '        ' }, { type: 'comment', content: '// This is where the error happens' }],
                        isError: false,
                        editorUrl: '#',
                    },
                    {
                        number: 42,
                        tokens: [{ type: 'whitespace', content: '        ' }, { type: 'builtin', content: 'echo' }, { type: 'whitespace', content: ' ' }, { type: 'variable', content: '$user' }, { type: 'punctuation', content: '->' }, { type: 'string-literal', content: 'name' }, { type: 'punctuation', content: ';' }],
                        isError: true,
                        editorUrl: '#',
                    },
                    {
                        number: 43,
                        tokens: [{ type: 'whitespace', content: '    ' }, { type: 'punctuation', content: '}' }],
                        isError: false,
                        editorUrl: '#',
                    },
                ],
            },
            // Frame 1
            {
                id: 'frame-1',
                file: '/system/engine/Action.php',
                line: 79,
                function: 'execute',
                open: false,
                codeLines: [
                    {
                        number: 78,
                        tokens: [{ type: 'whitespace', content: '        ' }, { type: 'variable', content: '$this' }, { type: 'punctuation', content: '->' }, { type: 'string-literal', content: 'output' }, { type: 'whitespace', content: ' ' }, { type: 'punctuation', content: '=' }, { type: 'whitespace', content: ' ' }, { type: 'string-literal', content: 'call_user_func_array' }, { type: 'punctuation', content: '([' }, { type: 'variable', content: '$this' }, { type: 'punctuation', content: '->' }, { type: 'string-literal', content: 'object' }, { type: 'punctuation', content: ', ' }, { type: 'variable', content: '$this' }, { type: 'punctuation', content: '->' }, { type: 'string-literal', content: 'method' }, { type: 'punctuation', content: '], ' }, { type: 'variable', content: '$args' }, { type: 'punctuation', content: ');' }],
                        isError: false,
                        editorUrl: '#',
                    },
                    {
                        number: 79,
                        tokens: [{ type: 'whitespace', content: '    ' }, { type: 'punctuation', content: '}' }, { type: 'whitespace', content: ' ' }, { type: 'control', content: 'catch' }, { type: 'whitespace', content: ' ' }, { type: 'punctuation', content: '(' }, { type: 'string-literal', content: 'Throwable' }, { type: 'whitespace', content: ' ' }, { type: 'variable', content: '$e' }, { type: 'punctuation', content: ') {' }],
                        isError: false,
                        editorUrl: '#',
                    },
                ],
            },
        ],
    },
};