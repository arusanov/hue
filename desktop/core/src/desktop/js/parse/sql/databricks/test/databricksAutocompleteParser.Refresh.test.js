import databricksAutocompleteParser from '../databricksAutocompleteParser';
describe('databricksAutocompleteParser.js REFRESH statements', () => {
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

  describe('REFRESH', () => {
    it('should suggest keywords for "|"', () => {
      assertAutoComplete({
        beforeCursor: '',
        afterCursor: '',
        noErrors: true,
        containsKeywords: ['REFRESH'],
        expectedResult: {
          lowerCase: false
        }
      });
    });

    it('should suggest keywords for "REFRESH |"', () => {
      assertAutoComplete({
        beforeCursor: 'REFRESH ',
        afterCursor: '',
        noErrors: true,
        expectedResult: {
          lowerCase: false,
          suggestKeywords: [
            'FUNCTION',
            'TABLE'
           ]
        }
      });
    });
  });

});