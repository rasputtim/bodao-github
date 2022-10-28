"use strict";
const dbSchema = 'rafaelloduca';
const tdownload = dbSchema + '.tdownload';
const tdownload_category = dbSchema + '.tdownload_category';
const tdownload_category_group = dbSchema + '.tdownload_category_group';
const tdownload_tracking = dbSchema + '.tdownload_tracking';
const tdownload_type = dbSchema + '.tdownload_type ';
const tdownload_type_file = dbSchema + '.tdownload_type_file';
const tconfig = dbSchema + '.tconfig';
const tcompany = dbSchema + '.tcompany';
const tattachment = dbSchema + '.tattachment';
const tlanguage = dbSchema + '.tlanguage';
const trole = dbSchema + '.trole';
const trole_people_project = dbSchema + '.trole_people_project';
const ttes_bal_division = dbSchema + '.ttes_bal_division';
const ttes_bal_view = dbSchema + '.ttes_bal_view';
const ttes_bal_sector = dbSchema + '.ttes_bal_sector';
const ttes_bal_view_data = dbSchema + '.ttes_bal_view_data';
const ttes_balance = dbSchema + '.ttes_balance';
const ttes_category = dbSchema + '.ttes_category';
const ttes_data = dbSchema + '.ttes_data';
const ttes_data_merged = dbSchema + '.ttes_data_merged';
const ttes_payment_detail = dbSchema + '.ttes_payment_detail';
const ttes_payment_method = dbSchema + '.ttes_payment_method';
const ttes_user_category = dbSchema + '.ttes_user_category';
const ttes_user_data = dbSchema + '.ttes_user_data';
const ttes_user_remido = dbSchema + '.ttes_user_remido';
const tusuario = dbSchema + '.tusuario';
const tusuario_contact = dbSchema + '.tusuario_contact';
const tusuario_grade = dbSchema + '.tusuario_grade';
const tusuario_instalation = dbSchema + '.tusuario_instalation';
const tusuario_perfil = dbSchema + '.tusuario_perfil';
const tusuario_relationship = dbSchema + '.tusuario_relationship';
const tusuario_status = dbSchema + '.tusuario_status';
const env = 'development';
/*
const configs = {
  development: {
    client: 'pg',
    connection: {
      database: 'den57cm8t76a52',
      user: 'omeepqhqkpeace',
      password: '959fac24d270906e74f1c6ba0c36aeb13114e9347622bb110467a089659af441',
      host: 'ec2-54-225-119-13.compute-1.amazonaws.com',
      port: 5432,
      ssl: true,
      debug: true,
      asyncStackTraces: true,
      log: {
        warn(message) {
        },
        error(message) {
        },
        deprecate(message) {
        },
        debug(message) {
        }
      }
    },
  }
};
*/
const configs = {
    development: {
        client: 'pg',
        connection: {
            database: 'dono',
            user: 'dono',
            password: 'donopasswd',
            host: 'localhost',
            port: 5432,
            ssl: false,
            debug: true,
            asyncStackTraces: true,
            log: {
                warn(message) {
                },
                error(message) {
                },
                deprecate(message) {
                },
                debug(message) {
                }
            }
        },
    }
};
var knex = require('knex')(configs[env]);
/**
 * Return a payload useful for add a record in the table
 * @param {*} tableName
 */
