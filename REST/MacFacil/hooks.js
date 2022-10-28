"use strict";
/**
 *
 *  https://dredd.readthedocs.io/en/latest/hooks/
 * */
const hooks = require('hooks');
const db = require('./db.js');
//import db from './db.mjs';
//omar token
//const myToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidXNlciIsImxldmVsIjoibmV3YmllIiwidXNlcm5hbWUiOiJvbWFyIiwiaWQiOiI1IiwiaWF0IjoxNTgwNDE1NTA0LCJleHAiOjE1ODA0MTkxMDR9.XBvh66uS_0jWoE8PYG4jU-yeYfTL2BgGBfhEc6M5CWo'
//admin token
const myToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJsZXZlbCI6ImV4cGVydCIsInVzZXJuYW1lIjoiYWRtaW4iLCJpZCI6IjUzYjBlYzY0LTUwNGItMTFlYS1iOWM5LTIyMDAwYWVmNGUwYiIsImlhdCI6MTU4MjMwMDg5MCwiZXhwIjoxNTgyMzA0NDkwfQ.HQGPNm_YSqpVUmJTrs2gulD2e5PYZSuye4-4qMh0Fk8';
const dbSchema = 'rafaelloduca';
const tableExercises = dbSchema + '.gymeasy_exercises';
const tableMuscles = dbSchema + '.gymeasy_muscles';
const tableWorkExer = dbSchema + '.gymeasy_workout_exercises';
const tableWorkUsers = dbSchema + '.gymeasy_workout_users';
const theTableMuscExer = dbSchema + '.gymeasy_muscle_exercises';
const theTableExerPart = dbSchema + '.gymeasy_exercise_parts';
const tableWorkouts = dbSchema + '.gymeasy_workouts';
const tableUsers = dbSchema + '.gymeasy_users';
const tableGoalTypes = dbSchema + '.gymeasy_goal_types';
const tableObjectives = dbSchema + '.gymeasy_workout_objectives';
const tableWorkSets = dbSchema + '.gymeasy_workout_sets';
const tableGoals = dbSchema + '.gymeasy_goals';
const tableRoutines = dbSchema + '.gymeasy_routines';
const tableRoutExer = dbSchema + '.gymeasy_routine_exercises';
const tableRoutSets = dbSchema + '.gymeasy_routine_sets';
const tableEquipments = dbSchema + '.gymeasy_equipments';
const tableExerEquip = dbSchema + '.gymeasy_exercise_equipments';
const tableClasses = dbSchema + '.gymeasy_exercise_classes';
const tableMoviments = dbSchema + '.gymeasy_muscle_moviments';
const tableGoalUsers = dbSchema + '.gymeasy_goal_users';
const tableMedias = dbSchema + '.gymeasy_medias';
const tableRoutExers = dbSchema + '.gymeasy_routine_exercises';
/**
 * TESTS FOR THE /muscles routes
 */
hooks.beforeEach(function (transaction, done) {
    //console.log("running before All");
    db.cleanUpMuscle({ id: 1 }, done);
});
hooks.before('Muscles > CREATE a New Muscle', (transaction, done) => {
    //console.log("running before");
    db.cleanUpMuscle({ id: 1 }, done);
    transaction.request.headers.Authorization = myToken;
});
hooks.after('Muscles > CREATE a New Muscle', (transaction, done) => {
    //console.log("running after");
    db.cleanUpMuscle({ id: 1 }, done);
    transaction.request.headers.Authorization = myToken;
});
hooks.before('Muscles > List All Muscles', (transaction) => {
    transaction.request.headers.Authorization = myToken;
});
hooks.before('Muscle > Get one Muscle', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.createMuscle({ id: 1 }, done);
});
hooks.after('Muscle > Get one Muscle', (transaction, done) => {
    db.cleanUpMuscle({ id: 1 }, done);
});
hooks.before('Muscle > Edit one Muscle', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.createMuscle({ id: 1 }, done);
});
hooks.after('Muscle > Edit one Muscle', (transaction, done) => {
    db.cleanUpMuscle({ id: 1 }, done);
});
hooks.before('Muscle > Get a Group of Muscles', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.createMuscle({ id: 1 }, done);
});
hooks.after('Muscle > Get a Group of Muscles', (transaction, done) => {
    db.cleanUpMuscle({ id: 1 }, done);
});
hooks.before('Muscle > Removes a muscle from a group', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.createMuscle({ id: 1 }, done);
});
hooks.after('Muscle > Removes a muscle from a group', (transaction, done) => {
    db.cleanUpMuscle({ id: 1 }, done);
});
hooks.before('Muscle > Add a muscle into a group', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.createMuscle({ id: 1 }, done);
});
hooks.after('Muscle > Add a muscle into a group', (transaction, done) => {
    db.cleanUpMuscle({ id: 1 }, done);
});
hooks.before('Muscle > Delete one Muscle', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.createMuscle({ id: 1 }, done);
});
hooks.after('Muscle > Delete one Muscle', (transaction, done) => {
    db.cleanUpMuscle({ id: 1 }, done);
});
// GET (200) /muscles/1/exercises
hooks.before('Muscle > Get all exercises one muscle belongs to', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationship(tableMuscles, tableExercises, theTableMuscExer, done);
});
hooks.after('Muscle > Get all exercises one muscle belongs to', (transaction, done) => {
    db.cleanUpRelationship(tableMuscles, tableExercises, theTableMuscExer, done);
});
/**
 * TESTS for the ROUTE /exercises
 */
