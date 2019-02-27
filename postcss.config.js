const pxtoviewport = require('postcss-px-to-viewport')
module.exports = {
    plugins: [
        // require('postcss-write-svg')({ utf8: false }),
        require('postcss-aspect-ratio-mini')(),
        pxtoviewport({
            viewportWidth: 750,
            viewportHeight: 1334,
            unitPrecision: 3,
            viewportUnit: 'vw',
            selectorBlackList: [],
            minPixelValue: 1,
            mediaQuery: false
        })
    ]
};