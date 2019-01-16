const expect = require('chai').expect;
const parseFile = require('../mole').parseFile;

describe('.detectFile(file)', () => {

    it('parse simple json', () => {
        expect(parseFile('./test/examples/simple.json'))
            .to.equal(
                `{
    v1: string,
    v2: number,
    v3: boolean
}`
            );
    });

    it('parse complexe json', () => {
        expect(parseFile('./test/examples/complexe.json'))
            .to.equal(
                `{
    a: [
        [
            boolean | string
        ] | boolean | [
            number | {
                b: boolean,
                c: number,
                d: number
            }
        ]
    ],
    e: number,
    f: boolean,
    g: [
        boolean | number | string | {
            h: string | {
                s: boolean,
                t: [
                    boolean | number | null
                ],
                u: {
                    v: boolean,
                    w: string
                }
            },
            i: boolean,
            j: {
                k: {
                    l: string
                },
                m: {
                    n: number,
                    o: string,
                    p: boolean
                }
            },
            q: boolean,
            x: boolean
        }
    ],
    y: string
}`
            );
    });
});