hooks.beforeEach(function (transaction, done) {
    //console.log("running before All");
    db.cleanUpTable(tableExercises, done);
});
// GET  /exercises
hooks.before('Exercises > List All Exercises', (transaction) => {
    transaction.request.headers.Authorization = myToken;
});
//PUT  /exercises
hooks.before('Exercises > CREATE a new Exercise', (transaction, done) => {
    //console.log("running before");
    db.cleanUpTable(tableExercises, done);
    transaction.request.headers.Authorization = myToken;
});
hooks.after('Exercises > CREATE a new Exercise', (transaction, done) => {
    //console.log("running after");
    db.cleanUpTable(tableExercises, done);
    transaction.request.headers.Authorization = myToken;
});
//PATCH /exercises/1
hooks.before('Exercise > Update specific Exercise', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.createRecord(tableExercises, done);
});
hooks.after('Exercise > Update specific Exercise', (transaction, done) => {
    db.cleanUpTable(tableExercises, done);
});
//DELETE  /exercises/1
hooks.before('Exercise > Delete a specific Exercise', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.createRecord(tableExercises, done);
});
hooks.after('Exercise > Delete a specific Exercise', (transaction, done) => {
    db.cleanUpTable(tableExercises, done);
});
//Get /exercises/{idExercise} 
hooks.before('Exercise > Get one Exercise', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.createRecord(tableExercises, done);
});
hooks.after('Exercise > Get one Exercise', (transaction, done) => {
    db.cleanUpTable(tableExercises, done);
});
//GET  /execises/1/workouts
hooks.before('Workout from Exercises > Get all Workouts from a Specific Exercise', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationship(tableWorkouts, tableExercises, tableWorkExer, done);
});
hooks.after('Workout from Exercises > Get all Workouts from a Specific Exercise', (transaction, done) => {
    db.cleanUpRelationship(tableExercises, tableWorkouts, tableWorkExer, done);
});
//DELETE  /execises/1/workouts/1
hooks.before('Workout Distinct from Exercise > Removes a Exercise from a workout', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationship(tableWorkouts, tableExercises, tableWorkExer, done);
});
hooks.after('Workout Distinct from Exercise > Removes a Exercise from a workout', (transaction, done) => {
    db.cleanUpRelationship(tableExercises, tableWorkouts, tableWorkExer, done);
});
//GET  /execises/1/workouts/1
hooks.before('Workout Distinct from Exercise > Get a Specific Workout from a Specific Exercise', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationship(tableWorkouts, tableExercises, tableWorkExer, done);
});
hooks.after('Workout Distinct from Exercise > Get a Specific Workout from a Specific Exercise', (transaction, done) => {
    db.cleanUpRelationship(tableExercises, tableWorkouts, tableWorkExer, done);
});
// PUT  /exercises/1/workouts/1
hooks.before('Workout Distinct from Exercise > Add a Exercise into a workout', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationshipNoJunction(tableExercises, tableWorkouts, done);
});
hooks.after('Workout Distinct from Exercise > Add a Exercise into a workout', (transaction, done) => {
    db.cleanUpRelationship(tableExercises, tableWorkouts, tableWorkExer, done);
});
//GET (200) /exercises/1/muscles
hooks.before('Muscles from Exercises > Get all Muscles from a Specific Exercise', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationship(tableExercises, tableMuscles, theTableMuscExer, done);
});
hooks.after('Muscles from Exercises > Get all Muscles from a Specific Exercise', (transaction, done) => {
    db.cleanUpRelationship(tableExercises, tableMuscles, theTableMuscExer, done);
});
//GET  GET (200) /exercises/1/muscles/1
hooks.before('Muscle Distinct from Exercise > Get a Specific Muscle from a Specific Exercise', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationship(tableExercises, tableMuscles, theTableMuscExer, done);
});
hooks.after('Muscle Distinct from Exercise > Get a Specific Muscle from a Specific Exercise', (transaction, done) => {
    db.cleanUpRelationship(tableExercises, tableMuscles, theTableMuscExer, done);
});
// PUT (201) /exercises/1/muscles/1
hooks.before('Muscle Distinct from Exercise > Add a Muscle to an Exercise', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationshipNoJunction(tableMuscles, tableExercises, done);
});
hooks.after('Muscle Distinct from Exercise > Add a Muscle to an Exercise', (transaction, done) => {
    db.cleanUpRelationship(tableExercises, tableMuscles, theTableMuscExer, done);
});
//DELETE (201) /exercises/1/muscles/1
hooks.before('Muscle Distinct from Exercise > Removes a Muscle from an Exercise', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationship(tableExercises, tableMuscles, theTableMuscExer, done);
});
hooks.after('Muscle Distinct from Exercise > Removes a Muscle from an Exercise', (transaction, done) => {
    db.cleanUpRelationship(tableExercises, tableMuscles, theTableMuscExer, done);
});
/**Exercises Parts */
//GET (200) /exercises/1/parts/1
hooks.before('Part Distinct from Exercise > Get a Specific Part from a Specific Exercise', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupPartsAndExercises(done);
});
hooks.after('Part Distinct from Exercise > Get a Specific Part from a Specific Exercise', (transaction, done) => {
    db.cleanUpJunctionAndMaster(theTableExerPart, tableExercises, done);
});
//PUT (201) /exercises/1/parts/1
hooks.before('Part Distinct from Exercise > Add a Exercise into a Part', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupPartsAndExercises(done);
});
hooks.after('Part Distinct from Exercise > Add a Exercise into a Part', (transaction, done) => {
    db.cleanUpJunctionAndMaster(theTableExerPart, tableExercises, done);
});
// DELETE (201) /exercises/1/parts/1
hooks.before('Part Distinct from Exercise > Removes a Part from a Exercise', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupPartsAndExercises(done);
});
hooks.after('Part Distinct from Exercise > Removes a Part from a Exercise', (transaction, done) => {
    db.cleanUpJunctionAndMaster(theTableExerPart, tableExercises, done);
});
// GET (200) /exercises/1/parts
hooks.before('Parts from Exercises > Get all Parts from a Specific Exercise', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupPartsAndExercises(done);
});
hooks.after('Parts from Exercises > Get all Parts from a Specific Exercise', (transaction, done) => {
    db.cleanUpJunctionAndMaster(theTableExerPart, tableExercises, done);
});
/**
 * MuscExers - Relationship
 */
// GET (200) /muscexers
hooks.before('MuscExers > List All MuscExers', (transaction) => {
    transaction.request.headers.Authorization = myToken;
});
//PUT (200) /muscexers
hooks.before('MuscExers > CREATE a new MuscExer', (transaction, done) => {
    //console.log("running before");
    db.setupRelationshipNoJunction(tableMuscles, tableExercises, done);
    transaction.request.headers.Authorization = myToken;
});
hooks.after('MuscExers > CREATE a new MuscExer', (transaction, done) => {
    //console.log("running after");
    db.cleanUpRelationship(tableExercises, tableMuscles, theTableMuscExer, done);
    transaction.request.headers.Authorization = myToken;
});
//PATCH (201) /muscexers/1
hooks.before('MuscExer > Update a specific MuscExer', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationship(tableExercises, tableMuscles, theTableMuscExer, done);
});
hooks.after('MuscExer > Update a specific MuscExer', (transaction, done) => {
    db.cleanUpRelationship(tableExercises, tableMuscles, theTableMuscExer, done);
});
//DELETE (201) /muscexers/1
hooks.before('MuscExer > Delete a specific MuscExer', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationship(tableExercises, tableMuscles, theTableMuscExer, done);
});
hooks.after('MuscExer > Delete a specific MuscExer', (transaction, done) => {
    db.cleanUpRelationship(tableExercises, tableMuscles, theTableMuscExer, done);
});
//GET (200) /muscexers/1
hooks.before('MuscExer > Get a specific MuscExers', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationship(tableExercises, tableMuscles, theTableMuscExer, done);
});
hooks.after('MuscExer > Get a specific MuscExers', (transaction, done) => {
    db.cleanUpRelationship(tableExercises, tableMuscles, theTableMuscExer, done);
});
/**
 * WrokExers Relationship
 */
//GET (200) /workexers
hooks.before('WorkExers > List All WorkExers', (transaction) => {
    transaction.request.headers.Authorization = myToken;
});
//PUT (200) /workexercises
hooks.before('WorkExers > CREATE a new WorkExer', (transaction, done) => {
    //console.log("running before");
    db.setupRelationshipNoJunction(tableExercises, tableWorkouts, done);
    transaction.request.headers.Authorization = myToken;
});
hooks.after('WorkExers > CREATE a new WorkExer', (transaction, done) => {
    //console.log("running after");
    db.cleanUpRelationship(tableExercises, tableWorkouts, tableWorkExer, done);
    transaction.request.headers.Authorization = myToken;
});
//PATCH (201) /workexers/1
hooks.before('WorkExer > Update a specific WorkExer', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationship(tableExercises, tableWorkouts, tableWorkExer, done);
});
hooks.after('WorkExer > Update a specific WorkExer', (transaction, done) => {
    db.cleanUpRelationship(tableExercises, tableWorkouts, tableWorkExer, done);
});
//DELETE (201) /workexers/1
hooks.before('WorkExer > Delete a specific WorkExer', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationship(tableExercises, tableWorkouts, tableWorkExer, done);
});
hooks.after('WorkExer > Delete a specific WorkExer', (transaction, done) => {
    db.cleanUpRelationship(tableExercises, tableWorkouts, tableWorkExer, done);
});
//GET (200) /workexers/1
hooks.before('WorkExer > Get a specific WorkExer', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationship(tableExercises, tableWorkouts, tableWorkExer, done);
});
hooks.after('WorkExer > Get a specific WorkExer', (transaction, done) => {
    db.cleanUpRelationship(tableExercises, tableWorkouts, tableWorkExer, done);
});
/**
 * partExers  Relationship
 */