function getPayloadAdd(tableName) {
    switch (tableName) {
        case tableRoutExers:
            return {
                "id": "1",
                "id_routine": "1",
                "id_workout": "1",
                "description": "TEST DREDD",
                "created_by": "53b0ec64-504b-11ea-b9c9-22000aef4e0b"
            };
        case theTableExerPart:
            return {
                "id": 1,
                "id_exercise_father": 1,
                "id_part": 1,
                "part_number": 1,
                "created_by": "53b0ec64-504b-11ea-b9c9-22000aef4e0b"
            };
        case theTableMuscExer:
            return {
                "id": 1,
                "id_muscle": 1,
                "id_exercise": 1,
                "description": "TEST_DREDD",
                "action": "unknown",
                "is_public": false,
                "created_by": "53b0ec64-504b-11ea-b9c9-22000aef4e0b"
            };
        case tableWorkUser:
            return {
                "id": 1,
                "id_workout": 1,
                "id_user": "f90ac968-504c-11ea-8397-22000aef4e0b",
                "date_creation": 'now()',
                "description": "Teste DREDD",
                "created_by": "53b0ec64-504b-11ea-b9c9-22000aef4e0b"
            };
        case tableMedias:
            return {
                "id": 1,
                "link": "https://www.movnat.com/deep-knee-bend/",
                "folder": "folder",
                "name": "TEST_DREDD",
                "type": "link",
                "is_public": true,
                "id_exercise": 24,
                "created_by": "53b0ec64-504b-11ea-b9c9-22000aef4e0b"
            };
        case tableGoalUsers:
            return {
                "id": 1,
                "id_goal": 1,
                "date_due": "2021-02-26T14:55:44.645Z",
                "date_completion": "2021-02-26T14:55:44.645Z",
                "details": "TESTE",
                "is_public": true,
                "is_approved": true,
                "date_approval": "2021-02-26T14:55:44.645Z",
                "id_user": "f90ac968-504c-11ea-8397-22000aef4e0b",
                "created_by": "53b0ec64-504b-11ea-b9c9-22000aef4e0b"
            };
        case tableClasses:
            return {
                "id": "1",
                "name": "TEST_DREDD",
                "description": "Exercise for the Back",
                "is_public": true, "date_creation": 'now()',
                "created_by": "53b0ec64-504b-11ea-b9c9-22000aef4e0b"
            };
        case tableMoviments:
            return {
                "id": "1",
                "description": "increasing the angle between two bones (straightening a bend).",
                "name": "TEST_DREDD",
                "is_public": true, "date_creation": 'now()',
                "created_by": "53b0ec64-504b-11ea-b9c9-22000aef4e0b"
            };
        case tableEquipments:
            return {
                "id": "1",
                "name": "UNKNOWN",
                "description": "unknown equipment",
                "is_public": true,
                "date_creation": 'now()',
                "created_by": "53b0ec64-504b-11ea-b9c9-22000aef4e0b"
            };
        case tableExerEquip:
            return {
                "id": 1,
                "id_exercise": 1,
                "id_equipment": 1,
                "is_public": true,
                "date_creation": 'now()',
                "created_by": "53b0ec64-504b-11ea-b9c9-22000aef4e0b"
            };
        case tableRoutines:
            return {
                "id": 1,
                "id_user": "f90ac968-504c-11ea-8397-22000aef4e0b",
                "description": "Teste Workout.",
                "date": "now()",
                "is_completed": true,
                "is_public": true,
                "date_creation": 'now()',
                "created_by": "53b0ec64-504b-11ea-b9c9-22000aef4e0b"
            };
        case tableRoutExer:
            return {
                "id": 1,
                "id_routine": 1,
                "id_workout_exercise": 1,
                "description": "DREDD DETAIS TEST",
                "id_exercise": 1,
                "date_creation": 'now()',
                "created_by": "53b0ec64-504b-11ea-b9c9-22000aef4e0b",
            };
        case tableRoutSets:
            return {
                "id": 1,
                "reps": 40,
                "weight": 26,
                "id_routine_exercise": 1,
                "date_creation": 'now()',
                "created_by": "53b0ec64-504b-11ea-b9c9-22000aef4e0b",
                "is_completed": true
            };
        case tableGoals:
            return {
                "id": "1",
                "id_type": "2",
                "description": "TESTE_DREDD",
                "is_public": true,
                "date_creation": 'now()',
                "created_by": "53b0ec64-504b-11ea-b9c9-22000aef4e0b",
                "name": "TESTE_DREDD"
            };
        case tableGoalTypes:
            return {
                "id": "1",
                "name": "TESTE_DREDD",
                "description": "unknown type of goal",
                "is_public": true,
                "date_creation": 'now()',
                "created_by": "53b0ec64-504b-11ea-b9c9-22000aef4e0b"
            };
        case tableObjectives:
            return {
                "id": "1",
                "description": "teeste Objective",
                "is_public": true,
                "name": "TESTE_DREDD",
                "date_creation": 'now()',
                "created_by": "53b0ec64-504b-11ea-b9c9-22000aef4e0b"
            };
        case tableWorkSets:
            return {
                "id": 1,
                "reps": 40,
                "weight": 26,
                "id_workout_exercise": 1,
                "date_creation": 'now()',
                "created_by": "53b0ec64-504b-11ea-b9c9-22000aef4e0b",
                "created_to": "53b0ec64-504b-11ea-b9c9-22000aef4e0b"
            };
        case tableMuscles:
            return {
                "id": 1,
                "name": "TESTE_DREDD",
                "description": "Teste Muscle.",
                "is_public": true,
                "type": "unknown",
                "action": "unknown",
                "id_group": "0",
                "date_creation": 'now()',
                "created_by": "53b0ec64-504b-11ea-b9c9-22000aef4e0b"
            };
        case tableExercises:
            return {
                "id": 1,
                "name": "TESTE_DREDD",
                "description": "Teste DREDD EXERCISE.",
                "calories": 100,
                "phase": "workout",
                "category": "strength",
                "is_part": false,
                "id_variation": 0,
                "is_public": true,
                "id_moviment": 2,
                "id_class": 2,
                "date_creation": 'now()',
                "created_by": "53b0ec64-504b-11ea-b9c9-22000aef4e0b"
            };
        case tableWorkouts:
            return {
                "id": 1,
                "name": "TESTE_DREDD",
                "description": "Teste Workout.",
                "is_public": true,
                "category": "unknown",
                "created_by": "53b0ec64-504b-11ea-b9c9-22000aef4e0b",
                "id_objective": 2,
                "created_to": "53b0ec64-504b-11ea-b9c9-22000aef4e0b",
                "cloned_from": 1
            };
        case tableWorkExer:
            return {
                "id": 1,
                "id_workout": 1,
                "id_exercise": 1,
                "date_creation": 'now()',
                "description": "Teste DREDD",
                "created_by": "53b0ec64-504b-11ea-b9c9-22000aef4e0b",
                "name": "TEST_DREDD"
            };
        case tusuario:
            return {
                "id": "teste_dredd",
                "id_status": 0,
                "nombre_real": "Teste Dredd",
                "password": "e10adc3949ba59abbe56e057f20f883e",
                "comentarios": "Teste Dredd",
                "profissao": "analista&#x20;de&#x20;sistema",
                "fecha_registro": "2020-04-20T19:43:14.000Z",
                "fecha_nascimento": "1970-01-01T03:00:00.000Z",
                "fecha_iniciacao": "1997-01-01T02:00:00.000Z",
                "fecha_elevacao": "1998-01-01T02:00:00.000Z",
                "fecha_exaltacao": "2001-01-01T03:00:00.000Z",
                "fecha_instalacao": "1969-12-31T03:00:00.000Z",
                "direccion": "teste.dreddo@gmail.com",
                "direccion_rua": "Travessa&#x20;Francisco&#x20;Novo",
                "direccion_no": 32,
                "direccion_comp": "sobrado&#x20;1",
                "direccion_bairro": "Tatuape",
                "direccion_mun": "Sao&#x20;Paulo",
                "direccion_cep": "021545740",
                "direccion_UF": "SP",
                "grau": 3,
                "telefono": "23646400",
                "telefono2": "98597848",
                "telefono3": "987481658",
                "nivel": 0,
                "avatar": "moustache2",
                "lang": "pt_br",
                "disabled": 0,
                "id_company": 1,
                "id_comp_ini": 1,
                "id_comp_ele": 1,
                "id_comp_exa": 1,
                "simple_mode": 0,
                "force_change_pass": 0,
                "last_pass_change": "1900-01-20T03:06:28.000Z",
                "last_failed_login": "1900-01-20T03:06:28.000Z",
                "failed_attempt": 0,
                "login_blocked": 0,
                "enable_login": 1,
                "location": "s&atilde;o&#x20;Paulo",
                "founder": 0
            };
        case theTableWorkUser:
            return {
                "id": 1,
                "id_workout": 1,
                "id_user": "f90ac968-504c-11ea-8397-22000aef4e0b",
                "description": "TEST DREDD",
                "created_by": "53b0ec64-504b-11ea-b9c9-22000aef4e0b"
            };
        default:
            return {};
    }
}
function createMuscle(options, done) {
    //console.log("add record: ");
    //console.log("knex object" + knex);
    let payloadData = getPayloadAdd(tableMuscles);
    try {
        const myId = knex(tableMuscles)
            .returning('id')
            .insert(payloadData)
            .then(function (result) {
            //console.log("record added");
            done();
        }).catch(function (error) {
            console.log("insert error: " + erro);
            let erro = error;
            console.log("insert error: " + erro);
        });
        //async.parallel( stackfunctionsinsert, function(err,result){
        //  console.log(result);
        //});
    }
    catch (error) {
        var erro = error;
        console.log(erro);
        done();
    }
}
function cleanUpMuscle(options, done) {
    //console.log("cleanup: " );
    //debug only to show the query on the console
    try {
        var teste = knex(tableMuscles)
            .where({ id: 1 })
            .del()
            .then(function (result) {
            //console.log("record deleted");
            done();
        }).catch(function (error) {
            let erro = error;
        });
    }
    catch (error) {
        let erro = error;
        //console.log(erro);
        done();
    }
}
function createExercise(options, done) {
    //console.log("add record: ");
    //console.log("knex object" + knex);
    let payloadData = getPayloadAdd(tableExercises);
    try {
        let myId;
        knex(tableExercises)
            .returning('id')
            .insert(payloadData)
            .then(function (result) {
            //console.log("record added");
            myId = result;
            done();
        }).catch(function (error) {
            let erro = error;
            console.log("insert error: " + erro);
        });
        //async.parallel( stackfunctionsinsert, function(err,result){
        //  console.log(result);
        //});
    }
    catch (error) {
        var erro = error;
        console.log(erro);
        done();
    }
}
function cleanUpExercise(options, done) {
    //console.log("cleanup: " );
    //debug only to show the query on the console
    try {
        var teste = knex(tableExercises)
            .where({ id: 1 })
            .del()
            .then(function (result) {
            //console.log("record deleted");
            done();
        }).catch(function (error) {
            let erro = error;
        });
    }
    catch (error) {
        let erro = error;
        //console.log(erro);
        done();
    }
}
function createWorkout(options, done) {
    //console.log("add record: ");
    //console.log("knex object" + knex);
    let payloadData = getPayloadAdd(tableWorkouts);
    try {
        const myId = knex(tableWorkouts)
            .returning('id')
            .insert(payloadData)
            .then(function (result) {
            //console.log("record added");
            let id = result;
            done();
        }).catch(function (error) {
            let erro = error;
            console.log("insert error: " + erro);
        });
        //async.parallel( stackfunctionsinsert, function(err,result){
        //  console.log(result);
        //});
    }
    catch (error) {
        var erro = error;
        console.log(erro);
        done();
    }
}
function cleanUpWorkout(options, done) {
    //console.log("cleanup: " );
    //debug only to show the query on the console
    try {
        var teste = knex(tableWorkouts)
            .where({ id: 1 })
            .del()
            .then(function (result) {
            //console.log("record deleted");
            done();
        }).catch(function (error) {
            let erro = error;
        });
    }
    catch (error) {
        let erro = error;
        //console.log(erro);
        done();
    }
}
function createWorkExer(options, done) {
    //console.log("add record: ");
    //console.log("knex object" + knex);
    let payloadData = getPayloadAdd(tableWorkExer);
    try {
        const myId = knex(tableWorkExer)
            .returning('id')
            .insert(payloadData)
            .then(function (result) {
            //console.log("record added");
            let id = result;
            done();
        }).catch(function (error) {
            let erro = error;
            console.log("insert error: " + erro);
        });
    }
    catch (error) {
        var erro = error;
        console.log(erro);
        done();
    }
}
function cleanUpWorkExer(options, done) {
    //console.log("cleanup: " );
    //debug only to show the query on the console
    try {
        var teste = knex(tableWorkExer)
            .where({ id: 1 })
            .del()
            .then(function (result) {
            //console.log("record deleted");
            done();
        }).catch(function (error) {
            let erro = error;
        });
    }
    catch (error) {
        let erro = error;
        //console.log(erro);
        done();
    }
}
//=======MUSCLES AND EXERCISES=====================
/**
 * Setup parts of exercises to the test
 */
