const sql_database = {
    get_user_birthdays_month: `SELECT id,name,birthday,t1.relationship,brother
     FROM
         (SELECT  c.id::text as id ,c."name" as name ,c.fecha_nascimento as birthday , cl.name as relationship,  cd.name as brother
     FROM rafaelloduca.tusuario_contact AS c
     JOIN rafaelloduca.tcommon_lookup AS cl 
     ON cl.table = 'tusuario_contact' AND cl."column" = 'id_relationship_ct' AND cl.id = c.id_relationship_ct
     JOIN rafaelloduca.tusuario as cd ON cd.id = c.id_usuario
     WHERE(
          DATE_PART('month', c.fecha_nascimento) = date_part('month', CURRENT_DATE)
     )) as t1
     UNION
         (SELECT  cd.id as id ,cd.nombre_real as name ,cd.fecha_nascimento as birthday , cl.name as relationship, cd.name as brother
     FROM rafaelloduca.tusuario AS cd
     JOIN rafaelloduca.tcommon_lookup AS cl 
     ON cl.table = 'tusuario' AND cl."column" = 'id_degree_ct' AND cl.id = cd.id_degree_ct
     
     WHERE(
          DATE_PART('month', cd.fecha_nascimento) = date_part('month', CURRENT_DATE)
     )) `,
    get_users_birthdays_today: `SELECT id,name,birthday,t1.relationship,brother
     FROM
         (SELECT  c.id::text as id ,c."name" as name ,c.fecha_nascimento as birthday , cl.name as relationship,  cd.name as brother
     FROM rafaelloduca.tusuario_contact AS c
     JOIN rafaelloduca.tcommon_lookup AS cl 
     ON cl.table = 'tusuario_contact' AND cl."column" = 'id_relationship_ct' AND cl.id = c.id_relationship_ct
     JOIN rafaelloduca.tusuario as cd ON cd.id = c.id_usuario
     WHERE(
          DATE_PART('day', c.fecha_nascimento) = date_part('day', CURRENT_DATE)
     AND
          DATE_PART('month', c.fecha_nascimento) = date_part('month', CURRENT_DATE)
     )) as t1
     UNION
         (SELECT  cd.id as id ,cd.nombre_real as name ,cd.fecha_nascimento as birthday , cl.name as relationship, cd.name as brother
     FROM rafaelloduca.tusuario AS cd
     JOIN rafaelloduca.tcommon_lookup AS cl 
     ON cl.table = 'tusuario' AND cl."column" = 'id_degree_ct' AND cl.id = cd.id_degree_ct
     
     WHERE(
          DATE_PART('day', cd.fecha_nascimento) = date_part('day', CURRENT_DATE)
     AND
          DATE_PART('month', cd.fecha_nascimento) = date_part('month', CURRENT_DATE)
     ))`
};
export default sql_database;
//# sourceMappingURL=sqlDatabase.js.map