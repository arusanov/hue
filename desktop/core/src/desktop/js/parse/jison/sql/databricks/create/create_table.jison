// Licensed to Cloudera, Inc. under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  Cloudera, Inc. licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

DataDefinition
 : CreateTable
 ;

DataDefinition_EDIT
 : CreateTable_EDIT
 ;

CreateTable
 : 'CREATE' OptionalTemporary OptionalTransactional OptionalExternal 'TABLE' OptionalIfNotExists TableDefinitionRightPart
 ;

CreateTable_EDIT
 : 'CREATE' OptionalTemporary OptionalTransactional OptionalExternal 'TABLE' OptionalIfNotExists TableDefinitionRightPart_EDIT
 | 'CREATE' OptionalTemporary OptionalTransactional OptionalExternal 'TABLE' OptionalIfNotExists 'CURSOR'
   {
     if (!$6) {
       parser.suggestKeywords([
         'DEEP CLONE',
         'IF NOT EXISTS',
         'SHALLOW CLONE'
         ]);
     }
   }
 | 'CREATE' OptionalTemporary OptionalTransactional OptionalExternal 'TABLE' OptionalIfNotExists_EDIT
 ;

TableDefinitionRightPart
 : TableIdentifierAndOptionalColumnSpecification OptionalComment OptionalPartitionedBy
   OptionalClusteredBy OptionalSkewedBy OptionalRowFormat OptionalStoredAsOrBy
   OptionalWithSerdeproperties OptionalHdfsLocation OptionalTblproperties OptionalAsSelectStatement
 ;

TableDefinitionRightPart_EDIT
 : TableIdentifierAndOptionalColumnSpecification_EDIT OptionalComment OptionalPartitionedBy
   OptionalClusteredBy OptionalSkewedBy OptionalRowFormat OptionalStoredAsOrBy
   OptionalWithSerdeproperties OptionalHdfsLocation OptionalTblproperties OptionalAsSelectStatement
 | TableIdentifierAndOptionalColumnSpecification OptionalComment PartitionedBy_EDIT
   OptionalClusteredBy OptionalSkewedBy OptionalRowFormat OptionalStoredAsOrBy
   OptionalWithSerdeproperties OptionalHdfsLocation OptionalTblproperties OptionalAsSelectStatement
 | TableIdentifierAndOptionalColumnSpecification OptionalComment OptionalPartitionedBy
   ClusteredBy_EDIT OptionalSkewedBy OptionalRowFormat OptionalStoredAsOrBy
   OptionalWithSerdeproperties OptionalHdfsLocation OptionalTblproperties OptionalAsSelectStatement
 | TableIdentifierAndOptionalColumnSpecification OptionalComment OptionalPartitionedBy
   OptionalClusteredBy SkewedBy_EDIT OptionalRowFormat OptionalStoredAsOrBy
   OptionalWithSerdeproperties OptionalHdfsLocation OptionalTblproperties OptionalAsSelectStatement
 | TableIdentifierAndOptionalColumnSpecification OptionalComment OptionalPartitionedBy
   OptionalClusteredBy OptionalSkewedBy RowFormat_EDIT OptionalStoredAsOrBy
   OptionalWithSerdeproperties OptionalHdfsLocation OptionalTblproperties OptionalAsSelectStatement
 | TableIdentifierAndOptionalColumnSpecification OptionalComment OptionalPartitionedBy
   OptionalClusteredBy OptionalSkewedBy OptionalRowFormat StoredAsOrBy_EDIT
   OptionalWithSerdeproperties OptionalHdfsLocation OptionalTblproperties OptionalAsSelectStatement
 | TableIdentifierAndOptionalColumnSpecification OptionalComment OptionalPartitionedBy
   OptionalClusteredBy OptionalSkewedBy OptionalRowFormat OptionalStoredAsOrBy
   WithSerdeproperties_EDIT OptionalHdfsLocation OptionalTblproperties OptionalAsSelectStatement
 | TableIdentifierAndOptionalColumnSpecification OptionalComment OptionalPartitionedBy
   OptionalClusteredBy OptionalSkewedBy OptionalRowFormat OptionalStoredAsOrBy
   OptionalWithSerdeproperties HdfsLocation_EDIT OptionalTblproperties OptionalAsSelectStatement
 | TableIdentifierAndOptionalColumnSpecification OptionalComment OptionalPartitionedBy
   OptionalClusteredBy OptionalSkewedBy OptionalRowFormat OptionalStoredAsOrBy
   OptionalWithSerdeproperties OptionalHdfsLocation OptionalTblproperties AsSelectStatement_EDIT
 | TableIdentifierAndOptionalColumnSpecification OptionalComment OptionalPartitionedBy
   OptionalClusteredBy OptionalSkewedBy OptionalRowFormat OptionalStoredAsOrBy
   OptionalWithSerdeproperties OptionalHdfsLocation OptionalTblproperties 'CURSOR'
   {
     var keywords = [];
     if (!$1 && !$2 && !$3 && !$4 && !$5 && !$6 && !$7 && !$8 && !$9 && !$10) {
       keywords.push({ value: 'LIKE', weight: 1 });
     } else {
       if (!$2 && !$3 && !$4 && !$5 && !$6 && !$7 && !$8 && !$9 && !$10) {
         keywords.push({ value: 'COMMENT', weight: 10 });
       }
       if (!$3 && !$4 && !$5 && !$6 && !$7 && !$8 && !$9 && !$10) {
         keywords.push({ value: 'PARTITIONED BY', weight: 9 });
       }
       if (!$4 && !$5 && !$6 && !$7 && !$8 && !$9 && !$10) {
         keywords.push({ value: 'CLUSTERED BY', weight: 8 });
       }
       if (!$5 && !$6 && !$7 && !$8 && !$9 && !$10) {
         keywords.push({ value: 'SKEWED BY', weight: 7 });
       } else if ($5 && $5.suggestKeywords && !$6 && !$7 && !$8 && !$9 && !$10) {
         keywords = keywords.concat(parser.createWeightedKeywords($5.suggestKeywords, 7)); // Get the last optional from SKEWED BY
       }
       if (!$6 && !$7 && !$8 && !$9 && !$10) {
         keywords.push({ value: 'ROW FORMAT', weight: 6 });
       } else if ($6 && $6.suggestKeywords && !$7 && !$8 && !$9 && !$10) {
         keywords = keywords.concat(parser.createWeightedKeywords($6.suggestKeywords, 6));
       }
       if (!$7 && !$8 && !$9 && !$10) {
         keywords.push({ value: 'STORED AS', weight: 5 });
         keywords.push({ value: 'STORED BY', weight: 5 });
       } else if ($7 && $7.storedBy && !$8 && !$9 && !$10) {
         keywords.push({ value: 'WITH SERDEPROPERTIES', weight: 4 });
       }
       if (!$9 && !$10) {
         keywords.push({ value: 'LOCATION', weight: 3 });
       }
       if (!$10) {
         keywords.push({ value: 'TBLPROPERTIES', weight: 2 });
       }
       keywords.push({ value: 'AS', weight: 1 });
     }

     parser.suggestKeywords(keywords);
   }
 ;

