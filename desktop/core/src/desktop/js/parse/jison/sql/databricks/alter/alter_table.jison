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
 : AlterTable
 ;

DataDefinition_EDIT
 : AlterTable_EDIT
 ;

AlterTable
 : AlterTableLeftSide 'ADD' OptionalIfNotExists PartitionSpec OptionalHdfsLocation OptionalPartitionSpecs
 | AlterTableLeftSide 'ADD' 'CONSTRAINT' RegularOrBacktickedIdentifier PrimaryKeySpecification
 | AlterTableLeftSide 'ADD' TableConstraint
 | AlterTableLeftSide 'RENAME' 'TO' RegularOrBackTickedSchemaQualifiedName
 | AlterTableLeftSide ClusteredBy
 | AlterTableLeftSide ExchangeSpecification
  | AlterTableLeftSide 'RECOVER' 'PARTITIONS'
 | AlterTableLeftSide 'SET' 'OWNER' PrincipalSpecification
 | AlterTableLeftSide PartitionSpec 'RENAME' 'TO' PartitionSpec
 | AlterTableLeftSide PartitionSpec 'CHANGE' 'COLUMN' ParenthesizedColumnSpecificationList OptionalCascadeOrRestrict
 | AlterTableLeftSide DropOperations
 | AlterTableLeftSide PartitionOperations
 | AlterTableLeftSide PartitionSpec PartitionOperations
 ;

