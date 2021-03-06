# JsonMole
### Json parsing

Once installed:

``` bash 
$ mole test/examples/simple.json
{
    v1: string,
    v2: number,
    v3: boolean
} 
``` 
given:
``` json
{
    "v1": "str",
    "v2": 3,
    "v3": true
}
```
Or
``` bash
$ mole test/examples/complexe.json
{
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
}
```
given:
```json
{
    "a": [
     [
      true,
      "stra"
     ],
     true,
     [
      6.1,
      {
       "b": false,
       "c": 10,
       "d": 10
      }
     ],
     true
    ],
    "e": -3.8,
    "f": true,
    "g": [
     {
      "h": "strh",
      "i": true,
      "j": {
       "k": {
        "l": "strl"
       },
       "m": {
        "n": -1,
        "o": "stro",
        "p": false
       }
      },
      "q": true
     },
     {
      "h": {
       "s": true,
       "t": [
        true,
        -6,
        null
       ],
       "u": {
        "v": true,
        "w": "strw"
       }
      },
      "x": true
     },
     false,
     -8,
     "strg"
    ],
    "y": "stry"
   }
```