//GET (200) /partexers
hooks.before('PartExer > List All PartExer', (transaction) => {
    transaction.request.headers.Authorization = myToken;
});
//PUT (200) /partexers
hooks.before('PartExer > CREATE a new PartExer', (transaction, done) => {
    //console.log("running before");
    db.setupPartsAndExercises(done);
    transaction.request.headers.Authorization = myToken;
});
hooks.after('PartExer > CREATE a new PartExer', (transaction, done) => {
    //console.log("running after");
    db.cleanUpJunctionAndMaster(theTableExerPart, tableExercises, done);
    transaction.request.headers.Authorization = myToken;
});
//PATCH (201) /partexers/1
hooks.before('PartExer > Update a specific PartExer', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupPartsAndExercises(done);
});
hooks.after('PartExer > Update a specific PartExer', (transaction, done) => {
    db.cleanUpJunctionAndMaster(theTableExerPart, tableExercises, done);
});
//DELETE (201) /partexers/1
hooks.before('PartExer > Delete a specific PartExer', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupPartsAndExercises(done);
});
hooks.after('PartExer > Delete a specific PartExer', (transaction, done) => {
    db.cleanUpJunctionAndMaster(theTableExerPart, tableExercises, done);
});
//GET (200) /partexers/1
hooks.before('PartExer > Get a specific PartExer', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupPartsAndExercises(done);
});
hooks.after('PartExer > Get a specific PartExer', (transaction, done) => {
    db.cleanUpJunctionAndMaster(theTableExerPart, tableExercises, done);
});
/**
 * Workouts
 */
