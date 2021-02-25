DataDefinition_EDIT
 : 'REFRESH' 'CURSOR'
   {
     parser.suggestKeywords([
           'FUNCTION',
           'TABLE'
          ]);
   }
 ;