import postcss from 'postcss';
import parser from 'postcss-value-parser';
import functionalNotation from './lib/hsl-functional-notation';

function transformHsl(value) {
    return parser(value).walk(node => {
        /* istanbul ignore if */
        if (node.type !== 'function' ||
            node.value !== 'hsl' &&
            node.value !== 'hsla'
        ) {
            return;
        }
        node.value = functionalNotation.legacy(parser.stringify(node));
        node.type = 'word';
    }).toString();
}

module.exports = postcss.plugin('postcss-color-hsl', function () {
    return function (root) {
        root.walkDecls(decl => {
            /* istanbul ignore if */
            if (!decl.value ||
                decl.value.indexOf('hsl(') === -1 &&
                decl.value.indexOf('hsla(') === -1
            ) {
                return;
            }
            decl.value = transformHsl(decl.value);
        });
    };
});