hooks.beforeEach(function (transaction, done) {
    //console.log("running before All");
    db.cleanUpTable(tableWorkouts, done);
});
//GET (200) /workouts
hooks.before('Workouts > List All Workout', (transaction) => {
    transaction.request.headers.Authorization = myToken;
});
//PUT (200) /workouts
hooks.before('Workouts > CREATE a new Workout', (transaction, done) => {
    //console.log("running before");
    db.cleanUpTable(tableWorkouts, done);
    transaction.request.headers.Authorization = myToken;
});
hooks.after('Workouts > CREATE a new Workout', (transaction, done) => {
    //console.log("running after");
    db.cleanUpTable(tableWorkouts, done);
    transaction.request.headers.Authorization = myToken;
});
//GET (200) /workouts/1
hooks.before('Workout Distinct > Get a specific Workout', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.createRecord(tableWorkouts, done);
});
hooks.after('Workout Distinct > Get a specific Workout', (transaction, done) => {
    db.cleanUpTable(tableWorkouts, done);
});
//PATCH (201) /workouts/1
hooks.before('Workout Distinct > Update a specific workout', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.createRecord(tableWorkouts, done);
});
hooks.after('Workout Distinct > Update a specific workout', (transaction, done) => {
    db.cleanUpTable(tableWorkouts, done);
});
//DELETE (201) /workouts/1
hooks.before('Workout Distinct > Delete a specific Workout', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.createRecord(tableWorkouts, done);
});
hooks.after('Workout Distinct > Delete a specific Workout', (transaction, done) => {
    db.cleanUpTable(tableWorkouts, done);
});
//GET (200) /workouts/1/exercises
hooks.before('Exercises from Workout > Get all Exercises from a Specific Workout', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationship(tableWorkouts, tableExercises, tableWorkExer, done);
});
hooks.after('Exercises from Workout > Get all Exercises from a Specific Workout', (transaction, done) => {
    db.cleanUpRelationship(tableWorkouts, tableExercises, tableWorkExer, done);
});
//GET (200) /workouts/1/exercises/1
hooks.before('Exercise Distinct from Workout > Get a Specific Exercise from a Specific Workout', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationship(tableWorkouts, tableExercises, tableWorkExer, done);
});
hooks.after('Exercise Distinct from Workout > Get a Specific Exercise from a Specific Workout', (transaction, done) => {
    db.cleanUpRelationship(tableWorkouts, tableExercises, tableWorkExer, done);
});
//PUT (201) /workouts/1/exercises/1
hooks.before('Exercise Distinct from Workout > Add a Exercise to a Workout', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationshipNoJunction(tableExercises, tableWorkouts, done);
});
hooks.after('Exercise Distinct from Workout > Add a Exercise to a Workout', (transaction, done) => {
    db.cleanUpRelationship(tableWorkouts, tableExercises, tableWorkExer, done);
});
//DELETE (201) /workouts/1/exercises/1
hooks.before('Exercise Distinct from Workout > Removes a Exercise from a Workout', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationship(tableWorkouts, tableExercises, tableWorkExer, done);
});
hooks.after('Exercise Distinct from Workout > Removes a Exercise from a Workout', (transaction, done) => {
    db.cleanUpRelationship(tableWorkouts, tableExercises, tableWorkExer, done);
});
//GET (200) GET (200) /workouts/1/workoutsets
hooks.before('Sets from Workout > Get all Sets from a Specific Workout', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationshipForRelated(tableWorkouts, tableExercises, tableWorkExer, tableWorkSets, done);
});
hooks.after('Sets from Workout > Get all Sets from a Specific Workout', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.cleanUpRelationshipForRelated(tableWorkouts, tableExercises, tableWorkExer, tableWorkSets, done);
});
//-======workout users  =============
//GET (200) /workouts/1/users
hooks.before('Users from Workout > Get all Users from a Specific Workout', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationship(tableWorkouts, tableUsers, tableWorkUsers, done);
});
hooks.after('Exercises from Workout > Get all Exercises from a Specific Workout', (transaction, done) => {
    db.cleanUpRelationship(tableWorkouts, tableUsers, tableWorkUsers, done);
});
//GET (200) /workouts/1/users/f90ac968-504c-11ea-8397-22000aef4e0b
hooks.before('User Distinct from Specific Workout > Get Details from a Specific User from a Specific Workout', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationship(tableWorkouts, tableUsers, tableWorkUsers, done);
});
hooks.after('User Distinct from Specific Workout > Get Details from a Specific User from a Specific Workout', (transaction, done) => {
    db.cleanUpRelationship(tableWorkouts, tableUsers, tableWorkUsers, done);
});
// PUT (201) /workouts/1/users/f90ac968-504c-11ea-8397-22000aef4e0b
hooks.before('User Distinct from Specific Workout > Add a Workout to a User', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationshipNoJunction(tableUsers, tableWorkouts, done);
});
hooks.after('User Distinct from Specific Workout > Add a Workout to a User', (transaction, done) => {
    db.cleanUpRelationship(tableWorkouts, tableUsers, tableWorkUsers, done);
});
// DELETE (201) /workouts/1/users/f90ac968-504c-11ea-8397-22000aef4e0b
hooks.before('User Distinct from Specific Workout > Removes a Workout from a User', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationship(tableWorkouts, tableUsers, tableWorkUsers, done);
});
hooks.after('User Distinct from Specific Workout > Removes a Workout from a User', (transaction, done) => {
    db.cleanUpRelationship(tableWorkouts, tableUsers, tableWorkUsers, done);
});
/**
* WorkUsers
*
*/
// GET (200) /workusers/1/workouts
hooks.before('Specific WorkUser Workout Details > Get User Details', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationship(tableWorkouts, tableUsers, tableWorkUsers, done);
});
hooks.after('Specific WorkUser Workout Details > Get User Details', (transaction, done) => {
    db.cleanUpRelationship(tableWorkouts, tableUsers, tableWorkUsers, done);
});
// GET (200) /workusers/1/users
hooks.before('Specific WorkUser User Details > Get User Details', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationship(tableWorkouts, tableUsers, tableWorkUsers, done);
});
hooks.after('Specific WorkUser User Details > Get User Details', (transaction, done) => {
    db.cleanUpRelationship(tableWorkouts, tableUsers, tableWorkUsers, done);
});
//GET (200) /workusers
hooks.before('WorkUsers > List All WorkUsers', (transaction) => {
    transaction.request.headers.Authorization = myToken;
});
//PUT (200) /workusers
hooks.before('WorkUsers > CREATE a new WorkUser', (transaction, done) => {
    //console.log("running before");
    db.setupRelationshipNoJunction(tableWorkouts, tableUsers, done);
    transaction.request.headers.Authorization = myToken;
});
hooks.after('WorkUsers > CREATE a new WorkUser', (transaction, done) => {
    //console.log("running after");
    db.cleanUpRelationship(tableWorkouts, tableUsers, tableWorkUsers, done);
    transaction.request.headers.Authorization = myToken;
});
//PATCH (201) /workusers/1
hooks.before('Specific WorkUser > Update a specific WorkUser', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationship(tableWorkouts, tableUsers, tableWorkUsers, done);
});
hooks.after('Specific WorkUser > Update a specific WorkUser', (transaction, done) => {
    db.cleanUpRelationship(tableWorkouts, tableUsers, tableWorkUsers, done);
});
//DELETE (201) /workusers/1
hooks.before('Specific WorkUser > Delete a specific WorkUser', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationship(tableWorkouts, tableUsers, tableWorkUsers, done);
});
hooks.after('Specific WorkUser > Delete a specific WorkUser', (transaction, done) => {
    db.cleanUpRelationship(tableWorkouts, tableUsers, tableWorkUsers, done);
});
//GET (200) /workusers/1
hooks.before('Specific WorkUser > Get a specific WorkUser', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationship(tableWorkouts, tableUsers, tableWorkUsers, done);
});
hooks.after('Specific WorkUser > Get a specific WorkUser', (transaction, done) => {
    db.cleanUpRelationship(tableWorkouts, tableUsers, tableWorkUsers, done);
});
//====================OBJECTIVES ================= 20/02 =====================
//GET (200) /objectives
hooks.before('Objectives > List All Objectives', (transaction) => {
    transaction.request.headers.Authorization = myToken;
});
//PUT (200) /objectives
hooks.before('Objectives > CREATE a new Objective', (transaction, done) => {
    //console.log("running before");
    db.cleanUpTable(tableObjectives, done);
    transaction.request.headers.Authorization = myToken;
});
hooks.after('Objectives > CREATE a new Objective', (transaction, done) => {
    //console.log("running after");
    db.cleanUpTable(tableObjectives, done);
    transaction.request.headers.Authorization = myToken;
});
//GET (200) /objectives/1
hooks.before('Objectives Distinct > Get a specific Objective', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.createRecord(tableObjectives, done);
});
hooks.after('Objectives Distinct > Get a specific Objective', (transaction, done) => {
    db.cleanUpTable(tableObjectives, done);
});
//PATCH (201) /objectives/1
hooks.before('Objectives Distinct > Update a specific Objective', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.createRecord(tableObjectives, done);
});
hooks.after('Objectives Distinct > Update a specific Objective', (transaction, done) => {
    db.cleanUpTable(tableObjectives, done);
});
//DELETE (201) /objectives/1
hooks.before('Objectives Distinct > Delete a specific Objective', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.createRecord(tableObjectives, done);
});
hooks.after('Objectives Distinct > Delete a specific Objective', (transaction, done) => {
    db.cleanUpTable(tableObjectives, done);
});
//==========GOAL TYPES ==============
//GET (200) /goaltypes
hooks.before('GoalTypes > List All GoalTypes', (transaction) => {
    transaction.request.headers.Authorization = myToken;
});
//PUT (200) /goaltypes
hooks.before('GoalTypes > CREATE a new Goal Type', (transaction, done) => {
    //console.log("running before");
    db.cleanUpTable(tableGoalTypes, done);
    transaction.request.headers.Authorization = myToken;
});
hooks.after('GoalTypes > CREATE a new Goal Type', (transaction, done) => {
    //console.log("running after");
    db.cleanUpTable(tableGoalTypes, done);
    transaction.request.headers.Authorization = myToken;
});
//GET (200) /goaltypes/1
hooks.before('Goal Type Distinct > Get a specific Goal Type', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.createRecord(tableGoalTypes, done);
});
hooks.after('Goal Type Distinct > Get a specific Goal Type', (transaction, done) => {
    db.cleanUpTable(tableGoalTypes, done);
});
//PATCH (201) /goaltypes/1
hooks.before('Goal Type Distinct > Update a specific Goal Type', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.createRecord(tableGoalTypes, done);
});
hooks.after('Goal Type Distinct > Update a specific Goal Type', (transaction, done) => {
    db.cleanUpTable(tableGoalTypes, done);
});
//DELETE (201) /goaltypes/1
hooks.before('Goal Type Distinct > Delete a specific Goal Type', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.createRecord(tableGoalTypes, done);
});
hooks.after('Goal Type Distinct > Delete a specific Goal Type', (transaction, done) => {
    db.cleanUpTable(tableGoalTypes, done);
});
//===================WORKOUT SETS===================
//GET (200) /workoutsets
hooks.before('Sets > List All Sets from Workouts', (transaction) => {
    transaction.request.headers.Authorization = myToken;
});
// GET (200) /workoutsets/1/workexers
hooks.before('WorkExer from Set > Get the WorkExer a Set belongs to', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationshipForRelated(tableWorkouts, tableExercises, tableWorkExer, tableWorkSets, done);
});
hooks.after('WorkExer from Set > Get the WorkExer a Set belongs to', (transaction, done) => {
    db.cleanUpRelationshipForRelated(tableWorkouts, tableExercises, tableWorkExer, tableWorkSets, done);
});
//PUT (200) /workoutsets
hooks.before('Sets > CREATE a new Set for Workouts', (transaction, done) => {
    //console.log("running before");
    db.setupRelationship(tableWorkouts, tableExercises, tableWorkExer, done);
    transaction.request.headers.Authorization = myToken;
});
hooks.after('Sets > CREATE a new Set for Workouts', (transaction, done) => {
    //console.log("running after");
    db.cleanUpRelationshipForRelated(tableWorkouts, tableExercises, tableWorkExer, tableWorkSets, done);
    transaction.request.headers.Authorization = myToken;
});
//GET (200) /workoutsets/1
hooks.before('Sets from Workouts Distinct > Get a specific Sets from Workouts', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationshipForRelated(tableWorkouts, tableExercises, tableWorkExer, tableWorkSets, done);
});
hooks.after('Sets from Workouts Distinct > Get a specific Sets from Workouts', (transaction, done) => {
    db.cleanUpRelationshipForRelated(tableWorkouts, tableExercises, tableWorkExer, tableWorkSets, done);
});
// PATCH (201) /workoutsets/1
hooks.before('Sets from Workouts Distinct > Update a specific Set from Workouts', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationshipForRelated(tableWorkouts, tableExercises, tableWorkExer, tableWorkSets, done);
});
hooks.after('Sets from Workouts Distinct > Update a specific Set from Workouts', (transaction, done) => {
    db.cleanUpRelationshipForRelated(tableWorkouts, tableExercises, tableWorkExer, tableWorkSets, done);
});
// DELETE (201) /workoutsets/1
hooks.before('Sets from Workouts Distinct > Delete a specific Sets from Workouts', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationshipForRelated(tableWorkouts, tableExercises, tableWorkExer, tableWorkSets, done);
});
hooks.after('Sets from Workouts Distinct > Delete a specific Sets from Workouts', (transaction, done) => {
    db.cleanUpRelationshipForRelated(tableWorkouts, tableExercises, tableWorkExer, tableWorkSets, done);
});
// ===========EQUIPMENTS=====================
// GET (200) /equipments
hooks.before('Equipments > List All Equipments', (transaction) => {
    transaction.request.headers.Authorization = myToken;
});
// PUT (200) /equipments
hooks.before('Equipments > CREATE a new Equipment', (transaction, done) => {
    //console.log("running before");
    db.cleanUpTable(tableEquipments, done);
    transaction.request.headers.Authorization = myToken;
});
hooks.after('Equipments > CREATE a new Equipment', (transaction, done) => {
    //console.log("running after");
    db.cleanUpTable(tableEquipments, done);
    transaction.request.headers.Authorization = myToken;
});
// GET (200) /equipments/1
hooks.before('Equipment Distinct > Get a specific Equipment', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.createRecord(tableEquipments, done);
});
hooks.after('Equipment Distinct > Get a specific Equipment', (transaction, done) => {
    db.cleanUpTable(tableEquipments, done);
});
// PATCH (201) /equipments/1
hooks.before('Equipment Distinct > Update a specific Equipment', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.createRecord(tableEquipments, done);
});
hooks.after('Equipment Distinct > Update a specific Equipment', (transaction, done) => {
    db.cleanUpTable(tableEquipments, done);
});
//DELETE (201) /equipments/1
hooks.before('Equipment Distinct > Delete a specific Equipment', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.createRecord(tableEquipments, done);
});
hooks.after('Equipment Distinct > Delete a specific Equipment', (transaction, done) => {
    db.cleanUpTable(tableEquipments, done);
});
//GET GET (200) /equipments/1/exercises
hooks.before('Exercises of Equipment > Get all Exercises from a Specific Equipment', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationship(tableExercises, tableEquipments, tableExerEquip, done);
});
hooks.after('Exercises of Equipment > Get all Exercises from a Specific Equipment', (transaction, done) => {
    db.cleanUpRelationship(tableExercises, tableEquipments, tableExerEquip, done);
});
// GET (200) /equipments/1/exercises/1
hooks.before('Exercise Distinct from Specific Equipment > Get Details from a Specific Exercise of a Specific Equipment', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationship(tableExercises, tableEquipments, tableExerEquip, done);
});
hooks.after('Exercise Distinct from Specific Equipment > Get Details from a Specific Exercise of a Specific Equipment', (transaction, done) => {
    db.cleanUpRelationship(tableExercises, tableEquipments, tableExerEquip, done);
});
// PUT (201) /equipments/1/exercises/1
hooks.before('Exercise Distinct from Specific Equipment > Add a Equipment to a Exercise', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationshipNoJunction(tableExercises, tableEquipments, done);
});
hooks.after('Exercise Distinct from Specific Equipment > Add a Equipment to a Exercise', (transaction, done) => {
    db.cleanUpRelationship(tableExercises, tableEquipments, tableExerEquip, done);
});
// DELETE (201) /equipments/1/exercises/1
hooks.before('Exercise Distinct from Specific Equipment > Removes a Equipment from a Exercise', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationship(tableExercises, tableEquipments, tableExerEquip, done);
});
hooks.after('Exercise Distinct from Specific Equipment > Removes a Equipment from a Exercise', (transaction, done) => {
    db.cleanUpRelationship(tableExercises, tableEquipments, tableExerEquip, done);
});
//============== CLASSES ===================
// GET (200) /classes
hooks.before('Muscle/Exercises Classes > List All Classes', (transaction) => {
    transaction.request.headers.Authorization = myToken;
});
// PUT (200) /classes
hooks.before('Muscle/Exercises Classes > CREATE a new Class', (transaction, done) => {
    //console.log("running before");
    db.cleanUpTable(tableClasses, done);
    transaction.request.headers.Authorization = myToken;
});
hooks.after('Muscle/Exercises Classes > CREATE a new Class', (transaction, done) => {
    //console.log("running after");
    db.cleanUpTable(tableClasses, done);
    transaction.request.headers.Authorization = myToken;
});
// GET (200) /classes/1
hooks.before('Class Distinct > Get a specific Class', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.createRecord(tableClasses, done);
});
hooks.after('Class Distinct > Get a specific Class', (transaction, done) => {
    db.cleanUpTable(tableClasses, done);
});
// PATCH (201) /classes/1
hooks.before('Class Distinct > Update a specific Class', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.createRecord(tableClasses, done);
});
hooks.after('Class Distinct > Update a specific Class', (transaction, done) => {
    db.cleanUpTable(tableClasses, done);
});
// DELETE (201) /classes/1
hooks.before('Class Distinct > Delete a specific Class', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.createRecord(tableClasses, done);
});
hooks.after('Class Distinct > Delete a specific Class', (transaction, done) => {
    db.cleanUpTable(tableClasses, done);
});
// GET (200) /classes/1/exercises
hooks.before('Exercises for Distinct class > Get a specific Class', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationshipNoJunction(tableClasses, tableExercises, done);
});
hooks.after('Exercises for Distinct class > Get a specific Class', (transaction, done) => {
    db.cleanUpJunctionAndMaster(tableClasses, tableExercises, done);
});
//=============MOVIMENTS ===============
// GET (200) /moviments
hooks.before('Muscle/Exercises Moviments > List All Moviments', (transaction) => {
    transaction.request.headers.Authorization = myToken;
});
// PUT (200) /moviments
hooks.before('Muscle/Exercises Moviments > CREATE a new Moviment', (transaction, done) => {
    //console.log("running before");
    db.cleanUpTable(tableMoviments, done);
    transaction.request.headers.Authorization = myToken;
});
hooks.after('Muscle/Exercises Moviments > CREATE a new Moviment', (transaction, done) => {
    //console.log("running after");
    db.cleanUpTable(tableMoviments, done);
    transaction.request.headers.Authorization = myToken;
});
// GET (200) /moviments/1
hooks.before('Moviment Distinct > Get a specific Moviment', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.createRecord(tableMoviments, done);
});
hooks.after('Moviment Distinct > Get a specific Moviment', (transaction, done) => {
    db.cleanUpTable(tableMoviments, done);
});
// PATCH (201) /moviments/1
hooks.before('Moviment Distinct > Update a specific Moviment', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.createRecord(tableMoviments, done);
});
hooks.after('Moviment Distinct > Update a specific Moviment', (transaction, done) => {
    db.cleanUpTable(tableMoviments, done);
});
// DELETE (201) /moviments/1
hooks.before('Moviment Distinct > Delete a specific Moviment', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.createRecord(tableMoviments, done);
});
hooks.after('Moviment Distinct > Delete a specific Moviment', (transaction, done) => {
    db.cleanUpTable(tableMoviments, done);
});
// GET (200) /moviments/1/exercises
hooks.before('Exercises for Distinct moviment > Get a specific Moviment', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationshipNoJunction(tableMoviments, tableExercises, done);
});
hooks.after('Exercises for Distinct moviment > Get a specific Moviment', (transaction, done) => {
    db.cleanUpJunctionAndMaster(tableExercises, tableMoviments, done);
});
//============  GOAL USERS ====================
// GET (200) /goalusers
hooks.before('GoalUsers > List All GoalUsers', (transaction) => {
    transaction.request.headers.Authorization = myToken;
});
// PUT (200) /goalusers
hooks.before('GoalUsers > CREATE a new GoalUser', (transaction, done) => {
    //console.log("running before");
    db.setupRelationshipNoJunction(tableGoals, tableUsers, done);
    transaction.request.headers.Authorization = myToken;
});
hooks.after('GoalUsers > CREATE a new GoalUser', (transaction, done) => {
    //console.log("running after");
    db.cleanUpRelationship(tableGoals, tableUsers, tableGoalUsers, done);
    transaction.request.headers.Authorization = myToken;
});
// PATCH (201) /goalusers/1
hooks.before('GoalUser > Update a specific GoalUser', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationship(tableGoals, tableUsers, tableGoalUsers, done);
});
hooks.after('GoalUser > Update a specific GoalUser', (transaction, done) => {
    db.cleanUpRelationship(tableGoals, tableUsers, tableGoalUsers, done);
});
// DELETE (201) /goalusers/1
hooks.before('GoalUser > Delete a specific GoalUser', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationship(tableGoals, tableUsers, tableGoalUsers, done);
});
hooks.after('GoalUser > Delete a specific GoalUser', (transaction, done) => {
    db.cleanUpRelationship(tableGoals, tableUsers, tableGoalUsers, done);
});
// GET (200) /goalusers/1
hooks.before('GoalUser > Get a specific GoalUser', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationship(tableGoals, tableUsers, tableGoalUsers, done);
});
hooks.after('GoalUser > Get a specific GoalUser', (transaction, done) => {
    db.cleanUpRelationship(tableGoals, tableUsers, tableGoalUsers, done);
});
//=============  GOALS ============================
// GET (200) /goals
hooks.before('Goals > List All Goals', (transaction) => {
    transaction.request.headers.Authorization = myToken;
});
// PUT (200) /goals
hooks.before('Goals > CREATE a new Goal', (transaction, done) => {
    //console.log("running before");
    db.cleanUpTable(tableGoals, done);
    transaction.request.headers.Authorization = myToken;
});
hooks.after('Goals > CREATE a new Goal', (transaction, done) => {
    //console.log("running after");
    db.cleanUpTable(tableGoals, done);
    transaction.request.headers.Authorization = myToken;
});
// PATCH (201) /goals/1
hooks.before('Specific Goal > Update a specific Goal', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.createRecord(tableGoals, done);
});
hooks.after('Specific Goal > Update a specific Goal', (transaction, done) => {
    db.cleanUpTable(tableGoals, done);
});
// DELETE (201) /goals/1
hooks.before('Specific Goal > Delete a specific Goal', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.createRecord(tableGoals, done);
});
hooks.after('Specific Goal > Delete a specific Goal', (transaction, done) => {
    db.cleanUpTable(tableGoals, done);
});
// GET (200) /goals/1
hooks.before('Specific Goal > Get a specific Goal', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.createRecord(tableGoals, done);
});
hooks.after('Specific Goal > Get a specific Goal', (transaction, done) => {
    db.cleanUpTable(tableGoals, done);
});
// goals /users
/*
//GET  /execises/1/workouts
hooks.before('Workout from Exercises > Get all Workouts from a Specific Exercise', (transaction, done) => {
transaction.request.headers.Authorization = myToken;
db.setupRelationship(tableUsers,tableGoals,tableGoalUsers,done);

});

hooks.after('Workout from Exercises > Get all Workouts from a Specific Exercise', (transaction, done) => {
db.cleanUpRelationship(tableGoals,tableUsers,tableGoalUsers,done);

});


//DELETE  /execises/1/workouts/1
hooks.before('Workout Distinct from Exercise > Removes a Exercise from a workout', (transaction, done) => {
transaction.request.headers.Authorization = myToken;
db.setupRelationship(tableGoals,tableUsers,tableGoalUsers,done);
});
    
hooks.after('Workout Distinct from Exercise > Removes a Exercise from a workout', (transaction, done) => {
db.cleanUpRelationship(tableGoals,tableUsers,tableGoalUsers,done);
});

//GET  /execises/1/workouts/1
hooks.before('Workout Distinct from Exercise > Get a Specific Workout from a Specific Exercise', (transaction, done) => {
transaction.request.headers.Authorization = myToken;
db.setupRelationship(tableGoals,tableUsers,tableGoalUsers,done);
});

hooks.after('Workout Distinct from Exercise > Get a Specific Workout from a Specific Exercise', (transaction, done) => {
db.cleanUpRelationship(tableGoals,tableUsers,tableGoalUsers,done);
})


// PUT  /exercises/1/workouts/1
hooks.before('Workout Distinct from Exercise > Add a Exercise into a workout', (transaction, done) => {
transaction.request.headers.Authorization = myToken;
db.setupRelationshipNoJunction(tableGoals,tableUsers,done);

})

hooks.after('Workout Distinct from Exercise > Add a Exercise into a workout', (transaction, done) => {
db.cleanUpRelationship(tableGoals,tableUsers,tableGoalUsers,done);
});

*/
// ============== MEDIAS ==========================
// GET (200) /medias
hooks.before('Medias > GET Several midia resource', (transaction) => {
    transaction.request.headers.Authorization = myToken;
});
// PUT (200) /medias
hooks.before('Medias > CREATE one Media Resource', (transaction, done) => {
    //console.log("running before");
    db.cleanUpTable(tableMedias, done);
    transaction.request.headers.Authorization = myToken;
});
hooks.after('Medias > CREATE one Media Resource', (transaction, done) => {
    //console.log("running after");
    db.cleanUpTable(tableMedias, done);
    transaction.request.headers.Authorization = myToken;
});
// PATCH (201) /medias/1
hooks.before('Media > Edit one Media Resource', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.createRecord(tableMedias, done);
});
hooks.after('Media > Edit one Media Resource', (transaction, done) => {
    db.cleanUpTable(tableMedias, done);
});
// DELETE (201) /medias/1
hooks.before('Media > Delete one Media Resource', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.createRecord(tableMedias, done);
});
hooks.after('Media > Delete one Media Resource', (transaction, done) => {
    db.cleanUpTable(tableMedias, done);
});
// GET (200) /medias/1
hooks.before('Media > Get one media resource', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.createRecord(tableMedias, done);
});
hooks.after('Media > Get one media resource', (transaction, done) => {
    db.cleanUpTable(tableMedias, done);
});
//+++++++========= USERS ====================
// GET (200) /users
hooks.before('Users > List All Users', (transaction) => {
    transaction.request.headers.Authorization = myToken;
});
//PUT (200) /users
hooks.before('Users > CREATE a new User', (transaction, done) => {
    //console.log("running before");
    db.cleanUpTable(tableUsers, done);
    transaction.request.headers.Authorization = myToken;
});
hooks.after('Users > CREATE a new User', (transaction, done) => {
    //console.log("running after");
    db.cleanUpTable(tableUsers, done);
    transaction.request.headers.Authorization = myToken;
});
// PATCH (201) /users/1
hooks.before('User Distinct > Update one specific user', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.createRecord(tableUsers, done);
});
hooks.after('User Distinct > Update one specific user', (transaction, done) => {
    db.cleanUpTable(tableUsers, done);
});
// DELETE (201) /users/1
hooks.before('User Distinct > Delete a specific User', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.createRecord(tableUsers, done);
});
hooks.after('User Distinct > Delete a specific User', (transaction, done) => {
    db.cleanUpTable(tableUsers, done);
});
// GET (200) /users/1
hooks.before('User Distinct > Get a specific User', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.createRecord(tableUsers, done);
});
hooks.after('User Distinct > Get a specific User', (transaction, done) => {
    db.cleanUpTable(tableUsers, done);
});
//====== Users Routines==============
// GET (200) GET (200) /users/f90ac968-504c-11ea-8397-22000aef4e0b/routines
hooks.before('Routines from user > List Routines belonging to a user', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationshipNoJunction(tableUsers, tableRoutines, done);
});
hooks.after('Routines from user > List Routines belonging to a user', (transaction, done) => {
    db.cleanUpJunctionAndMaster(tableRoutines, tableUsers, done);
});
/* The following routes do not have sense because a routine can belong only to one user.
so to get a routine, or delete, or put we can use the routes /routine
*/
/*
 // DELETE (201) /users/f90ac968-504c-11ea-8397-22000aef4e0b/routines/1
 hooks.before('Routine Distinct from User > Removes a User from a routine', (transaction, done) => {
 transaction.request.headers.Authorization = myToken;
 db.setupRelationshipNoJunction(tableUsers,tableRoutines,done);
 });
     
 hooks.after('Routine Distinct from User > Removes a User from a routine', (transaction, done) => {
   db.cleanUpJunctionAndMaster(tableRoutines,tableUsers, done);
 });
 
 
 // GET (200) /users/f90ac968-504c-11ea-8397-22000aef4e0b/routines/1
 hooks.before('Routine Distinct from User > Get a Specific Routine from a Specific User', (transaction, done) => {
 transaction.request.headers.Authorization = myToken;
 db.setupRelationshipNoJunction(tableUsers,tableRoutines,done);
 });
 
 hooks.after('Routine Distinct from User > Get a Specific Routine from a Specific User', (transaction, done) => {
 db.cleanUpJunctionAndMaster(tableRoutines,tableUsers, done)
 })
 
 
 // PUT (201) /users/f90ac968-504c-11ea-8397-22000aef4e0b/routines/1
 hooks.before('Routine Distinct from User > Add a User into a routine', (transaction, done) => {
 transaction.request.headers.Authorization = myToken;
 db.createRecord(tableUsers,done);
 
 })
 
 hooks.after('Routine Distinct from User > Add a User into a routine', (transaction, done) => {
   db.cleanUpTable(tableUsers,done);
 });
 
*/
//====== Users Workouts==============
// GET (200) /users/1/workouts
hooks.before('Workouts from user > List Workouts belonging to a user', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationship(tableWorkouts, tableUsers, tableWorkUsers, done);
});
hooks.after('Workouts from user > List Workouts belonging to a user', (transaction, done) => {
    db.cleanUpRelationship(tableUsers, tableWorkouts, tableWorkUsers, done);
});
// DELETE (201) /users/1/workouts/1
hooks.before('Workout Distinct from User > Removes a Exercise from a workout', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationship(tableWorkouts, tableUsers, tableWorkUsers, done);
});
hooks.after('Workout Distinct from User > Removes a Exercise from a workout', (transaction, done) => {
    db.cleanUpRelationship(tableUsers, tableWorkouts, tableWorkUsers, done);
});
// GET (200) /users/1/workouts/1
hooks.before('Workout Distinct from User > Get a Specific Workout from a Specific User', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationship(tableWorkouts, tableUsers, tableWorkUsers, done);
});
hooks.after('Workout Distinct from User > Get a Specific Workout from a Specific User', (transaction, done) => {
    db.cleanUpRelationship(tableUsers, tableWorkouts, tableWorkUsers, done);
});
// PUT (201) /users/1/workouts/1
hooks.before('Workout Distinct from User > Add a User into a workout', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationshipNoJunction(tableUsers, tableWorkouts, done);
});
hooks.after('Workout Distinct from User > Add a User into a workout', (transaction, done) => {
    db.cleanUpRelationship(tableUsers, tableWorkouts, tableWorkUsers, done);
});
// -=====users goals ===============
// GET (200) /users/1/goals
hooks.before('Goals from user > List Goals belonging to a user', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationship(tableGoals, tableUsers, tableGoalUsers, done);
});
hooks.after('Goals from user > List Goals belonging to a user', (transaction, done) => {
    db.cleanUpRelationship(tableUsers, tableGoals, tableGoalUsers, done);
});
// DELETE (201) /users/1/goals/1
hooks.before('Goal Distinct from User > Removes a Goal from a user', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationship(tableGoals, tableUsers, tableGoalUsers, done);
});
hooks.after('Goal Distinct from User > Removes a Goal from a user', (transaction, done) => {
    db.cleanUpRelationship(tableUsers, tableGoals, tableGoalUsers, done);
});
// GET (200) /users/1/goals/1
hooks.before('Goal Distinct from User > Get a Specific Goal from a Specific User', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationship(tableGoals, tableUsers, tableGoalUsers, done);
});
hooks.after('Goal Distinct from User > Get a Specific Goal from a Specific User', (transaction, done) => {
    db.cleanUpRelationship(tableUsers, tableGoals, tableGoalUsers, done);
});
// PUT (201) /users/1/goals/1
hooks.before('Goal Distinct from User > Add a User into a Goal', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationshipNoJunction(tableUsers, tableGoals, done);
});
hooks.after('Goal Distinct from User > Add a User into a Goal', (transaction, done) => {
    db.cleanUpRelationship(tableUsers, tableGoals, tableGoalUsers, done);
});
//=========ROUTINE SETS ====================
//GET (200) /routinesets
hooks.before('Routine Sets > List All Sets from Routines', (transaction) => {
    transaction.request.headers.Authorization = myToken;
});
// GET (200) /routinesets/1/routexers
hooks.before('RoutExer from Set > Get the RoutExer a Set belongs to', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationshipForRelatedWithRoutine(tableRoutines, tableExercises, tableRoutExer, tableRoutSets, done);
});
hooks.after('RoutExer from Set > Get the RoutExer a Set belongs to', (transaction, done) => {
    db.cleanUpRelationshipForRelatedWithRoutine(tableRoutines, tableExercises, tableRoutExer, tableRoutSets, done);
});
// PUT (200) /routinesets
hooks.before('Routine Sets > CREATE a new Set for a Routine', (transaction, done) => {
    //console.log("running before");
    db.setupRelationshipWithRoutine(tableRoutines, tableExercises, tableRoutExer, done);
    transaction.request.headers.Authorization = myToken;
});
hooks.after('Routine Sets > CREATE a new Set for a Routine', (transaction, done) => {
    //console.log("running after");
    db.cleanUpRelationshipForRelatedWithRoutine(tableRoutines, tableExercises, tableRoutExer, tableRoutSets, done);
    transaction.request.headers.Authorization = myToken;
});
// GET (200) /routinesets/1
hooks.before('Sets from Routines Distinct > Get a specific Sets from Routines', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationshipForRelatedWithRoutine(tableRoutines, tableExercises, tableRoutExer, tableRoutSets, done);
});
hooks.after('Sets from Routines Distinct > Get a specific Sets from Routines', (transaction, done) => {
    db.cleanUpRelationshipForRelatedWithRoutine(tableRoutines, tableExercises, tableRoutExer, tableRoutSets, done);
});
// PATCH (201) /routinesets/1
hooks.before('Sets from Routines Distinct > Update a specific Set from Routines', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationshipForRelatedWithRoutine(tableRoutines, tableExercises, tableRoutExer, tableRoutSets, done);
});
hooks.after('Sets from Routines Distinct > Update a specific Set from Routines', (transaction, done) => {
    db.cleanUpRelationshipForRelatedWithRoutine(tableRoutines, tableExercises, tableRoutExer, tableRoutSets, done);
});
// DELETE (201) /routinesets/1 
hooks.before('Sets from Routines Distinct > Delete a specific Sets from Routines', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationshipForRelatedWithRoutine(tableRoutines, tableExercises, tableRoutExer, tableRoutSets, done);
});
hooks.after('Sets from Routines Distinct > Delete a specific Sets from Routines', (transaction, done) => {
    db.cleanUpRelationshipForRelatedWithRoutine(tableRoutines, tableExercises, tableRoutExer, tableRoutSets, done);
});
// =============  ROUTINES ==================
// GET (200) /routines
hooks.before('Routines > List All Routines', (transaction) => {
    transaction.request.headers.Authorization = myToken;
});
// PUT (200) /routines
hooks.before('Routines > CREATE a new Routine', (transaction, done) => {
    //console.log("running before");
    //db.setupRelationship(tableWorkouts,tableUsers,tableWorkUsers,done);
    //create table users
    db.createRecord(tableUsers, done);
    transaction.request.headers.Authorization = myToken;
});
hooks.after('Routines > CREATE a new Routine', (transaction, done) => {
    //console.log("running after");
    db.cleanUpJunctionAndMaster(tableRoutines, tableUsers, done);
    //db.cleanUpRelationshipForRelated(tableWorkouts,tableUsers,tableWorkUsers, tableRoutines,done);
    transaction.request.headers.Authorization = myToken;
});
// GET (200) /routines/1
hooks.before('Routine > Get a specific Routine', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationshipNoJunction(tableUsers, tableRoutines, done);
    //db.setupRelationshipForRelated(tableWorkouts,tableUsers,tableWorkUsers, tableRoutines,done);
});
hooks.after('Routine > Get a specific Routine', (transaction, done) => {
    db.cleanUpJunctionAndMaster(tableRoutines, tableUsers, done);
    //db.cleanUpRelationshipForRelated(tableWorkouts,tableUsers,tableWorkUsers, tableRoutines,done);
});
// PATCH (201) /routines/1
hooks.before('Routine > Update specific Routine', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationshipNoJunction(tableUsers, tableRoutines, done);
    //db.setupRelationshipForRelated(tableWorkouts,tableUsers,tableWorkUsers, tableRoutines,done);
});
hooks.after('Routine > Update specific Routine', (transaction, done) => {
    db.cleanUpJunctionAndMaster(tableRoutines, tableUsers, done);
    //db.cleanUpRelationshipForRelated(tableWorkouts,tableUsers,tableWorkUsers, tableRoutines,done);
});
// DELETE (201) /routines/1
hooks.before('Routine > Delete a specific Routine', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationshipNoJunction(tableUsers, tableRoutines, done);
    //db.setupRelationshipForRelated(tableWorkouts,tableUsers,tableWorkUsers, tableRoutines,done);
});
hooks.after('Routine > Delete a specific Routine', (transaction, done) => {
    db.cleanUpJunctionAndMaster(tableRoutines, tableUsers, done);
    //db.cleanUpRelationshipForRelated(tableWorkouts,tableUsers,tableWorkUsers, tableRoutines,done);
});
// GET (200) /routines/1/user
hooks.before('Specific User detail from Routine > Get User Details', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationshipNoJunction(tableUsers, tableRoutines, done);
    //db.setupRelationshipForRelated(tableWorkouts,tableUsers,tableWorkUsers, tableRoutines,done);
});
hooks.after('Specific User detail from Routine > Get User Details', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.cleanUpJunctionAndMaster(tableRoutines, tableUsers, done);
    //db.cleanUpRelationshipForRelated(tableWorkouts,tableUsers,tableWorkUsers, tableRoutines,done);
});
// GET (200) /routines/1/workout
hooks.before('Specific Routine Workout Details > Get Workout Details', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    //db.setupRelationship(tableWorkouts,tableRoutines,tableWorkExer,done)
    //db.setupRelationshipForRelated(tableWorkouts,tableUsers, tableRoutines,tableWorkExer,done);
    db.setupRelationshipTripleForRelated(tableWorkouts, tableExercises, tableUsers, tableRoutines, tableRoutExer, done);
    //db.setupRelationshipForRelated(tableWorkouts,tableUsers,tableWorkUsers, tableRoutines,done);
});
hooks.after('Specific Routine Workout Details > Get Workout Details', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    //db.cleanUpRelationship(tableWorkouts,tableRoutines,tableWorkExer,done);
    //
    //db.cleanUpRelationshipForRelated(tableWorkouts,tableUsers, tableRoutines,tableWorkExer,done);
    db.cleanUpRelationshipTripleForRelated(tableWorkouts, tableExercises, tableRoutines, tableUsers, tableRoutExer, done);
});
// GET (200) /routines/1/exercise
hooks.before('Specific Exercise detail from Routine > Get Exercise Details', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    //db.setupRelationship(tableExercises,tableRoutines,tableWorkExer,done)
    db.setupRelationshipTripleForRelated(tableWorkouts, tableExercises, tableUsers, tableRoutines, tableRoutExer, done);
    //db.setupRelationshipForRelated(tableExercises,tableUsers, tableRoutines, tableWorkExer,done);
});
hooks.after('Specific Exercise detail from Routine > Get Exercise Details', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    //db.cleanUpRelationship(tableExercises,tableRoutines,tableWorkExer,done);
    //db.cleanUpRelationshipForRelated(tableWorkouts,tableUsers, tableRoutines,tableWorkExer,done);
    db.cleanUpRelationshipTripleForRelated(tableWorkouts, tableExercises, tableRoutines, tableUsers, tableRoutExer, done);
});
//=========REOUTEXERS====================================
// GET (200) /routexers
hooks.before('RoutExers > List All RoutExers', (transaction) => {
    transaction.request.headers.Authorization = myToken;
});
// PUT (200) /routexers
hooks.before('RoutExers > CREATE a new RoutExer', (transaction, done) => {
    //console.log("running before");
    //db.setupRelationshipNoJunction(tableWorkouts,tableRoutines,done)
    db.setupRelationship(tableWorkouts, tableUsers, tableRoutines, done);
    transaction.request.headers.Authorization = myToken;
});
hooks.after('RoutExers > CREATE a new RoutExer', (transaction, done) => {
    //console.log("running after");
    //db.cleanUpRelationship(tableWorkouts,tableRoutines,tableRoutExers,done);
    db.cleanUpRelationshipForRelated(tableUsers, tableRoutines, tableWorkouts, tableRoutExers, done);
    transaction.request.headers.Authorization = myToken;
});
// PATCH (201) /routexers/1
hooks.before('RoutExer > Update a specific RoutExer', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    //db.cleanUpRelationshipForRelated(tableUsers,tableRoutines,tableWorkouts,tableRoutExers,done);
    db.setupRelationshipForRelated(tableUsers, tableRoutines, tableWorkouts, tableRoutExers, done);
});
hooks.after('RoutExer > Update a specific RoutExer', (transaction, done) => {
    db.cleanUpRelationshipForRelated(tableUsers, tableRoutines, tableWorkouts, tableRoutExers, done);
});
// DELETE (201) /routexers/1
hooks.before('RoutExer > Delete a specific RoutExer', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationshipForRelated(tableUsers, tableRoutines, tableWorkouts, tableRoutExers, done);
});
hooks.after('RoutExer > Delete a specific RoutExer', (transaction, done) => {
    db.cleanUpRelationshipForRelated(tableUsers, tableRoutines, tableWorkouts, tableRoutExers, done);
});
// GET (200) /routexers/1
hooks.before('RoutExer > Get a specific RoutExer', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationshipForRelated(tableUsers, tableRoutines, tableWorkouts, tableRoutExers, done);
});
hooks.after('RoutExer > Get a specific RoutExer', (transaction, done) => {
    db.cleanUpRelationshipForRelated(tableUsers, tableRoutines, tableWorkouts, tableRoutExers, done);
});
// GET (200) /routexers/1/workouts
hooks.before('Specific RoutExer Workout Details > Get User Details', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationshipForRelated(tableUsers, tableRoutines, tableWorkouts, tableRoutExers, done);
});
hooks.after('Specific RoutExer Workout Details > Get User Details', (transaction, done) => {
    db.cleanUpRelationshipForRelated(tableUsers, tableRoutines, tableWorkouts, tableRoutExers, done);
});
// GET (200) /routexers/1/routine
hooks.before('Specific RoutExer Routine Details > Get User Details', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationshipForRelated(tableUsers, tableRoutines, tableWorkouts, tableRoutExers, done);
});
hooks.after('Specific RoutExer Routine Details > Get User Details', (transaction, done) => {
    db.cleanUpRelationshipForRelated(tableUsers, tableRoutines, tableWorkouts, tableRoutExers, done);
});
// GET (200) /routexers/1/exercise
hooks.before('Specific RoutExer Exercise Details > Get User Details', (transaction, done) => {
    transaction.request.headers.Authorization = myToken;
    db.setupRelationshipTripleForRelated(tableWorkouts, tableExercises, tableUsers, tableRoutines, tableRoutExers, done);
});
hooks.after('Specific RoutExer Exercise Details > Get User Details', (transaction, done) => {
    db.cleanUpRelationshipTripleForRelated(tableWorkouts, tableExercises, tableRoutines, tableUsers, tableRoutExers, done);
});
//# sourceMappingURL=hooks.js.map