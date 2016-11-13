
function legacyAlpha(alpha) {
    if (alpha.indexOf('%') > -1) {
        alpha = `${alpha.slice(0, -1) / 100}`;
    }
    return alpha.replace(/^0\./, '.');
}

function getColorData(colorFn) {
    const hslSyntaxPlusAltRegex = /(hsl)a?\s*\((\d*\.?\d+(?:deg|grad|rad|turn)?)(?:\s+|(?:\s*,\s*))(\d*\.?\d+\%)(?:\s+|(?:\s*,\s*))(\d*\.?\d+\%)(?:\s*(?:\/|,)\s*(\d*\.?\d+\%?))?\)/g; // eslint-disable-line max-len
    const match = hslSyntaxPlusAltRegex.exec(colorFn);
    console.dir(match);
    if (match === null) return false;
    return {
        fn: match[1],
        h: match[2],
        s: match[3],
        l: match[4],
        alpha: match[5] ? legacyAlpha(match[5]) : false
    };
}

function legacy(colorFn) {
    const colorData = getColorData(colorFn);

    if (!colorData) return colorFn;

    let result = null;
    if (colorData.alpha === false) {
        result =
            colorData.fn + '(' +
                colorData.h + ', ' +
                colorData.s + ', ' +
                colorData.l + ')';
    } else {
        result =
            colorData.fn + 'a(' +
                colorData.h + ', ' +
                colorData.s + ', ' +
                colorData.l + ', ' +
                colorData.alpha + ')';
    }
    return result;
}

export default { legacy };
