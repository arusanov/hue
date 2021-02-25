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
describe('databricksAutocompleteParser.js SHOW statements', () => {
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

  it('should suggest keywords for "SHOW |"', () => {
    assertAutoComplete({
      beforeCursor: 'SHOW ',
      afterCursor: '',
      expectedResult: {
        lowerCase: false,
        suggestKeywords: [
          'COLUMNS',
          'CREATE TABLE',
          'DATABASES',
          'FORMATTED',
          'PARTITIONS',
          'SCHEMAS',
          'TABLE EXTENDED',
          'TABLES',
          'TBLPROPERTIES',
          'VIEWS'
        ]
      }
    });
  });


  describe('SHOW COLUMNS', () => {
    it('should suggest keywords for "SHOW COLUMNS |"', () => {
      assertAutoComplete({
        beforeCursor: 'SHOW COLUMNS ',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestKeywords: ['FROM', 'IN']
        }
      });
    });

    it('should suggest tables for "SHOW COLUMNS FROM |"', () => {
      assertAutoComplete({
        beforeCursor: 'SHOW COLUMNS FROM ',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestTables: {}
        }
      });
    });

    it('should suggest tables for "SHOW COLUMNS FROM partial|"', () => {
      assertAutoComplete({
        beforeCursor: 'SHOW COLUMNS FROM partial',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestTables: {}
        }
      });
    });

    it('should suggest keywords for "SHOW COLUMNS FROM tableName |"', () => {
      assertAutoComplete({
        beforeCursor: 'SHOW COLUMNS FROM tableName ',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestKeywords: ['FROM', 'IN']
        }
      });
    });

    it('should suggest databases for "SHOW COLUMNS FROM tableName FROM |"', () => {
      assertAutoComplete({
        beforeCursor: 'SHOW COLUMNS FROM tableName FROM ',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestDatabases: {}
        }
      });
    });

    it('should suggest databases for "SHOW COLUMNS FROM tableName FROM partial|"', () => {
      assertAutoComplete({
        beforeCursor: 'SHOW COLUMNS FROM tableName FROM partial',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestDatabases: {}
        }
      });
    });

    it('should suggest databases for "SHOW COLUMNS FROM tableName IN |"', () => {
      assertAutoComplete({
        beforeCursor: 'SHOW COLUMNS FROM tableName IN ',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestDatabases: {}
        }
      });
    });

    it('should suggest databases for "SHOW COLUMNS FROM tableName IN partial|"', () => {
      assertAutoComplete({
        beforeCursor: 'SHOW COLUMNS FROM tableName IN partial',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestDatabases: {}
        }
      });
    });

    it('should suggest tables for "SHOW COLUMNS IN |"', () => {
      assertAutoComplete({
        beforeCursor: 'SHOW COLUMNS IN ',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestTables: {}
        }
      });
    });

    it('should suggest tables for "SHOW COLUMNS IN partial|"', () => {
      assertAutoComplete({
        beforeCursor: 'SHOW COLUMNS IN partial',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestTables: {}
        }
      });
    });

    it('should suggest keywords for "SHOW COLUMNS IN tableName |"', () => {
      assertAutoComplete({
        beforeCursor: 'SHOW COLUMNS IN tableName ',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestKeywords: ['FROM', 'IN']
        }
      });
    });

    it('should suggest databases for "SHOW COLUMNS IN tableName FROM |"', () => {
      assertAutoComplete({
        beforeCursor: 'SHOW COLUMNS IN tableName FROM ',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestDatabases: {}
        }
      });
    });

    it('should suggest databases for "SHOW COLUMNS IN tableName FROM partial|"', () => {
      assertAutoComplete({
        beforeCursor: 'SHOW COLUMNS IN tableName FROM partial',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestDatabases: {}
        }
      });
    });

    it('should suggest databases for "SHOW COLUMNS IN tableName IN |"', () => {
      assertAutoComplete({
        beforeCursor: 'SHOW COLUMNS IN tableName IN ',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestDatabases: {}
        }
      });
    });

    it('should suggest databases for "SHOW COLUMNS IN tableName IN partial|"', () => {
      assertAutoComplete({
        beforeCursor: 'SHOW COLUMNS IN tableName IN partial',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestDatabases: {}
        }
      });
    });
  });

  describe('SHOW CREATE', () => {
    it('should suggest keywords for "SHOW CREATE |"', () => {
      assertAutoComplete({
        beforeCursor: 'SHOW CREATE ',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestKeywords: ['TABLE']
        }
      });
    });

    it('should suggest tables for "SHOW CREATE TABLE |"', () => {
      assertAutoComplete({
        beforeCursor: 'SHOW CREATE TABLE ',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestTables: {},
          suggestDatabases: {
            appendDot: true
          }
        }
      });
    });

    it('should suggest tables for "SHOW CREATE TABLE partial|"', () => {
      assertAutoComplete({
        beforeCursor: 'SHOW CREATE TABLE partial',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestTables: {},
          suggestDatabases: {
            appendDot: true
          }
        }
      });
    });

    it('should suggest tables for "SHOW CREATE TABLE databaseOne.|"', () => {
      assertAutoComplete({
        beforeCursor: 'SHOW CREATE TABLE databaseOne.',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestTables: { identifierChain: [{ name: 'databaseOne' }] }
        }
      });
    });

    it('should suggest tables for "SHOW CREATE TABLE databaseOne.partial|"', () => {
      assertAutoComplete({
        beforeCursor: 'SHOW CREATE TABLE databaseOne.partial',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestTables: { identifierChain: [{ name: 'databaseOne' }] }
        }
      });
    });
  });

  describe('SHOW DATABASES', () => {
    it('should suggest keywords for "SHOW DATABASES |"', () => {
      assertAutoComplete({
        beforeCursor: 'SHOW DATABASES ',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestKeywords: ['LIKE']
        }
      });
    });
  });

 

  describe('SHOW PARTITIONS', () => {
    it('should suggest tables for "SHOW PARTITIONS |"', () => {
      assertAutoComplete({
        beforeCursor: 'SHOW PARTITIONS ',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestTables: {},
          suggestDatabases: {
            appendDot: true
          }
        }
      });
    });

    it('should suggest tables for "SHOW PARTITIONS partial|"', () => {
      assertAutoComplete({
        beforeCursor: 'SHOW PARTITIONS partial',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestTables: {},
          suggestDatabases: {
            appendDot: true
          }
        }
      });
    });

    it('should suggest keywords for "SHOW PARTITIONS foo |"', () => {
      assertAutoComplete({
        beforeCursor: 'SHOW PARTITIONS foo ',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestKeywords: ['PARTITION']
        }
      });
    });
  });

  

  describe('SHOW SCHEMAS', () => {
    it('should suggest keywords for "SHOW SCHEMAS |"', () => {
      assertAutoComplete({
        beforeCursor: 'SHOW SCHEMAS ',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestKeywords: ['LIKE']
        }
      });
    });
  });

  describe('SHOW TABLE', () => {
    it('should suggest keywords for "SHOW TABLE |"', () => {
      assertAutoComplete({
        beforeCursor: 'SHOW TABLE ',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestKeywords: ['EXTENDED']
        }
      });
    });

    it('should suggest keywords for "SHOW TABLE EXTENDED |"', () => {
      assertAutoComplete({
        beforeCursor: 'SHOW TABLE EXTENDED ',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestKeywords: ['FROM', 'IN', 'LIKE']
        }
      });
    });

    it('should suggest databases for "SHOW TABLE EXTENDED FROM |"', () => {
      assertAutoComplete({
        beforeCursor: 'SHOW TABLE EXTENDED FROM ',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestDatabases: {}
        }
      });
    });

    it('should suggest functions for "SHOW TABLE EXTENDED FROM databaseOne LIKE \'f|oo*\' |"', () => {
      assertAutoComplete({
        beforeCursor: "SHOW TABLE EXTENDED FROM databaseOne LIKE 'f|oo*' ",
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestKeywords: ['PARTITION']
        }
      });
    });

    it('should suggest databases for "SHOW TABLE EXTENDED IN |"', () => {
      assertAutoComplete({
        beforeCursor: 'SHOW TABLE EXTENDED IN ',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestDatabases: {}
        }
      });
    });

    it('should suggest functions for "SHOW TABLE EXTENDED IN databaseOne LIKE \'f|oo*\' |"', () => {
      assertAutoComplete({
        beforeCursor: "SHOW TABLE EXTENDED IN databaseOne LIKE 'f|oo*' ",
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestKeywords: ['PARTITION']
        }
      });
    });

    it('should suggest functions for "SHOW TABLE EXTENDED LIKE \'f|oo*\' |"', () => {
      assertAutoComplete({
        beforeCursor: "SHOW TABLE EXTENDED LIKE 'f|oo*' ",
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestKeywords: ['PARTITION']
        }
      });
    });
  });

  describe('SHOW TABLES', () => {
    it('should suggest keywords for "SHOW TABLES |"', () => {
      assertAutoComplete({
        beforeCursor: 'SHOW TABLES ',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestKeywords: ['IN', 'LIKE']
        }
      });
    });

    it('should suggest databases for "SHOW TABLES IN |"', () => {
      assertAutoComplete({
        beforeCursor: 'SHOW TABLES IN ',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestDatabases: {}
        }
      });
    });

    it('should suggest keywords for "SHOW TABLES IN db |"', () => {
      assertAutoComplete({
        beforeCursor: 'SHOW TABLES IN db ',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestKeywords: ['LIKE']
        }
      });
    });
  });

  describe('SHOW TBLPROPERTIES', () => {
    it('should handle "SHOW TBLPROPERTIES boo("foo"); |"', () => {
      assertAutoComplete({
        beforeCursor: 'SHOW TBLPROPERTIES boo("foo"); ',
        afterCursor: '',
        noErrors: true,
        containsKeywords: ['SELECT'],
        expectedResult: {
          lowerCase: false
        }
      });
    });

    it('should suggest tables for "SHOW TBLPROPERTIES |"', () => {
      assertAutoComplete({
        beforeCursor: 'SHOW TBLPROPERTIES ',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestTables: {},
          suggestDatabases: { prependDot: true }
        }
      });
    });

    it('should suggest tables for "SHOW TBLPROPERTIES partial|"', () => {
      assertAutoComplete({
        beforeCursor: 'SHOW TBLPROPERTIES partial',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestTables: {},
          suggestDatabases: { prependDot: true }
        }
      });
    });
  });

  describe('SHOW VIEWS', () => {
    it('should handle "SHOW VIEWS;|"', () => {
      assertAutoComplete({
        beforeCursor: 'SHOW VIEWS;',
        afterCursor: '',
        noErrors: true,
        containsKeywords: ['SELECT'],
        expectedResult: {
          lowerCase: false
        }
      });
    });

    it('should handle "SHOW VIEWS IN boo LIKE \'asdf\';|"', () => {
      assertAutoComplete({
        beforeCursor: "SHOW VIEWS IN boo LIKE 'asdf';",
        afterCursor: '',
        noErrors: true,
        containsKeywords: ['SELECT'],
        expectedResult: {
          lowerCase: false
        }
      });
    });

    it('should suggest keywords for "SHOW VIEWS |"', () => {
      assertAutoComplete({
        beforeCursor: 'SHOW VIEWS ',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestKeywords: ['FROM', 'IN', 'LIKE']
        }
      });
    });

    it('should suggest databases for "SHOW VIEWS IN |"', () => {
      assertAutoComplete({
        beforeCursor: 'SHOW VIEWS IN ',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestDatabases: {}
        }
      });
    });

    it('should suggest databases for "SHOW VIEWS FROM |"', () => {
      assertAutoComplete({
        beforeCursor: 'SHOW VIEWS FROM ',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestDatabases: {}
        }
      });
    });

    it('should suggest keywords for "SHOW VIEWS IN boo |"', () => {
      assertAutoComplete({
        beforeCursor: 'SHOW VIEWS IN boo ',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestKeywords: ['LIKE']
        }
      });
    });
  });
});
