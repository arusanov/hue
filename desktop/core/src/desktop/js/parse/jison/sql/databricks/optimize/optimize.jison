DataDefinition
 : Optimize
 ;

DataDefinition_EDIT
 : Optimize_EDIT
 ;

Optimize
 : 'OPTIMIZE' SchemaQualifiedTableIdentifier OptionalWhereClause OptionalZorderBy ColumnList
 ;


Optimize_EDIT
 :  'OPTIMIZE' SchemaQualifiedTableIdentifier OptionalWhereClause OptionalZorderBy 'CURSOR'
   {
    if (!$4 && !$3) {
       parser.suggestKeywords(['WHERE', 'ZORDER BY']);
     } 
     else if (!$3) {
       parser.suggestKeywords(['WHERE']);
     }
     else if (!$4) {
       parser.suggestKeywords(['ZORDER BY']);
     }
   }
 | 'OPTIMIZE' SchemaQualifiedTableIdentifier OptionalWhereClause OptionalZorderBy_EDIT
 ;

 OptionalZorderBy
 :
 | 'ZORDER' 'BY'
   {
     parser.yy.correlatedSubQuery = false;
   }
 ;

OptionalZorderBy_EDIT
 : 'ZORDER' 'CURSOR'
   {
     parser.suggestKeywords(['BY']);
   }
 ;