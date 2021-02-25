DataDefinition
 : ConvertTo
 ;

DataDefinition_EDIT
 : ConvertTo_EDIT
 ;

ConvertTo
 : 'CONVERT' 'TO' 'DELTA' SchemaQualifiedTableIdentifier OptionalNoStatistics OptionalPartitionBy ColumnList
 ;


ConvertTo_EDIT
 : 'CONVERT' 'CURSOR'
 {
     parser.suggestKeywords(['TO DELTA']);
 }
 | 'CONVERT' 'TO' 'DELTA' SchemaQualifiedTableIdentifier OptionalNoStatistics 'CURSOR' 
   {
     if (!$5) {
       parser.suggestKeywords(['NO STATISTICS']);
     }
   }
 | 'CONVERT' 'TO' 'DELTA' SchemaQualifiedTableIdentifier OptionalNoStatistics OptionalPartitionBy_EDIT
 ;

OptionalNoStatistics
 :
 | 'NO' 'STATISTICS'
   {
     parser.yy.correlatedSubQuery = false;
   }
 ;

OptionalNoStatistics_EDIT
 : 'NO' 'CURSOR'
   {
     parser.suggestKeywords(['STATISTICS']);
   }
 ;