TableIdentifierAndOptionalColumnSpecification
 : SchemaQualifiedIdentifier OptionalColumnSpecificationsOrLike
   {
     parser.addNewTableLocation(@1, $1, $2);
     $$ = $2;
   }
 ;

TableIdentifierAndOptionalColumnSpecification_EDIT
 : SchemaQualifiedIdentifier ColumnSpecificationsOrLike_EDIT
 | SchemaQualifiedIdentifier_EDIT OptionalColumnSpecificationsOrLike
 ;

OptionalColumnSpecificationsOrLike
 :
 | ParenthesizedColumnSpecificationList
 | 'LIKE' SchemaQualifiedTableIdentifier    -> []
 ;

ColumnSpecificationsOrLike_EDIT
 : ParenthesizedColumnSpecificationList_EDIT
 | 'LIKE' 'CURSOR'
   {
     parser.suggestTables();
     parser.suggestDatabases({ appendDot: true });
   }
 | 'LIKE' SchemaQualifiedTableIdentifier_EDIT
 ;

OptionalPartitionedBy
 :
 | PartitionedBy
 ;

PartitionedBy
 : 'PARTITIONED' 'BY' ParenthesizedColumnSpecificationList
 ;

PartitionedBy_EDIT
 : 'PARTITIONED' 'CURSOR'
   {
     parser.suggestKeywords(['BY']);
   }
 | 'PARTITIONED' 'CURSOR' ParenthesizedColumnSpecificationList
   {
     parser.suggestKeywords(['BY']);
   }
 | 'PARTITIONED' 'BY' ParenthesizedColumnSpecificationList_EDIT
 | 'PARTITIONED' ParenthesizedColumnSpecificationList_EDIT
 | 'PARTITION' 'CURSOR'
   {
     parser.suggestKeywords(['BY']);
   }
 | 'PARTITION' 'BY' 'CURSOR'
   {
     parser.suggestKeywords(['HASH', 'RANGE']);
   }
 ;

OptionalClusteredBy
 :
 | ClusteredBy
 ;

OptionalSkewedBy
 :
 | SkewedBy
 ;

SkewedBy
 : 'SKEWED' 'BY' ParenthesizedColumnList ON ParenthesizedSkewedValueList  -> { suggestKeywords: ['STORED AS DIRECTORIES'] }
 | 'SKEWED' 'BY' ParenthesizedColumnList ON ParenthesizedSkewedValueList 'STORED_AS_DIRECTORIES' // Hack otherwise ambiguous with OptionalStoredAsOrBy
 ;

SkewedBy_EDIT
 : 'SKEWED' 'CURSOR'
   {
     parser.suggestKeywords(['BY']);
   }
 | 'SKEWED' 'BY' ParenthesizedColumnList 'CURSOR'
   {
     parser.suggestKeywords(['ON']);
   }
 ;

OptionalAsSelectStatement
 :
 | AsSelectStatement
 ;

 OptionalClone
 :
 | 'DEEP CLONE'
 | 'SHALLOW'
 ;