function setupPartsAndExercises(done) {
    // Using trx as a query builder:
    knex.transaction(function (trx) {
        let payloadData = getPayloadAdd(tableExercises);
        let payloadData2 = getPayloadAdd(theTableExerPart);
        return trx
            .insert(payloadData)
            .into(tableExercises)
            .then(function (ids) {
            return trx
                .insert(payloadData2)
                .into(theTableExerPart)
                .then(function (ids) {
            });
        });
    })
        .then(function (inserts) {
        //console.log(inserts.length + ' new books saved.');
        done();
    })
        .catch(function (error) {
        // If we get here, that means that neither the 'Old Books' catalogues insert,
        // nor any of the books inserts will have taken place.
        console.error(error);
        done();
    });
}
/**
 * Clean up oparts of exercises
 */
function cleanUpJunctionAndMaster(tableRelationship, TableMaster, done) {
    let myId1 = 1;
    if (TableMaster == tableUsers) {
        myId1 = "f90ac968-504c-11ea-8397-22000aef4e0b";
    }
    // Using trx as a query builder:
    knex.transaction(function (trx) {
        return trx(theTableExerPart)
            .where('id', 1)
            .del()
            .then(function (ids) {
            return trx(tableRelationship)
                .where('id', 1)
                .del()
                .then(function (ids) {
                return trx(TableMaster)
                    .where('id', myId1)
                    .del()
                    .then(function (ids) {
                });
            });
        });
    })
        .then(function (inserts) {
        //console.log(inserts.length + ' new books saved.');
        done();
    })
        .catch(function (error) {
        // If we get here, that means that neither the 'Old Books' catalogues insert,
        // nor any of the books inserts will have taken place.
        console.error(error);
        done();
    });
}
function cleanUpRelationship(table1, table2, junctionTable, done) {
    let myId2 = 1;
    let myId1 = 1;
    if (table2 == tableUsers) {
        myId2 = "f90ac968-504c-11ea-8397-22000aef4e0b";
    }
    if (table1 == tableUsers) {
        myId1 = "f90ac968-504c-11ea-8397-22000aef4e0b";
    }
    // Using trx as a query builder:
    knex.transaction(function (trx) {
        return trx(junctionTable)
            .where('id', 1)
            .del()
            .then(function (ids) {
            return trx(table1)
                .where('id', myId1)
                .del()
                .then(function (ids) {
                return trx(table2)
                    .where('id', myId2)
                    .del()
                    .then(function (ids) {
                });
            });
        });
    })
        .then(function (inserts) {
        //console.log(inserts.length + ' new books saved.');
        done();
    })
        .catch(function (error) {
        // If we get here, that means that neither the 'Old Books' catalogues insert,
        // nor any of the books inserts will have taken place.
        console.error(error);
        done();
    });
}
;
function createRecord(tableName, done) {
    //console.log("add record: ");
    //console.log("knex object" + knex);
    let payloadData = getPayloadAdd(tableName);
    try {
        const myId = knex(tableName)
            .returning('id')
            .insert(payloadData)
            .then(function (result) {
            //console.log("record added");
            done();
        }).catch(function (error) {
            let erro = error;
            console.log("insert error: " + erro);
        });
        //async.parallel( stackfunctionsinsert, function(err,result){
        //  console.log(result);
        //});
    }
    catch (error) {
        var erro = error;
        console.log(erro);
        done();
    }
}
function cleanUpTable(tableName, done) {
    let myId = 1;
    if (tableName == tableUsers) {
        myId = "f90ac968-504c-11ea-8397-22000aef4e0b";
    }
    try {
        var teste = knex(tableName)
            .where({ id: myId })
            .del()
            .then(function (result) {
            //console.log("record deleted");
            done();
        }).catch(function (error) {
            let erro = error;
        });
    }
    catch (error) {
        let erro = error;
        //console.log(erro);
        done();
    }
}
function cleanUpRelationshipTripleForRelated(theRelated1, theRelated2, junctionTable, theHelperTable, theTestTable, done) {
    let myId1 = 1;
    if (theRelated1 == tableUsers) {
        myId1 = "f90ac968-504c-11ea-8397-22000aef4e0b";
    }
    let myId2 = 1;
    if (theRelated2 == tableUsers) {
        myId2 = "f90ac968-504c-11ea-8397-22000aef4e0b";
    }
    let myId3 = 1;
    if (theTestTable == tableUsers) {
        myId3 = "f90ac968-504c-11ea-8397-22000aef4e0b";
    }
    let myId4 = 1;
    if (theHelperTable == tableUsers) {
        myId4 = "f90ac968-504c-11ea-8397-22000aef4e0b";
    }
    let myIdJun = 1;
    if (junctionTable == tableUsers) {
        myIdJun = "f90ac968-504c-11ea-8397-22000aef4e0b";
    }
    // Using trx as a query builder:
    knex.transaction(function (trx) {
        return trx(theTestTable)
            .where('id', myId3)
            .del()
            .then(function (ids) {
            return trx(junctionTable)
                .where('id', myIdJun)
                .del()
                .then(function (ids) {
                return trx(theRelated2)
                    .where('id', myId2)
                    .del()
                    .then(function (ids) {
                    return trx(theRelated1)
                        .where('id', myId1)
                        .del()
                        .then(function (ids) {
                        return trx(theHelperTable)
                            .where('id', myId4)
                            .del();
                    });
                });
            });
        });
    })
        .then(function (inserts) {
        //console.log(inserts.length + ' new books saved.');
        done();
    })
        .catch(function (error) {
        // If we get here, that means that neither the 'Old Books' catalogues insert,
        // nor any of the books inserts will have taken place.
        console.error(error);
        done();
    });
}
;
function setupRelationshipTripleForRelated(theRelated1, theRelated2, junctionTable, theHelperTable, tableTestTable, done) {
    let payloadData = getPayloadAdd(theRelated1);
    let payloadData2 = getPayloadAdd(theRelated2);
    let payloadDataJun = getPayloadAdd(junctionTable);
    let payloadHelper = getPayloadAdd(theHelperTable);
    let payloadDataTest = getPayloadAdd(tableTestTable);
    if (tableTestTable == tableRoutExer) {
        payloadDataTest.id_exercise = 1;
    }
    // Using trx as a query builder:
    knex.transaction(function (trx) {
        return trx
            .insert(payloadData)
            .into(theRelated1)
            .then(function (ids) {
            return trx
                .insert(payloadData2)
                .into(theRelated2)
                .then(function (ids) {
                return trx
                    .insert(payloadDataJun)
                    .into(junctionTable)
                    .then(function (ids) {
                    return trx
                        .insert(payloadHelper)
                        .into(theHelperTable)
                        .then(function (ids) {
                        return trx
                            .insert(payloadDataTest)
                            .into(tableTestTable)
                            .then(function (ids) {
                        });
                    });
                });
            });
        });
    })
        .then(function (inserts) {
        //console.log(inserts.length + ' new books saved.');
        done();
    })
        .catch(function (error) {
        // If we get here, that means that neither the 'Old Books' catalogues insert,
        // nor any of the books inserts will have taken place.
        console.error(error);
        done();
    });
}
;
/**
 * Setup a relationship table in order to test a 1 to N related table, liek the table workout_sets
 * @param {*} junctionTable  the junction table
 * @param {*} theRelated1 the foreign table one from the junction table
 * @param {*} theRelated2 the foreign table 2 from the junction table
 * @param {*} theTestTable the table will be tested
 * @param {*} done the done flag
 */
