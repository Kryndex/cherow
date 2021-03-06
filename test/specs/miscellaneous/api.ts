import { parseScript, parseModule, parse } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Miscellaneous - API', () => {

    it('should not understand JSX syntax by default (sloppy mode)', () => {
        expect(() => {
            parseScript('<head/>');
        }).to.throw();
    });

    it('should not understand JSX syntax by default (module code)', () => {
        expect(() => {
            parseModule('<head/>');
        }).to.throw();
    });

    it('should not understand JSX syntax by default (legacy)', () => {
        expect(() => {
            parse('<head/>');
        }).to.throw();
    });

    it('should parse one string parameter', () => {
        expect(parseScript(`function f(){}`, {
            ranges: true,
            locations: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 14,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 14
              }
            },
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 14,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 14
                  }
                },
                "id": {
                  "type": "Identifier",
                  "start": 9,
                  "end": 10,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 9
                    },
                    "end": {
                      "line": 1,
                      "column": 10
                    }
                  },
                  "name": "f"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 12,
                  "end": 14,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 12
                    },
                    "end": {
                      "line": 1,
                      "column": 14
                    }
                  },
                  "body": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should accept two parameters (source and parsing options)', () => {
        const options: any = { range: false };
        expect(parseScript('var x', options)).to.eql({
              "body": [
                {
                  "declarations": [
                    {
                      "id": {
                        "name": "x",
                        "type": "Identifier",
                      },
                      "init": null,
                      "type": "VariableDeclarator"
                    },
                  ],
                  "kind": "var",
                  "type": "VariableDeclaration"
                }
              ],
             "sourceType": "script",
              "type": "Program",
            });
    });

    it('should accept two parameters (source and parsing options) (legacy)', () => {
        const options: any = { range: false };
        expect(parse('var x', options)).to.eql({
              "body": [
                {
                  "declarations": [
                    {
                      "id": {
                        "name": "x",
                        "type": "Identifier",
                      },
                      "init": null,
                      "type": "VariableDeclarator"
                    },
                  ],
                  "kind": "var",
                  "type": "VariableDeclaration"
                }
              ],
             "sourceType": "script",
              "type": "Program",
            });
    });

    it('should parse module code', () => {
        expect(parseModule(`a = 1;`, {
            ranges: true,
            raw: true
        })).to.eql({
              "body": [
                {
                  "end": 6,
                  "expression": {
                    "end": 5,
                    "left": {
                     "end": 1,
                      "name": "a",
                      "start": 0,
                      "type": "Identifier",
                    },
                    "operator": "=",
                    "right": {
                      "end": 5,
                      "raw": "1",
                      "start": 4,
                      "type": "Literal",
                      "value": 1,
                    },
                   "start": 0,
                    "type": "AssignmentExpression",
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
                },
              ],
              "end": 6,
              "sourceType": "module",
              "start": 0,
              "type": "Program",
            });
    });

    it('should parse module code with "sourceType" option', () => {
        expect(parse(`a = 1;`, {
            ranges: true,
            raw: true,
            sourceType: 'module'
        })).to.eql({
              "body": [
                {
                  "end": 6,
                  "expression": {
                    "end": 5,
                    "left": {
                     "end": 1,
                      "name": "a",
                      "start": 0,
                      "type": "Identifier",
                    },
                    "operator": "=",
                    "right": {
                      "end": 5,
                      "raw": "1",
                      "start": 4,
                      "type": "Literal",
                      "value": 1,
                    },
                   "start": 0,
                    "type": "AssignmentExpression",
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
                },
              ],
              "end": 6,
              "sourceType": "module",
              "start": 0,
              "type": "Program",
            });
    });
});