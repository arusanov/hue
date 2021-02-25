// Licensed to Cloudera, Inc. under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  Cloudera, Inc. licenses this file
// to you under the Apache License, Version 2.0 (the
// 'License'); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import databricksAutocompleteParser from '../databricksAutocompleteParser';
describe('databricksAutocompleteParser.js DROP statements', () => {
  beforeAll(() => {
    databricksAutocompleteParser.yy.parseError = function (msg) {
      throw Error(msg);
    };
  });

  const assertAutoComplete = testDefinition => {
    const debug = false;

    expect(
      databricksAutocompleteParser.parseSql(
        testDefinition.beforeCursor,
        testDefinition.afterCursor,
        debug
      )
    ).toEqualDefinition(testDefinition);
  };

  it('should suggest keywords for "DROP |"', () => {
    assertAutoComplete({
      beforeCursor: 'DROP ',
      afterCursor: '',
      expectedResult: {
        lowerCase: false,
        suggestKeywords: [
          'BLOOMFILTER INDEX',
          'DATABASE',
          'FUNCTION',
          'SCHEMA',
          'TABLE',
          'TEMPORARY FUNCTION',
          'VIEW'
        ]
      }
    });
  });

  it('should follow case for "drop |"', () => {
    assertAutoComplete({
      beforeCursor: 'drop ',
      afterCursor: '',
      containsKeywords: ['DATABASE'],
      expectedResult: {
        lowerCase: true
      }
    });
  });

  describe('DELETE FROM', () => {
    it('should handle "DELETE FROM boo.baa;|"', () => {
      assertAutoComplete({
        beforeCursor: 'DELETE FROM boo.baa;',
        afterCursor: '',
        noErrors: true,
        containsKeywords: ['SELECT'],
        expectedResult: {
          lowerCase: false
        }
      });
    });

    it('should handle "DELETE FROM boo.baa WHERE id < 1 AND bla IN (SELECT * FROM boo);|"', () => {
      assertAutoComplete({
        beforeCursor: 'DELETE FROM boo.baa WHERE id < 1 AND bla IN (SELECT * FROM boo);',
        afterCursor: '',
        noErrors: true,
        containsKeywords: ['SELECT'],
        expectedResult: {
          lowerCase: false
        }
      });
    });

    it('should suggest keywords for "|"', () => {
      assertAutoComplete({
        beforeCursor: '',
        afterCursor: '',
        noErrors: true,
        containsKeywords: ['DELETE', 'DROP'],
        expectedResult: {
          lowerCase: false
        }
      });
    });

    it('should suggest keywords for "DELETE |"', () => {
      assertAutoComplete({
        beforeCursor: 'DELETE ',
        afterCursor: '',
        noErrors: true,
        expectedResult: {
          lowerCase: false,
          suggestKeywords: ['FROM']
        }
      });
    });

    it('should suggest tables for "DELETE FROM |"', () => {
      assertAutoComplete({
        beforeCursor: 'DELETE FROM ',
        afterCursor: '',
        noErrors: true,
        expectedResult: {
          lowerCase: false,
          suggestTables: {},
          suggestDatabases: { appendDot: true }
        }
      });
    });

    it('should suggest tables for "DELETE FROM db.|"', () => {
      assertAutoComplete({
        beforeCursor: 'DELETE FROM db.',
        afterCursor: '',
        noErrors: true,
        expectedResult: {
          lowerCase: false,
          suggestTables: { identifierChain: [{ name: 'db' }] }
        }
      });
    });

    it('should suggest keywords for "DELETE FROM boo.baa |"', () => {
      assertAutoComplete({
        beforeCursor: 'DELETE FROM boo.baa ',
        afterCursor: '',
        noErrors: true,
        expectedResult: {
          lowerCase: false,
          suggestKeywords: ['AS', 'WHERE']
        }
      });
    });

    it('should suggest columns for "DELETE FROM boo.baa WHERE |"', () => {
      assertAutoComplete({
        beforeCursor: 'DELETE FROM boo.baa WHERE ',
        afterCursor: '',
        noErrors: true,
        containsKeywords: ['EXISTS'],
        expectedResult: {
          lowerCase: false,
          suggestFunctions: {},
          suggestColumns: { tables: [{ identifierChain: [{ name: 'boo' }, { name: 'baa' }] }] }
        }
      });
    });

    it('should suggest columns for "DELETE FROM boo.baa WHERE id > |"', () => {
      assertAutoComplete({
        beforeCursor: 'DELETE FROM boo.baa WHERE id > ',
        afterCursor: '',
        noErrors: true,
        containsKeywords: ['EXISTS'],
        expectedResult: {
          lowerCase: false,
          suggestValues: {},
          suggestFunctions: { types: ['COLREF'] },
          colRef: { identifierChain: [{ name: 'boo' }, { name: 'baa' }, { name: 'id' }] },
          suggestColumns: {
            types: ['COLREF'],
            tables: [{ identifierChain: [{ name: 'boo' }, { name: 'baa' }] }]
          }
        }
      });
    });
  });

  describe('DROP DATABASE', () => {
    it('should suggest databases for "DROP DATABASE |"', () => {
      assertAutoComplete({
        beforeCursor: 'DROP DATABASE ',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestDatabases: {},
          suggestKeywords: ['IF EXISTS']
        }
      });
    });

    it('should suggest databases for "DROP SCHEMA |"', () => {
      assertAutoComplete({
        beforeCursor: 'DROP SCHEMA ',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestDatabases: {},
          suggestKeywords: ['IF EXISTS']
        }
      });
    });

    it('should suggest databases for "DROP DATABASE IF EXISTS |"', () => {
      assertAutoComplete({
        beforeCursor: 'DROP DATABASE IF EXISTS ',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestDatabases: {}
        }
      });
    });

    it('should suggest keywords for "DROP DATABASE foo |"', () => {
      assertAutoComplete({
        beforeCursor: 'DROP DATABASE foo ',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestKeywords: ['CASCADE', 'RESTRICT']
        }
      });
    });
  });

  describe('DROP FUNCTION', () => {
    it('should handle "DROP FUNCTION IF EXISTS baa;', () => {
      assertAutoComplete({
        beforeCursor: 'DROP FUNCTION IF EXISTS baa;',
        afterCursor: '',
        containsKeywords: ['SELECT'],
        noErrors: true,
        expectedResult: {
          lowerCase: false
        }
      });
    });

    it('should suggest keywords for "DROP |"', () => {
      assertAutoComplete({
        beforeCursor: 'DROP ',
        afterCursor: '',
        containsKeywords: ['FUNCTION'],
        expectedResult: {
          lowerCase: false
        }
      });
    });

    it('should suggest keywords for "DROP FUNCTION |"', () => {
      assertAutoComplete({
        beforeCursor: 'DROP FUNCTION ',
        afterCursor: '',
        containsKeywords: ['IF EXISTS'],
        expectedResult: {
          lowerCase: false
        }
      });
    });
  });

  describe('DROP BLOOMFILTER INDEX', () => {
    it('should handle "DROP BLOOMFILTER INDEX IF EXISTS baa ON baa.boo;|"', () => {
      assertAutoComplete({
        beforeCursor: 'DROP BLOOMFILTER INDEX IF EXISTS baa ON baa.boo;',
        afterCursor: '',
        noErrors: true,
        containsKeywords: ['SELECT'],
        expectedResult: {
          lowerCase: false
        }
      });
    });

    it('should suggest keywords for "DROP BLOOMFILTER INDEX |"', () => {
      assertAutoComplete({
        beforeCursor: 'DROP BLOOMFILTER INDEX ',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestKeywords: ['IF EXISTS']
        }
      });
    });

    it('should suggest keywords for "DROP BLOOMFILTER INDEX IF |"', () => {
      assertAutoComplete({
        beforeCursor: 'DROP BLOOMFILTER INDEX IF ',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestKeywords: ['EXISTS']
        }
      });
    });

    it('should suggest keywords for "DROP BLOOMFILTER INDEX baa |"', () => {
      assertAutoComplete({
        beforeCursor: 'DROP BLOOMFILTER INDEX baa ',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestKeywords: ['ON']
        }
      });
    });

    it('should suggest tabls for "DROP BLOOMFILTER INDEX baa ON |"', () => {
      assertAutoComplete({
        beforeCursor: 'DROP BLOOMFILTER INDEX baa ON ',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestTables: {},
          suggestDatabases: { appendDot: true }
        }
      });
    });
  });

  describe('DROP TABLE', () => {
    it('should handle "DROP TABLE db.tbl PURGE;"', () => {
      assertAutoComplete({
        beforeCursor: 'DROP TABLE db.tbl PURGE;',
        afterCursor: '',
        containsKeywords: ['SELECT'],
        noErrors: true,
        expectedResult: {
          lowerCase: false
        }
      });
    });

    it('should suggest tables for "DROP TABLE |"', () => {
      assertAutoComplete({
        beforeCursor: 'DROP TABLE ',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestTables: { onlyTables: true },
          suggestKeywords: ['IF EXISTS'],
          suggestDatabases: {
            appendDot: true
          }
        }
      });
    });

    it('should suggest tables for "DROP TABLE db.|"', () => {
      assertAutoComplete({
        beforeCursor: 'DROP TABLE db.',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestTables: { identifierChain: [{ name: 'db' }], onlyTables: true }
        }
      });
    });

    it('should suggest keywords for "DROP TABLE IF |"', () => {
      assertAutoComplete({
        beforeCursor: 'DROP TABLE IF ',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestKeywords: ['EXISTS']
        }
      });
    });

    it('should suggest tables for "DROP TABLE IF EXISTS |"', () => {
      assertAutoComplete({
        beforeCursor: 'DROP TABLE IF EXISTS ',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestTables: { onlyTables: true },
          suggestDatabases: {
            appendDot: true
          }
        }
      });
    });
  });

  describe('DROP TEMPORARY FUNCTION', () => {
    it('should suggest keywords for "DROP TEMPORARY FUNCTION |', () => {
      assertAutoComplete({
        beforeCursor: 'DROP TEMPORARY FUNCTION ',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestKeywords: ['IF EXISTS']
        }
      });
    });

    it('should suggest keywords for "DROP TEMPORARY FUNCTION IF |', () => {
      assertAutoComplete({
        beforeCursor: 'DROP TEMPORARY FUNCTION IF ',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestKeywords: ['EXISTS']
        }
      });
    });
  });

  describe('DROP VIEW', () => {
    it('should handle "DROP VIEW boo;|', () => {
      assertAutoComplete({
        beforeCursor: 'DROP VIEW boo;',
        afterCursor: '',
        containsKeywords: ['SELECT'],
        noErrors: true,
        expectedResult: {
          lowerCase: false
        }
      });
    });

    it('should handle "DROP VIEW IF EXISTS baa.boo;|', () => {
      assertAutoComplete({
        beforeCursor: 'DROP VIEW IF EXISTS baa.boo;',
        afterCursor: '',
        containsKeywords: ['SELECT'],
        noErrors: true,
        expectedResult: {
          lowerCase: false
        }
      });
    });

    it('should suggest views for "DROP VIEW |', () => {
      assertAutoComplete({
        beforeCursor: 'DROP VIEW ',
        afterCursor: '',
        noErrors: true,
        expectedResult: {
          lowerCase: false,
          suggestTables: { onlyViews: true },
          suggestDatabases: { appendDot: true },
          suggestKeywords: ['IF EXISTS']
        }
      });
    });

    it('should suggest keywords for "DROP VIEW IF |', () => {
      assertAutoComplete({
        beforeCursor: 'DROP VIEW IF ',
        afterCursor: '',
        noErrors: true,
        expectedResult: {
          lowerCase: false,
          suggestKeywords: ['EXISTS']
        }
      });
    });

    it('should suggest views for "DROP VIEW boo.|', () => {
      assertAutoComplete({
        beforeCursor: 'DROP VIEW boo.',
        afterCursor: '',
        noErrors: true,
        expectedResult: {
          lowerCase: false,
          suggestTables: { identifierChain: [{ name: 'boo' }], onlyViews: true }
        }
      });
    });
  });
});
