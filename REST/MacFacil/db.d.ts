export function createMuscle(options: any, done: any): void;
export function cleanUpMuscle(options: any, done: any): void;
export function createExercise(options: any, done: any): void;
export function cleanUpExercise(options: any, done: any): void;
export function createWorkout(options: any, done: any): void;
export function cleanUpWorkout(options: any, done: any): void;
export function cleanUpWorkExer(options: any, done: any): void;
export function createWorkExer(options: any, done: any): void;
/**
 * Setup parts of exercises to the test
 */
export function setupPartsAndExercises(done: any): void;
/**
 * Clean up oparts of exercises
 */
export function cleanUpJunctionAndMaster(tableRelationship: any, TableMaster: any, done: any): void;
export function cleanUpTable(tableName: any, done: any): void;
export function createRecord(tableName: any, done: any): void;
/**
 * Creates records in the related tables,
* then creates a record in the Junction table
 * @param {*} table1
 * @param {*} Table2
 * @param {*} JunctionTable
 * @param {*} done
 */
export function setupRelationship(table1: any, table2: any, junctionTable: any, done: any): void;
/**
* Do not add a record in the Junction table
* @param {*} done
*/
export function setupRelationshipNoJunction(table1: any, table2: any, done: any): void;
export function cleanUpRelationship(table1: any, table2: any, junctionTable: any, done: any): void;
/**
 * Setup a relationship table in order to test a 1 to N related table, liek the table workout_sets
 * @param {*} junctionTable  the junction table
 * @param {*} theRelated1 the foreign table one from the junction table
 * @param {*} theRelated2 the foreign table 2 from the junction table
 * @param {*} theTestTable the table will be tested
 * @param {*} done the done flag
 */
export function setupRelationshipForRelated(theRelated1: any, theRelated2: any, junctionTable: any, theTestTable: any, done: any): void;
/**
 * Clean up al tables setted by the cleanupRelationshipForRelated function
 * @param {*} junctionTable  the junction table
  * @param {*} theRelated1 the foreign table one from the junction table
  * @param {*} theRelated2 the foreign table 2 from the junction table
  * @param {*} theTestTable the table will be tested
  * @param {*} done the done flag
 */
export function cleanUpRelationshipForRelated(theRelated1: any, theRelated2: any, junctionTable: any, theTestTable: any, done: any): void;
export function setupRelationshipWithRoutine(table1: any, table2: any, junctionTable: any, done: any): void;
export function cleanUpRelationshipForRelatedWithRoutine(theRelated1: any, theRelated2: any, junctionTable: any, theTestTable: any, done: any): void;
/**
  * Setup a relationship table in order to test a 1 to N related table, liek the table workout_sets
  * Setup the Routine First
  * @param {*} junctionTable  the junction table
  * @param {*} theRelated1 the foreign table one from the junction table
  * @param {*} theRelated2 the foreign table 2 from the junction table
  * @param {*} theTestTable the table will be tested
  * @param {*} done the done flag
  */
export function setupRelationshipForRelatedWithRoutine(theRelated1: any, theRelated2: any, junctionTable: any, theTestTable: any, done: any): void;
export function setupRelationshipTripleForRelated(theRelated1: any, theRelated2: any, junctionTable: any, theHelperTable: any, tableTestTable: any, done: any): void;
export function cleanUpRelationshipTripleForRelated(theRelated1: any, theRelated2: any, junctionTable: any, theHelperTable: any, theTestTable: any, done: any): void;
//# sourceMappingURL=db.d.ts.map