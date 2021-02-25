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

  describe('CACHE', () => {
    it('should suggest keywords for "|"', () => {
      assertAutoComplete({
        beforeCursor: '',
        afterCursor: '',
        noErrors: true,
        containsKeywords: ['CACHE'],
        expectedResult: {
          lowerCase: false
        }
      });
    });

    it('should suggest keywords for "CACHE |"', () => {
      assertAutoComplete({
        beforeCursor: 'CACHE ',
        afterCursor: '',
        noErrors: true,
        expectedResult: {
          lowerCase: false,
          suggestKeywords: [
            'LAZY',
            'SELECT',
            'TABLE'
           ]
        }
      });
    });

    it('should suggest keywords for "CACHE LAZY |"', () => {
      assertAutoComplete({
        beforeCursor: 'CACHE LAZY ',
        afterCursor: '',
        noErrors: true,
        expectedResult: {
          lowerCase: false,
          suggestKeywords: [
            'TABLE',
           ]
        }
      });
    });

    it('should suggest keywords for "CACHE SELECT boo |"', () => {
      assertAutoComplete({
        beforeCursor: 'CACHE SELECT boo ',
        afterCursor: '',
        noErrors: true,
        expectedResult: {
          lowerCase: false,
          suggestKeywords: [
            'FROM',
           ]
        }
      });
    });

  });

  describe('CLEAR', () => {
    it('should suggest keywords for "|"', () => {
      assertAutoComplete({
        beforeCursor: '',
        afterCursor: '',
        noErrors: true,
        containsKeywords: ['CLEAR'],
        expectedResult: {
          lowerCase: false
        }
      });
    });

    it('should suggest keywords for "CLEAR |"', () => {
      assertAutoComplete({
        beforeCursor: 'CLEAR ',
        afterCursor: '',
        noErrors: true,
        expectedResult: {
          lowerCase: false,
          suggestKeywords: [
            'CACHE'
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
        containsKeywords: ['UNCACHE'],
        expectedResult: {
          lowerCase: false
        }
      });
    });

    it('should suggest keywords for "UNCACHE |"', () => {
      assertAutoComplete({
        beforeCursor: 'UNCACHE ',
        afterCursor: '',
        noErrors: true,
        expectedResult: {
          lowerCase: false,
          suggestKeywords: [
            'TABLE'
           ]
        }
      });
    });

    it('should suggest keywords for "UNCACHE TABLE |"', () => {
      assertAutoComplete({
        beforeCursor: 'UNCACHE TABLE ',
        afterCursor: '',
        noErrors: true,
        expectedResult: {
          lowerCase: false,
          suggestKeywords: [
            'IF EXISTS'
           ]
        }
      });
    });

  });

});