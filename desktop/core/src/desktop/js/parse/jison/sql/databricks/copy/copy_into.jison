DataDefinition
 : CopyInto
 ;

DataDefinition_EDIT
 : CopyInto_EDIT
 ;

CopyInto
 : 'COPY' 'INTO' SchemaQualifiedTableIdentifier 'FROM' QueryExpression
 ;


CopyInto_EDIT
 : 'COPY' 'CURSOR'
 {
    parser.suggestKeywords(['INTO']);
 }
 ;


 OptionalFiles
 :
 | 'FILES'
 ;

  OptionalFormat
 :
 | 'FILEFORMAT'
 ;


 OptionalPattern
 :
 | 'PATTERN'
 ;

