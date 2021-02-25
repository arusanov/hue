DataDefinition
 : Vacuum
 ;

DataDefinition_EDIT
 : Vacuum_EDIT
 ;

Vacuum
 : 'VACUUM' SchemaQualifiedTableIdentifier 
 ;

Vacuum_EDIT
 : 'VACUUM' SchemaQualifiedTableIdentifier 'CURSOR'
 { 
    parser.suggestKeywords(['RETAIN num HOURS']);
 }
 ;