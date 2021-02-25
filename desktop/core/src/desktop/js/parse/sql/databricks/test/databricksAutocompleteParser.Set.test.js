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
describe('databricksAutocompleteParser.js SET statements', () => {
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
      containsKeywords: ['SET', 'RESET'],
      expectedResult: {
        lowerCase: false
      }
    });
  });

    it('should suggest keywords for "SET |"', () => {
      assertAutoComplete({
        beforeCursor: 'SET ',
        afterCursor: '',
        expectedResult: {
          lowerCase: false,
          suggestKeywords: ['TIME ZONE', 'TIME ZONE INTERVAL', 'TIME ZONE LOCAL'],
          suggestSetOptions: true
        }
      });
    });
  });

