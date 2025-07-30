import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    base: './',
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            '@assets': resolve(__dirname, 'src/assets'),
            '@fonts': resolve(__dirname, 'src/assets/fonts'),
            '@css': resolve(__dirname, 'src/assets/css'),
            '@components': resolve(__dirname, 'src/components'),
        }
    },
    build: {
        rollupOptions: {
            input: {
                'main': resolve(__dirname, 'src/main.js'),
                'luminary-store': resolve(__dirname, 'src/LuminaryStore'),
                'luminary-code-line': resolve(__dirname, 'src/components/LuminaryCodeLine'),
                'luminary-exceptions-chain': resolve(__dirname, 'src/components/LuminaryExceptionsChain'),
                'luminary-header': resolve(__dirname, 'src/components/LuminaryHeader'),
                'luminary-icon-radio': resolve(__dirname, 'src/components/LuminaryIconRadio'),
                'luminary-layout': resolve(__dirname, 'src/components/LuminaryLayout'),
                'luminary-stack-frame': resolve(__dirname, 'src/components/LuminaryStackFrame'),
                'luminary-stack-trace': resolve(__dirname, 'src/components/LuminaryStackTrace'),
                'luminary-suggestions': resolve(__dirname, 'src/components/LuminarySuggestions'),
                'luminary-tech-info': resolve(__dirname, 'src/components/LuminaryTechInfo'),
                'luminary-theme-switcher': resolve(__dirname, 'src/components/LuminaryThemeSwitcher'),
                luminary: resolve(__dirname, 'index.html'),
            },
            output: {
                entryFileNames: '[name].js',
                chunkFileNames: 'chunks/[name]-[hash].js',
                assetFileNames: 'assets/[name].[ext]',
            }
        },
        assetsDir: 'assets',
        assetsInlineLimit: 0,
    }
})