AlterTable_EDIT
 : AlterTableLeftSide_EDIT
 | AlterTableLeftSide_EDIT 'ADD' OptionalIfNotExists PartitionSpec OptionalHdfsLocation OptionalPartitionSpecs
 | AlterTableLeftSide_EDIT TableConstraint
 | AlterTableLeftSide_EDIT 'RENAME' 'TO' RegularOrBackTickedSchemaQualifiedName
 | AlterTableLeftSide_EDIT ClusteredBy
 | AlterTableLeftSide_EDIT ExchangeSpecification
  | AlterTableLeftSide_EDIT 'RECOVER' 'PARTITIONS'
 | AlterTableLeftSide_EDIT 'SET' 'OWNER' PrincipalSpecification
 | AlterTableLeftSide_EDIT PartitionSpec 'RENAME' 'TO' PartitionSpec
 | AlterTableLeftSide_EDIT PartitionSpec 'CHANGE' 'COLUMN' ParenthesizedColumnSpecificationList OptionalCascadeOrRestrict
 | AlterTableLeftSide_EDIT DropOperations
 | AlterTableLeftSide_EDIT PartitionOperations
 | AlterTableLeftSide_EDIT PartitionSpec PartitionOperations
 | AlterTableLeftSide 'ADD' OptionalIfNotExists 'CURSOR'
   {
     if (!$3) {
       parser.suggestKeywords([{ value: 'IF NOT EXISTS', weight: 3 }, { value: 'COLUMNS', weight: 2 }, { value: 'CONSTRAINT', weight: 1 }, {  value: 'PARTITION', weight: 1 }]);
     } else {
       parser.suggestKeywords(['PARTITION']);
     }
   }
 | AlterTableLeftSide 'REPLACE' 'CURSOR'
   {
     parser.suggestKeywords(['COLUMNS']);
   }
 | AlterTableLeftSide 'ADD' OptionalIfNotExists_EDIT
 | AlterTableLeftSide 'ADD' OptionalIfNotExists PartitionSpec HdfsLocation_EDIT OptionalPartitionSpecs
 | AlterTableLeftSide 'ADD' OptionalIfNotExists PartitionSpec OptionalHdfsLocation PartitionSpecs_EDIT
 | AlterTableLeftSide 'ADD' OptionalIfNotExists PartitionSpec OptionalHdfsLocation OptionalPartitionSpecs 'CURSOR'
   {
     if (!$5 && !$6) {
       parser.suggestKeywords(['LOCATION', 'PARTITION']);
     } else if ($6 && $6.suggestKeywords) {
       var keywords = parser.createWeightedKeywords($6.suggestKeywords, 2);
       keywords.push({ value: 'PARTITION', weight: 1 });
       parser.suggestKeywords(keywords);
     } else {
       parser.suggestKeywords(['PARTITION']);
     }
   }
 | AlterTableLeftSide 'ADD' OptionalIfNotExists PartitionSpec_EDIT OptionalHdfsLocation OptionalPartitionSpecs
 | AlterTableLeftSide 'ADD' 'CONSTRAINT' 'CURSOR'
 | AlterTableLeftSide 'ADD' 'CONSTRAINT' RegularOrBacktickedIdentifier 'CURSOR'
   {
     parser.suggestKeywords('ALTER TABLE ADD CONSTRAINT identifier');
   }
 | AlterTableLeftSide 'ADD' 'CONSTRAINT' RegularOrBacktickedIdentifier PrimaryKeySpecification_EDIT
 | AlterTableLeftSide 'ADD' 'CONSTRAINT' RegularOrBacktickedIdentifier ForeignKeySpecification_EDIT
 | AlterTableLeftSide ClusteredBy_EDIT
 | AlterTableLeftSide ExchangeSpecification_EDIT
 | AlterTableLeftSide PartitionSpec 'RENAME' 'CURSOR'
   {
     parser.suggestKeywords(['TO PARTITION']);
   }
 | AlterTableLeftSide PartitionSpec 'RENAME' 'TO' 'CURSOR'
   {
     parser.suggestKeywords(['PARTITION']);
   }
  | AlterTableLeftSide 'RECOVER' 'CURSOR'
   {
     parser.suggestKeywords(['PARTITIONS']);
   }
 | AlterTableLeftSide 'SET' 'OWNER' 'CURSOR'
   {
     parser.suggestKeywords(['GROUP', 'ROLE', 'USER']);
   }
 | AlterTableLeftSide 'SET' 'OWNER' PrincipalSpecification_EDIT
 | AlterTableLeftSide PartitionOperations_EDIT
 | AlterTableLeftSide DropOperations_EDIT
 | AlterTableLeftSide 'CURSOR'
   {
     parser.suggestKeywords(['ADD COLUMNS', 'ADD IF NOT EXISTS', 'ADD PARTITION', 'CHANGE',
       'DROP', 'EXCHANGE PARTITION', 'PARTITION', 'RECOVER PARTITIONS',
       'RENAME TO', 'REPLACE COLUMNS', 'SET FILEFORMAT', 'SET LOCATION', 'SET OWNER', 'SET SERDE',
       'SET SERDEPROPERTIES', 'SET TBLPROPERTIES', 'UNSET SERDEPROPERTIES']);
   }
 | AlterTableLeftSide PartitionSpec 'CURSOR'
   {
     parser.suggestKeywords(['ADD COLUMNS', 'CHANGE', 'RENAME TO PARTITION', 'REPLACE COLUMNS', 'SET FILEFORMAT', 'SET LOCATION',
       'SET SERDE', 'SET SERDEPROPERTIES', 'UNSET SERDEPROPERTIES']);
   }
 | AlterTableLeftSide PartitionSpec AddOrReplace 'CURSOR'
   {
     parser.suggestKeywords(['COLUMNS']);
   }
 | AlterTableLeftSide PartitionSpec 'SET' 'CURSOR'
   {
     parser.suggestKeywords(['FILEFORMAT', 'LOCATION', 'SERDE', 'SERDEPROPERTIES']);
   }
 | AlterTableLeftSide 'SET' 'CURSOR'
   {
     parser.suggestKeywords(['FILEFORMAT', 'LOCATION', 'OWNER', 'SERDE', 'SERDEPROPERTIES', 'TBLPROPERTIES']);
   }
 | AlterTableLeftSide PartitionSpec PartitionOperations_EDIT
 | AlterTableLeftSide 'RENAME' 'CURSOR'
   {
     parser.suggestKeywords(['TO']);
   }
 | AlterTableLeftSide 'RENAME' 'TO' 'CURSOR'
   {
     parser.suggestDatabases({ appendDot: true });
   }
 | AlterTableLeftSide 'UNSET' 'CURSOR'
   {
     parser.suggestKeywords(['SERDEPROPERTIES']);
   }
 ;