function setupRelationshipForRelated(theRelated1, theRelated2, junctionTable, theTestTable, done) {
    let payloadData = getPayloadAdd(theRelated1);
    let payloadData2 = getPayloadAdd(theRelated2);
    let payloadData3 = getPayloadAdd(junctionTable);
    let payloadData4 = getPayloadAdd(theTestTable);
    // Using trx as a query builder:
    knex.transaction(function (trx) {
        return trx
            .insert(payloadData)
            .into(theRelated1)
            .then(function (ids) {
            return trx
                .insert(payloadData2)
                .into(theRelated2)
                .then(function (ids) {
                return trx
                    .insert(payloadData3)
                    .into(junctionTable)
                    .then(function (ids) {
                    return trx
                        .insert(payloadData4)
                        .into(theTestTable)
                        .then(function (ids) {
                    });
                });
            });
        });
    })
        .then(function (inserts) {
        //console.log(inserts.length + ' new books saved.');
        done();
    })
        .catch(function (error) {
        // If we get here, that means that neither the 'Old Books' catalogues insert,
        // nor any of the books inserts will have taken place.
        console.error(error);
        done();
    });
}
;
function cleanUpRelationshipForRelatedWithRoutine(theRelated1, theRelated2, junctionTable, theTestTable, done) {
    //let payloadDataRout =  getPayloadAdd(tableUsers);  
    //let payloadDataRout2 =  getPayloadAdd(tableWorkouts);
    //let payloadDataRout3 =  getPayloadAdd(tableWorkUser);
    //let payloadDataRout4 =  getPayloadAdd(tableExercises);
    //let payloadDataRout5 =  getPayloadAdd(tableWorkExer);
    let myId1 = 1;
    if (theRelated1 == tableUsers) {
        myId1 = "f90ac968-504c-11ea-8397-22000aef4e0b";
    }
    let myId2 = 1;
    if (theRelated2 == tableUsers) {
        myId2 = "f90ac968-504c-11ea-8397-22000aef4e0b";
    }
    let myId3 = 1;
    if (theTestTable == tableUsers) {
        myId3 = "f90ac968-504c-11ea-8397-22000aef4e0b";
    }
    // Using trx as a query builder:
    knex.transaction(function (trx) {
        return trx(theTestTable)
            .where('id', myId3)
            .del()
            .then(function (ids) {
            return trx(junctionTable)
                .where('id', 1)
                .del()
                .then(function (ids) {
                return trx(theRelated1)
                    .where('id', 1)
                    .del()
                    .then(function (ids) {
                    return trx(tableWorkUser)
                        .where('id', 1)
                        .del()
                        .then(function (ids) {
                        return trx(tableWorkExer)
                            .where('id', 1)
                            .del()
                            .then(function (ids) {
                            return trx(tableWorkouts)
                                .where('id', myId2)
                                .del()
                                .then(function (ids) {
                                return trx(theRelated2)
                                    .where('id', myId1)
                                    .del()
                                    .then(function (ids) {
                                    return trx(tableUsers)
                                        .where('id', "f90ac968-504c-11ea-8397-22000aef4e0b")
                                        .del();
                                });
                            });
                        });
                    });
                });
            });
        });
    })
        .then(function (inserts) {
        //console.log(inserts.length + ' new books saved.');
        done();
    })
        .catch(function (error) {
        // If we get here, that means that neither the 'Old Books' catalogues insert,
        // nor any of the books inserts will have taken place.
        console.error(error);
        done();
    });
}
;
/**
 * Clean up al tables setted by the cleanupRelationshipForRelated function
 * @param {*} junctionTable  the junction table
  * @param {*} theRelated1 the foreign table one from the junction table
  * @param {*} theRelated2 the foreign table 2 from the junction table
  * @param {*} theTestTable the table will be tested
  * @param {*} done the done flag
 */
