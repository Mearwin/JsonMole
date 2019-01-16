/* MoleJS */
const fs = require('fs');

function parseFile(file) {
    return mole(JSON.parse(fs.readFileSync(file)));
}

function mole(value, depth = 0) {
    const type = typeof value;
    if (value === null) return 'null';
    if (type === 'string'
        || type === 'boolean'
        || type === 'number'
        || type === 'undefined')
        return type;
    if (isObject(value)) {
        return open('{', depth)
            + buildObject(value, depth)
            +  close('}', depth);
    } else if (Array.isArray(value)) {
        let [objects, nonObjects] = value.reduce(([objs, nObjs], cur) => {
            isObject(cur) ? objs.push(cur) : nObjs.push(cur);
            return [objs, nObjs];
        }, [[], []]);

        let content = []
            .concat(uniq(nonObjects.map(v => mole(v, depth + 1))).join(' | ') || [],
                mergeObjects(objects, depth + 1));
        return open('[', depth)
            + content.join(' | ')
            + close(']', depth);
    }

    function mergeObjects(objects, depth) {
        if (objects.length < 1) return [];
        const allExistingsKeys = objects.map(object =>
            Object.entries(object).reduce(
                (acc, [key, value]) => (acc[key] = mole(value, depth + 1)) && acc
                , {})
        ).reduce((acc, cur) =>
            Object.keys(cur).forEach(key => acc[key]
                ? acc[key].push(cur[key])
                : acc[key] = [cur[key]]
            ) || acc, {}
        );
        const objectWithAllProps =
            Object.entries(allExistingsKeys).reduce((acc, [key, value]) =>
                (acc[key] = uniq(value).join(' | ')) && acc, {});

        return open('{', depth)
            + Object.entries(objectWithAllProps)
                .map(([key, value]) => `${key}: ${value}`)
                .join(open(',', depth))
            + close('}', depth);
    }

    function buildObject(value, depth) {
        return Object.entries(value).map(([key, value]) =>
            `${key}: ${mole(value, depth + 1)}`).join(open(',', depth));
    }

    function open(char, depth) {
        return char + newLine(depth + 1);
    }

    function close(char, depth) {
        return newLine(depth) + char;
    }

    function uniq(array) {
        return [...new Set(array)];
    }

    function isObject(v) {
        return typeof v === 'object'
            && !Array.isArray(v)
            && v !== null;
    }

    function newLine(depth) {
        return '\n' + Array(depth + 1).join('    ');
    }
}

module.exports = {
    mole,
    parseFile
};