AlterTableLeftSide
 : 'ALTER' 'TABLE' SchemaQualifiedTableIdentifier
   {
     parser.addTablePrimary($3);
   }
 ;

AlterTableLeftSide_EDIT
 : 'ALTER' 'TABLE' SchemaQualifiedTableIdentifier_EDIT
   {
     if (parser.yy.result.suggestTables) {
       parser.yy.result.suggestTables.onlyTables = true;
     }
   }
 | 'ALTER' 'TABLE' 'CURSOR'
   {
     parser.suggestTables({ onlyTables: true });
     parser.suggestDatabases({ appendDot: true });
   }
 ;

PartitionOperations
 : 'SET' 'FILEFORMAT' FileFormat
 | 'SET' HdfsLocation
 | 'SET' 'TBLPROPERTIES' ParenthesizedPropertyAssignmentList
 | 'SET' 'SERDE' QuotedValue OptionalWithSerdeproperties
 | 'SET' 'SERDEPROPERTIES' ParenthesizedPropertyAssignmentList
 | 'UNSET' 'SERDEPROPERTIES' ParenthesizedPropertyAssignmentList
 | 'CHANGE' OptionalColumn ColumnIdentifier ColumnSpecification OptionalAfterOrFirst OptionalCascadeOrRestrict
   {
     parser.addColumnLocation($3.location, [ $3.identifier ]);
   }
 ;

PartitionOperations_EDIT
 : AddReplaceColumns_EDIT
 | 'CHANGE' OptionalColumn 'CURSOR'
   {
     if (!$2) {
       parser.suggestKeywords(['COLUMN']);
     }
     parser.suggestColumns();
   }
 | 'CHANGE' OptionalColumn ColumnIdentifier ColumnSpecification_EDIT OptionalAfterOrFirst OptionalCascadeOrRestrict
   {
     parser.addColumnLocation($3.location, [ $3.identifier ]);
   }
 | 'CHANGE' OptionalColumn ColumnIdentifier ColumnSpecification OptionalAfterOrFirst OptionalCascadeOrRestrict 'CURSOR'
   {
     if (!$5 && !$6) {
       if ($4.suggestKeywords) {
         var keywords = parser.createWeightedKeywords($4.suggestKeywords, 3);
         keywords = keywords.concat([{ value: 'AFTER', weight: 2 }, { value: 'FIRST', weight: 2 }, { value: 'CASCADE', weight: 1 }, { value: 'RESTRICT', weight: 1 }]);
         parser.suggestKeywords(keywords);
       } else {
         parser.suggestKeywords([{ value: 'AFTER', weight: 2 }, { value: 'FIRST', weight: 2 }, { value: 'CASCADE', weight: 1 }, { value: 'RESTRICT', weight: 1 }]);
       }
     } else if ($5 && !$6) {
       parser.suggestKeywords(['CASCADE', 'RESTRICT']);
     }
     parser.addColumnLocation($3.location, [ $3.identifier ]);
   }
 | 'CHANGE' OptionalColumn ColumnIdentifier ColumnSpecification AfterOrFirst_EDIT OptionalCascadeOrRestrict
   {
     parser.addColumnLocation($3.location, [ $3.identifier ]);
   }
 | 'SET' 'FILEFORMAT' 'CURSOR'
   {
     parser.suggestFileFormats();
   }
 | 'SET' HdfsLocation_EDIT
 | 'SET' 'SERDE' QuotedValue OptionalWithSerdeproperties 'CURSOR'
   {
     if (!$4) {
       parser.suggestKeywords(['WITH SERDEPROPERTIES']);
     }
   }
 | 'SET' 'SERDE' QuotedValue WithSerdeproperties_EDIT
 ;