function cleanUpRelationshipForRelated(theRelated1, theRelated2, junctionTable, theTestTable, done) {
    let myId1 = 1;
    if (theRelated1 == tableUsers) {
        myId1 = "f90ac968-504c-11ea-8397-22000aef4e0b";
    }
    let myId2 = 1;
    if (theRelated2 == tableUsers) {
        myId2 = "f90ac968-504c-11ea-8397-22000aef4e0b";
    }
    let myId3 = 1;
    if (theTestTable == tableUsers) {
        myId3 = "f90ac968-504c-11ea-8397-22000aef4e0b";
    }
    // Using trx as a query builder:
    knex.transaction(function (trx) {
        return trx(theTestTable)
            .where('id', myId3)
            .del()
            .then(function (ids) {
            return trx(junctionTable)
                .where('id', 1)
                .del()
                .then(function (ids) {
                return trx(theRelated2)
                    .where('id', myId2)
                    .del()
                    .then(function (ids) {
                    return trx(theRelated1)
                        .where('id', myId1)
                        .del();
                });
            });
        });
    })
        .then(function (inserts) {
        //console.log(inserts.length + ' new books saved.');
        done();
    })
        .catch(function (error) {
        // If we get here, that means that neither the 'Old Books' catalogues insert,
        // nor any of the books inserts will have taken place.
        console.error(error);
        done();
    });
}
;
/**
  * Setup a relationship table in order to test a 1 to N related table, liek the table workout_sets
  * Setup the Routine First
  * @param {*} junctionTable  the junction table
  * @param {*} theRelated1 the foreign table one from the junction table
  * @param {*} theRelated2 the foreign table 2 from the junction table
  * @param {*} theTestTable the table will be tested
  * @param {*} done the done flag
  */
