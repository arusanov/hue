import databricksAutocompleteParser from '../databricksAutocompleteParser';
describe('databricksAutocompleteParser.js GRANT statements', () => {
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

  describe('ADD', () => {
    it('should suggest keywords for "|"', () => {
      assertAutoComplete({
        beforeCursor: '',
        afterCursor: '',
        noErrors: true,
        containsKeywords: ['ADD'],
        expectedResult: {
          lowerCase: false
        }
      });
    });

    it('should suggest keywords for "ADD |"', () => {
      assertAutoComplete({
        beforeCursor: 'ADD ',
        afterCursor: '',
        noErrors: true,
        expectedResult: {
          lowerCase: false,
          suggestKeywords: [
            'FILE',
            'JAR'
           ]
        }
      });
    });
  });


  describe('LIST', () => {
    it('should suggest keywords for "|"', () => {
      assertAutoComplete({
        beforeCursor: '',
        afterCursor: '',
        noErrors: true,
        containsKeywords: ['LIST'],
        expectedResult: {
          lowerCase: false
        }
      });
    });

    it('should suggest keywords for "LIST |"', () => {
      assertAutoComplete({
        beforeCursor: 'LIST ',
        afterCursor: '',
        noErrors: true,
        expectedResult: {
          lowerCase: false,
          suggestKeywords: [
            'FILE',
            'JAR'
           ]
        }
      });
    });
  });

});