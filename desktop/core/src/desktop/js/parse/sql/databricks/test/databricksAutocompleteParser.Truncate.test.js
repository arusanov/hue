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

  it('should suggest keywords for "|"', () => {
    assertAutoComplete({
      beforeCursor: '',
      afterCursor: '',
      containsKeywords: ['TRUNCATE'],
      expectedResult: {
        lowerCase: false
      }
    });
  });

  it('should handle "TRUNCATE TABLE boo PARTITION (baa=1, boo = \'baa\'); |"', () => {
    assertAutoComplete({
      beforeCursor: "TRUNCATE TABLE boo PARTITION (baa=1, boo = 'baa'); ",
      afterCursor: '',
      containsKeywords: ['SELECT'],
      noErrors: true,
      expectedResult: {
        lowerCase: false
      }
    });
  });

  it('should handle "TRUNCATE boo PARTITION (baa=1, boo = \'baa\'); |"', () => {
    assertAutoComplete({
      beforeCursor: "TRUNCATE boo PARTITION (baa=1, boo = 'baa'); ",
      afterCursor: '',
      containsKeywords: ['SELECT'],
      noErrors: true,
      expectedResult: {
        lowerCase: false
      }
    });
  });

  it('should suggest keywords for "TRUNCATE |"', () => {
    assertAutoComplete({
      beforeCursor: 'TRUNCATE ',
      afterCursor: '',
      expectedResult: {
        lowerCase: false,
        suggestKeywords: ['TABLE'],
        suggestTables: {},
        suggestDatabases: { appendDot: true }
      }
    });
  });

  it('should suggest tables for "TRUNCATE TABLE |"', () => {
    assertAutoComplete({
      beforeCursor: 'TRUNCATE TABLE ',
      afterCursor: '',
      expectedResult: {
        lowerCase: false,
        suggestTables: {},
        suggestDatabases: { appendDot: true }
      }
    });
  });

  it('should suggest keywords for "TRUNCATE TABLE boo |"', () => {
    assertAutoComplete({
      beforeCursor: 'TRUNCATE TABLE boo ',
      afterCursor: '',
      expectedResult: {
        lowerCase: false,
        suggestKeywords: ['PARTITION']
      }
    });
  });

  it('should suggest keywords for "TRUNCATE boo |"', () => {
    assertAutoComplete({
      beforeCursor: 'TRUNCATE boo ',
      afterCursor: '',
      expectedResult: {
        lowerCase: false,
        suggestKeywords: ['PARTITION']
      }
    });
  });
});
