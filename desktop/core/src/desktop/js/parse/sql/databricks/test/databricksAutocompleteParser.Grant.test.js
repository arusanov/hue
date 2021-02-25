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
describe('hiveAutocompleteParser.js GRANT statements', () => {
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

  describe('GRANT', () => {
    it('should suggest keywords for "|"', () => {
      assertAutoComplete({
        beforeCursor: '',
        afterCursor: '',
        noErrors: true,
        containsKeywords: ['GRANT'],
        expectedResult: {
          lowerCase: false
        }
      });
    });

    it('should suggest keywords for "GRANT |"', () => {
      assertAutoComplete({
        beforeCursor: 'GRANT ',
        afterCursor: '',
        noErrors: true,
        expectedResult: {
          lowerCase: false,
          suggestKeywords: [
           'ALL PRIVILEGES', 'CREATE', 'MODIFY', 'SELECT', 'USAGE'
          ]
        }
      });
    });


    it('should suggest keywords for "GRANT CREATE |"', () => {
      assertAutoComplete({
        beforeCursor: 'GRANT CREATE ',
        afterCursor: '',
        noErrors: true,
        expectedResult: {
          lowerCase: false,
          suggestKeywords: ['ON', 'TO']
        }
      });
    });


    it('should suggest keywords for "GRANT SELECT, CREATE TO |"', () => {
      assertAutoComplete({
        beforeCursor: 'GRANT SELECT, CREATE TO ',
        afterCursor: '',
        noErrors: true,
        expectedResult: {
          lowerCase: false
        }
      });
    });

    it('should suggest keywords for "GRANT SELECT, CREATE ON TABLE baa |"', () => {
      assertAutoComplete({
        beforeCursor: 'GRANT SELECT, CREATE ON TABLE baa ',
        afterCursor: '',
        noErrors: true,
        expectedResult: {
          lowerCase: false,
          suggestKeywords: ['TO']
        }
      });
    });
  });

  describe('REVOKE', () => {
    it('should suggest keywords for "|"', () => {
      assertAutoComplete({
        beforeCursor: '',
        afterCursor: '',
        noErrors: true,
        containsKeywords: ['REVOKE'],
        expectedResult: {
          lowerCase: false
        }
      });
    });

    it('should suggest keywords for "REVOKE |"', () => {
      assertAutoComplete({
        beforeCursor: 'REVOKE ',
        afterCursor: '',
        noErrors: true,
        expectedResult: {
          lowerCase: false,
          suggestKeywords: [
            'ALL PRIVILEGES', 
            'CREATE', 
            'MODIFY', 
            'SELECT', 
            'USAGE'
           ]
        }
      });
    });

    

    it('should suggest tables for "REVOKE CREATE(col1), SELECT ON DATABASE |"', () => {
      assertAutoComplete({
        beforeCursor: 'REVOKE CREATE(col1), SELECT ON DATABASE ',
        afterCursor: '',
        noErrors: true,
        expectedResult: {
          lowerCase: false,
          suggestDatabases: {}
        }
      });
    });

    it('should suggest tables for "REVOKE CREATE(col1), SELECT ON DATABASE db1 |"', () => {
      assertAutoComplete({
        beforeCursor: 'REVOKE CREATE(col1), SELECT ON DATABASE db1 ',
        afterCursor: '',
        noErrors: true,
        expectedResult: {
          lowerCase: false,
          suggestKeywords: ['FROM']
        }
      });
    });


    it('should handle "REVOKE ALL PRIVILEGES FROM boo, baa;|"', () => {
      assertAutoComplete({
        beforeCursor: 'REVOKE ALL PRIVILEGES FROM boo, baa;',
        afterCursor: '',
        noErrors: true,
        containsKeywords: ['SELECT'],
        expectedResult: {
          lowerCase: false
        }
      });
    });
  });

  
    describe('DENY', () => {
      it('should suggest keywords for "|"', () => {
        assertAutoComplete({
          beforeCursor: '',
          afterCursor: '',
          noErrors: true,
          containsKeywords: ['DENY'],
          expectedResult: {
            lowerCase: false
          }
        });
      });
  
      it('should suggest keywords for "DENY |"', () => {
        assertAutoComplete({
          beforeCursor: 'DENY ',
          afterCursor: '',
          noErrors: true,
          expectedResult: {
            lowerCase: false,
            suggestKeywords: [
             'ALL PRIVILEGES', 'CREATE', 'MODIFY', 'SELECT', 'USAGE'
            ]
          }
        });
      });
  
  
      it('should suggest keywords for "DENY CREATE |"', () => {
        assertAutoComplete({
          beforeCursor: 'DENY CREATE ',
          afterCursor: '',
          noErrors: true,
          expectedResult: {
            lowerCase: false,
            suggestKeywords: ['ON', 'TO']
          }
        });
      });
  
  
      it('should suggest keywords for "DENY SELECT, CREATE TO |"', () => {
        assertAutoComplete({
          beforeCursor: 'DENY SELECT, CREATE TO ',
          afterCursor: '',
          noErrors: true,
          expectedResult: {
            lowerCase: false
          }
        });
      });
  
      it('should suggest keywords for "DENY SELECT, CREATE ON TABLE baa |"', () => {
        assertAutoComplete({
          beforeCursor: 'DENY SELECT, CREATE ON TABLE baa ',
          afterCursor: '',
          noErrors: true,
          expectedResult: {
            lowerCase: false,
            suggestKeywords: ['TO']
          }
        });
      });
    });
});
