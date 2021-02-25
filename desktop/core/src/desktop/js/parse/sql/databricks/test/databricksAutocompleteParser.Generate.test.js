import databricksAutocompleteParser from '../databricksAutocompleteParser';
describe('databricksAutocompleteParser.js GENERATE statements', () => {
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

    describe('GENERATE', () => {
        it('should suggest keywords for "|"', () => {
            assertAutoComplete({
                beforeCursor: '',
                afterCursor: '',
                noErrors: true,
                containsKeywords: ['GENERATE'],
                expectedResult: {
                    lowerCase: false
                }
            });
        });

        it('should suggest keywords for "GENERATE foo |"', () => {
            assertAutoComplete({
                beforeCursor: "GENERATE foo ",
                afterCursor: '',
                noErrors: true,
                expectedResult: {
                    lowerCase: false,
                    suggestKeywords: [
                        'FOR TABLE',
                    ]
                }
            });
        });

        it('should suggest keywords for "GENERATE foo FOR |"', () => {
            assertAutoComplete({
                beforeCursor: "GENERATE foo FOR ",
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

    });

    describe('VACUUM', () => {
        it('should suggest keywords for "|"', () => {
            assertAutoComplete({
                beforeCursor: '',
                afterCursor: '',
                noErrors: true,
                containsKeywords: ['VACUUM'],
                expectedResult: {
                    lowerCase: false
                }
            });
        });

    });

    describe('RESTORE', () => {
        it('should suggest keywords for "|"', () => {
            assertAutoComplete({
                beforeCursor: '',
                afterCursor: '',
                noErrors: true,
                containsKeywords: ['RESTORE'],
                expectedResult: {
                    lowerCase: false
                }
            });
        });

        it('should suggest keywords for "RESTORE |"', () => {
            assertAutoComplete({
                beforeCursor: "RESTORE ",
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

    });

    describe('OPTIMIZE', () => {
        it('should suggest keywords for "|"', () => {
            assertAutoComplete({
                beforeCursor: '',
                afterCursor: '',
                noErrors: true,
                containsKeywords: ['OPTIMIZE'],
                expectedResult: {
                    lowerCase: false
                }
            });
        });

        it('should suggest keywords for "OPTIMIZE boo |"', () => {
            assertAutoComplete({
                beforeCursor: 'OPTIMIZE boo ',
                afterCursor: '',
                noErrors: true,
                containsKeywords: ['WHERE', 'ZORDER BY'],
                expectedResult: {
                    lowerCase: false
                }
            });
        });
    });

    describe('COPY', () => {
        it('should suggest keywords for "|"', () => {
            assertAutoComplete({
                beforeCursor: '',
                afterCursor: '',
                noErrors: true,
                containsKeywords: ['COPY'],
                expectedResult: {
                    lowerCase: false
                }
            });
        });

        it('should suggest keywords for "COPY |"', () => {
            assertAutoComplete({
                beforeCursor: 'COPY ',
                afterCursor: '',
                noErrors: true,
                containsKeywords: ['INTO'],
                expectedResult: {
                    lowerCase: false
                }
            });
        });
    });

});