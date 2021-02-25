DataDefinition
 : Restore
 ;

DataDefinition_EDIT
 : Restore_EDIT
 ;

Restore
 : 'RESTORE' 'TABLE' SchemaQualifiedTableIdentifier
 ;

Restore_EDIT
 : 'RESTORE' 'CURSOR'
 { 
    parser.suggestKeywords(['TABLE']);
 }
 | 'RESTORE' 'TABLE' SchemaQualifiedTableIdentifier 'CURSOR'
   {
    parser.suggestKeywords(['TO']);
   }
 ;