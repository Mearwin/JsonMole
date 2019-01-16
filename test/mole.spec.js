const expect = require('chai').expect;
const mole = require('../mole').mole;

describe('.detect()', () => {

    it('parse simple object', () => {
        expect(mole({
            v1: '',
            v2: 3,
            v3: true,
        })).to.equal(
            `{
    v1: string,
    v2: number,
    v3: boolean
}`);
    });

    it('parse nasted objects and arrays', () => {

        const o1 = {
            arr1: ['', 1],
            o11: {
                a: '',
                b: 3,
            },
            v2: true,
        };
        expect(mole(o1)).to.equal(
            `{
    arr1: [
        string | number
    ],
    o11: {
        a: string,
        b: number
    },
    v2: boolean
}`);
    });

    it('parse nasted objects and arrays', () => {
        expect(mole({
            arr1: [{
                v1: 2,
            }, {
                v1: true,
            }, {
                v1: false,
            }],
        })).to.equal(
            `{
    arr1: [
        {
            v1: number | boolean
        }
    ]
}`
        );
    });

    it('parse array containing arrays', () => {
        expect(mole([
            [1, 2],
            [true, false],
        ])).to.equal(
            `[
    [
        number
    ] | [
        boolean
    ]
]`
        );
    });

    it('pasre array containing object', () => {
        expect(mole([
            { v1: true },
            true,
        ])).to.equal(
            `[
    boolean | {
        v1: boolean
    }
]`
        );
    });

    it('parse array containing diffrent object', () => {
        expect(mole({
            v1: true,
            arr1: [
                { v1: true },
                true,
                { v1: 'str', v2: 4 }
            ]
        })).to.equal(
            `{
    v1: boolean,
    arr1: [
        boolean | {
            v1: boolean | string,
            v2: number
        }
    ]
}`
        );
    });

    it('parse null', () => {
        expect(mole(null))
            .to.equal('null');

        expect(mole({ p1: null }))
            .to.equal(
                `{
    p1: null
}`
            );
        expect(mole([{ p1: null }, { p1: 2 }]))
            .to.equal(
                `[
    {
        p1: null | number
    }
]`
            );
    });

    it('parse nested objects', () => {
        expect(mole(
            [{
                v1: 1,
                o1: {
                    o21: { p21: 0.1, p31: null },
                    o22: { p22: 0.2, p32: null },
                    o23: { p23: 0.3, p33: null }
                }
            }]
        )).to.equal(
            `[
    {
        v1: number,
        o1: {
            o21: {
                p21: number,
                p31: null
            },
            o22: {
                p22: number,
                p32: null
            },
            o23: {
                p23: number,
                p33: null
            }
        }
    }
]`
        );
    });

    it('merge objects', () => {
        expect(mole(
            [{
                date: 1514200101292,
                c: {
                    E: {
                        p: 1,
                        o: {
                            b: [
                                { U: 1, A: 0.1 },
                                { U: 2, A: 0.2 },
                                { U: 3, A: 0.3 },
                                { U: '4', A: 0.4 }
                            ]
                        }
                    }
                }
            }]
        )).to.equal(
            `[
    {
        date: number,
        c: {
            E: {
                p: number,
                o: {
                    b: [
                        {
                            U: number | string,
                            A: number
                        }
                    ]
                }
            }
        }
    }
]`
        );
    });
});

