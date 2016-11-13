import fs       from 'fs';
import postcss  from 'postcss';
import plugin   from '../';
import test     from 'ava';

function fixturePath(name) {
    return `fixtures/${name}.css`;
}

function readFixture(name) {
    return fs.readFileSync(fixturePath(name), 'utf8');
}

function testFixture(t, name, pluginOpts = {}, postcssOpts = {}) {
    postcssOpts.from = fixturePath(name);
    const expected = readFixture(`${name}.expected`);
    return postcss([plugin(pluginOpts)]).process(readFixture(name), postcssOpts)
        .then(result => {
            t.deepEqual(result.css, expected);
            t.deepEqual(result.warnings().length, 0);
        });
}

test('Transforms hsl()', t => {
    return testFixture(t, 'hsl');
});

test('Transforms hsl() using new comma-separated syntax', t => {
    return testFixture(t, 'alternative-syntax');
});

test('Actual hsl() is not affected', t => {
    return testFixture(t, 'actual-syntax');
});