OptionalAndWait
 :
 | 'AND' 'WAIT'
 ;

AndWait_EDIT
 : 'AND' 'CURSOR'
   {
     parser.suggestKeywords(['WAIT']);
   }
 ;

OptionalWithOverwriteTblProperties
 :
 | 'WITH' 'OVERWRITE' 'TBLPROPERTIES' ParenthesizedPropertyAssignmentList
 ;

WithOverwriteTblProperties_EDIT
 : 'WITH' 'CURSOR'
   {
     parser.suggestKeywords(['OVERWRITE TBLPROPERTIES']);
   }
 | 'WITH' 'OVERWRITE' 'CURSOR'
   {
     parser.suggestKeywords(['TBLPROPERTIES']);
   }
 ;

AddReplaceColumns
 : AddOrReplace 'COLUMNS' ParenthesizedColumnSpecificationList OptionalCascadeOrRestrict
 ;

AddReplaceColumns_EDIT
 : AddOrReplace 'COLUMNS' ParenthesizedColumnSpecificationList_EDIT OptionalCascadeOrRestrict
 | AddOrReplace 'COLUMNS' ParenthesizedColumnSpecificationList OptionalCascadeOrRestrict 'CURSOR'
   {
     if (!$4) {
       parser.suggestKeywords(['CASCADE', 'RESTRICT']);
     }
   }
 ;

ExchangeSpecification
 : 'EXCHANGE' ExchangePartitionSpec 'WITH' 'TABLE' RegularOrBackTickedSchemaQualifiedName
 ;

ExchangeSpecification_EDIT
 : 'EXCHANGE' 'CURSOR'
   {
     parser.suggestKeywords(['PARTITION']);
   }
 | 'EXCHANGE' ExchangePartitionSpec 'CURSOR'
   {
     parser.suggestKeywords(['WITH TABLE']);
   }
 | 'EXCHANGE' ExchangePartitionSpec 'WITH' 'CURSOR'
   {
     parser.suggestKeywords(['TABLE']);
   }
 | 'EXCHANGE' ExchangePartitionSpec 'WITH' 'TABLE' 'CURSOR'
   {
     parser.suggestTables();
     parser.suggestDatabases({ appendDot: true });
   }
 | 'EXCHANGE' ExchangePartitionSpec 'WITH' 'TABLE' RegularOrBackTickedSchemaQualifiedName_EDIT
 | 'EXCHANGE' ExchangePartitionSpec_EDIT
 | 'EXCHANGE' ExchangePartitionSpec_EDIT 'WITH' 'TABLE' RegularOrBackTickedSchemaQualifiedName
 ;

ExchangePartitionSpec
 : 'PARTITION' '(' OneOrMorePartitionSpecLists ')'
 | 'PARTITION' '(' PartitionSpecList ')'
 ;

ExchangePartitionSpec_EDIT
 : 'PARTITION' '(' OneOrMorePartitionSpecLists_EDIT RightParenthesisOrError
 | 'PARTITION' '(' PartitionSpecList_EDIT RightParenthesisOrError
 ;

OneOrMorePartitionSpecLists
 : '(' PartitionSpecList ')'
 | OneOrMorePartitionSpecLists ',' '(' PartitionSpecList ')'
 ;

OneOrMorePartitionSpecLists_EDIT
 : '(' PartitionSpecList_EDIT RightParenthesisOrError
 | OneOrMorePartitionSpecLists ',' '(' PartitionSpecList_EDIT RightParenthesisOrError
 ;

