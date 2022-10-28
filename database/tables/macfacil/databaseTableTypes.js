/**
 * ONE Table is the one referenced by the N table. it has not the foreigh key
 * N Table is the table that references a table and has the many end point and the foreign key
 * M table is the one referenced by the Junction table in a many to many link
 * JUNCTION TABLE is the table that references de M tales and has the foreign keys in a many to many relationship
 */
export const tableClass = {
    ONE: 0,
    ONE_TABLE: 1,
    N_TABLE: 2,
    M_TABLE: 3,
    JUNCTION: 4,
    COMMON_LOOKUP: 4
};
export const relationshipType = {
    ONE_to_ONE: 0,
    ONE_to_N: 1,
    M_to_M: 2,
    NO_RELATIONSHIP: 3
};
export const dbSchemas = {
    RAFAEL: 'rafaelloduca',
    FRATLESTE: 'fratleste',
};
/**
 * schema used in the route
 */
export const routeSchemas = {
    RAFAEL: 'rafael',
    FRATLESTE: 'fratleste',
};
//# sourceMappingURL=databaseTableTypes.js.map