function setupRelationshipForRelatedWithRoutine(theRelated1, theRelated2, junctionTable, theTestTable, done) {
    let payloadDataRout = getPayloadAdd(tableUsers);
    let payloadDataRout2 = getPayloadAdd(tableWorkouts);
    let payloadDataRout3 = getPayloadAdd(tableWorkUser);
    let payloadDataRout5 = getPayloadAdd(tableWorkExer);
    payloadDataRout5.id_exercise = 4;
    let payloadData = getPayloadAdd(theRelated1);
    let payloadData2 = getPayloadAdd(theRelated2);
    let payloadData3 = getPayloadAdd(junctionTable);
    let payloadData4 = getPayloadAdd(theTestTable);
    // Using trx as a query builder:
    knex.transaction(function (trx) {
        return trx
            .insert(payloadDataRout)
            .into(tableUsers)
            .then(function (ids) {
            return trx
                .insert(payloadDataRout2)
                .into(tableWorkouts)
                .then(function (ids) {
                return trx
                    .insert(payloadDataRout3)
                    .into(tableWorkUser)
                    .then(function (ids) {
                    return trx
                        .insert(payloadDataRout5)
                        .into(tableWorkExer)
                        .then(function (ids) {
                        return trx
                            .insert(payloadData)
                            .into(theRelated1)
                            .then(function (ids) {
                            return trx
                                .insert(payloadData2)
                                .into(theRelated2)
                                .then(function (ids) {
                                return trx
                                    .insert(payloadData3)
                                    .into(junctionTable)
                                    .then(function (ids) {
                                    return trx
                                        .insert(payloadData4)
                                        .into(theTestTable)
                                        .then(function (ids) {
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    })
        .then(function (inserts) {
        //console.log(inserts.length + ' new books saved.');
        done();
    })
        .catch(function (error) {
        // If we get here, that means that neither the 'Old Books' catalogues insert,
        // nor any of the books inserts will have taken place.
        console.error(error);
        done();
    });
}
;
function setupRelationshipWithRoutine(table1, table2, junctionTable, done) {
    let payloadDataRout = getPayloadAdd(tableUsers);
    let payloadDataRout2 = getPayloadAdd(tableWorkouts);
    let payloadDataRout3 = getPayloadAdd(tableWorkUser);
    let payloadDataRout4 = getPayloadAdd(tableExercises);
    let payloadDataRout5 = getPayloadAdd(tableWorkExer);
    payloadDataRout5.id_exercise = 4;
    let payloadData = getPayloadAdd(table1);
    let payloadData2 = getPayloadAdd(table2);
    let payloadData3 = getPayloadAdd(junctionTable);
    // Using trx as a query builder:
    knex.transaction(function (trx) {
        return trx
            .insert(payloadDataRout)
            .into(tableUsers)
            .then(function (ids) {
            return trx
                .insert(payloadDataRout2)
                .into(tableWorkouts)
                .then(function (ids) {
                return trx
                    .insert(payloadDataRout3)
                    .into(tableWorkUser)
                    .then(function (ids) {
                    return trx
                        .insert(payloadDataRout5)
                        .into(tableWorkExer)
                        .then(function (ids) {
                        return trx
                            .insert(payloadData)
                            .into(table1)
                            .then(function (ids) {
                            return trx
                                .insert(payloadData2)
                                .into(table2)
                                .then(function (ids) {
                                return trx
                                    .insert(payloadData3)
                                    .into(junctionTable)
                                    .then(function (ids) {
                                });
                            });
                        });
                    });
                });
            });
        });
    })
        .then(function (inserts) {
        //console.log(inserts.length + ' new books saved.');
        done();
    })
        .catch(function (error) {
        // If we get here, that means that neither the 'Old Books' catalogues insert,
        // nor any of the books inserts will have taken place.
        console.error(error);
        done();
    });
}
/**
 * Creates records in the related tables,
* then creates a record in the Junction table
 * @param {*} table1
 * @param {*} Table2
 * @param {*} JunctionTable
 * @param {*} done
 */
function setupRelationship(table1, table2, junctionTable, done) {
    let payloadData = getPayloadAdd(table1);
    let payloadData2 = getPayloadAdd(table2);
    let payloadData3 = getPayloadAdd(junctionTable);
    if (table1 == tableExercises && table2 == tableRoutines) {
        payloadData3.id_exercise = 1;
        delete payloadData3.id_workout;
    }
    // Using trx as a query builder:
    knex.transaction(function (trx) {
        return trx
            .insert(payloadData)
            .into(table1)
            .then(function (ids) {
            return trx
                .insert(payloadData2)
                .into(table2)
                .then(function (ids) {
                return trx
                    .insert(payloadData3)
                    .into(junctionTable)
                    .then(function (ids) {
                });
            });
        });
    })
        .then(function (inserts) {
        //console.log(inserts.length + ' new books saved.');
        done();
    })
        .catch(function (error) {
        // If we get here, that means that neither the 'Old Books' catalogues insert,
        // nor any of the books inserts will have taken place.
        console.error(error);
        done();
    });
}
/**
* Do not add a record in the Junction table
* @param {*} done
*/
function setupRelationshipNoJunction(table1, table2, done) {
    let payloadData = getPayloadAdd(table1);
    let payloadData2 = getPayloadAdd(table2);
    if (table1 === tableClasses) {
        payloadData2.id_class = 1;
    }
    if (table1 === tableMoviments) {
        payloadData2.id_moviment = 1;
    }
    // Using trx as a query builder:
    knex.transaction(function (trx) {
        return trx
            .insert(payloadData)
            .into(table1)
            .then(function (ids) {
            return trx
                .insert(payloadData2)
                .into(table2)
                .then(function (ids) {
            });
        });
    })
        .then(function (inserts) {
        //console.log(inserts.length + ' new books saved.');
        done();
    })
        .catch(function (error) {
        // If we get here, that means that neither the 'Old Books' catalogues insert,
        // nor any of the books inserts will have taken place.
        console.error(error);
        done();
    });
}
//========END MUSCLES AND EXERCISES =================
module.exports = {
    createMuscle: createMuscle,
    cleanUpMuscle: cleanUpMuscle,
    createExercise: createExercise,
    cleanUpExercise: cleanUpExercise,
    createWorkout: createWorkout,
    cleanUpWorkout: cleanUpWorkout,
    cleanUpWorkExer: cleanUpWorkExer,
    createWorkExer: createWorkExer,
    setupPartsAndExercises,
    cleanUpJunctionAndMaster,
    cleanUpTable,
    createRecord,
    setupRelationship,
    setupRelationshipNoJunction,
    cleanUpRelationship,
    setupRelationshipForRelated,
    cleanUpRelationshipForRelated,
    setupRelationshipWithRoutine,
    cleanUpRelationshipForRelatedWithRoutine,
    setupRelationshipForRelatedWithRoutine,
    setupRelationshipTripleForRelated,
    cleanUpRelationshipTripleForRelated
};
//cleanUpMuscle({id: 1});
//createMuscle({id: 1});
//# sourceMappingURL=db.js.map