DropOperations
 : 'DROP' OptionalIfExists OneOrMorePartitionSpecs OptionalPurge
 | 'DROP' 'CONSTRAINT' RegularOrBacktickedIdentifier
 ;

DropOperations_EDIT
 : 'DROP' OptionalIfExists 'CURSOR'
   {
     if (!$2) {
       parser.suggestKeywords([{ value: 'CONSTRAINT', weight: 1}, { value: 'PARTITION', weight: 1}, { value: 'IF EXISTS', weight: 2 }]);
     } else {
        parser.suggestKeywords(['PARTITION']);
     }
   }
 | 'DROP' OptionalIfExists OneOrMorePartitionSpecs_EDIT OptionalPurge
 | 'DROP' OptionalIfExists OneOrMorePartitionSpecs OptionalPurge 'CURSOR'
   {
     if (!$4) {
       parser.suggestKeywords(['PURGE']);
     }
   }
 | 'DROP' 'CONSTRAINT' 'CURSOR'
 | 'DROP' OptionalIfExists_EDIT
 | 'DROP' ColumnIdentifier_EDIT
 ;

AddOrReplace
 : 'ADD'
 | 'REPLACE'
 ;

OptionalAfterOrFirst
 :
 | AfterOrFirst ColumnIdentifier
 ;

AfterOrFirst
 : 'AFTER'
 | 'FIRST'
 ;

AfterOrFirst_EDIT
 : AfterOrFirst 'CURSOR'
   {
     parser.suggestColumns();
   }
 | AfterOrFirst ColumnIdentifier_EDIT
 ;

OptionalColumn
 :
 | 'COLUMN'
 ;

NoDropOrOffline
 : 'NO_DROP' OptionalCascade
 | 'OFFLINE'
 ;

NoDropOrOffline_EDIT
 : 'NO_DROP' OptionalCascade 'CURSOR'
   {
     if (!$2) {
       parser.suggestKeywords(['CASCADE']);
     }
   }
 ;


OneOrMorePartitionSpecs
 : PartitionSpec
 | OneOrMorePartitionSpecs ',' PartitionSpec
 ;

OneOrMorePartitionSpecs_EDIT
 : PartitionSpec_EDIT
 | OneOrMorePartitionSpecs ',' AnyCursor
   {
     parser.suggestKeywords(['PARTITION']);
   }
 | OneOrMorePartitionSpecs ',' AnyCursor ',' OneOrMorePartitionSpecs
   {
     parser.suggestKeywords(['PARTITION']);
   }
 | AnyCursor ',' OneOrMorePartitionSpecs
   {
     parser.suggestKeywords(['PARTITION']);
   }
 | OneOrMorePartitionSpecs ',' PartitionSpec_EDIT
 | PartitionSpec_EDIT ',' OneOrMorePartitionSpecs
 | OneOrMorePartitionSpecs ',' PartitionSpec_EDIT ',' OneOrMorePartitionSpecs
 ;

OptionalPartitionSpecs
 :
 | PartitionSpecWithLocationList
 ;

PartitionSpecs_EDIT
 : PartitionSpecWithLocation_EDIT
 | PartitionSpecWithLocation_EDIT PartitionSpecWithLocationList
 | PartitionSpecWithLocationList PartitionSpecWithLocation_EDIT
 | PartitionSpecWithLocationList PartitionSpecWithLocation_EDIT PartitionSpecWithLocationList
 ;

PartitionSpecWithLocationList
 : PartitionSpecWithLocation
 | PartitionSpecWithLocationList PartitionSpecWithLocation  -> $2
 ;

PartitionSpecWithLocation_EDIT
 : PartitionSpec HdfsLocation_EDIT
 | PartitionSpec_EDIT OptionalHdfsLocation
 ;

PartitionSpecWithLocation
 : PartitionSpec OptionalHdfsLocation
   {
     if (!$2) {
       $$ = { suggestKeywords: ['LOCATION'] };
     }
   }
 ;
