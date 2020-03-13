const Pool = require("pg").Pool;
require('dotenv').config();
require('../.env');
//import 'dotenv/config';
const getConnection = () => {
    return {
        user: "user",
        host: "localhost",
        database: "db",
        password: "pass",
        port: 5432 
        // user : process.env.POSTGRES_USER,
        // host: process.env.POSTGRES_HOST,
        // database: process.env.POSTGRES_DB,
        // password: process.env.POSTGRES_PASSWORD,
        // port: process.env.POSTGRES_PORT
    }
  }
  

getConnection();

const createTable = async  (tableName) =>{
    const pool = new Pool(getConnection())
    const currConnection =  await pool.connect();
   

    try {
      const res = await pool.query(`DROP TABLE IF EXISTS ${tableName};
      CREATE TABLE ${tableName} (id SERIAL PRIMARY KEY, visitor_name varchar(100), visitor_age int, date_of_visit text,time_of_visit time,assistant varchar(100),comments text);`);
      currConnection.end();
      
      console.log(`${tableName} table created`);
      return res.rowCount;
    } catch (error) {
      console.log("ERROR", error)
    }
    finally
    {
      currConnection.release();
    }
  }
  createTable('visitors');

  const dropTable = async  (tableName) =>{
    const pool = new Pool(getConnection())
    const currConnection =  await pool.connect();
   res = await pool.query(`DROP TABLE IF EXISTS ${tableName};`)
    currConnection.release();
    currConnection.end();
  }
  dropTable('visitors');

  const addNewVisitor = async  (full_name,age,date_of_visit,time_of_visit,assistant,comments) =>{
    const pool = new Pool(getConnection());
    const currConnection =  await pool.connect()
    tableName = `visitors`;
    const query_str = `INSERT INTO ${tableName} (visitor_name, visitor_age, date_of_visit , time_of_visit, assistant, comments) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    query_var = [full_name, age, date_of_visit, time_of_visit, assistant, comments];
    
   
    try {
      const res = await pool.query(query_str, query_var);
      console.log('Visitor has been added to database.');
      currConnection.end();
      return res.rows;
      
    } catch (error) {
      console.log("ERROR",error);
    }
    finally{
      currConnection.release();
    }
  }

 const viewAllVisitors = async  () =>{
    const pool = new Pool(getConnection());
    const currConnection =  await pool.connect()
    const query_str = 'Select id,visitor_name from visitors';

    try {
      const res = await pool.query(query_str);
      console.log(res.rows);
      currConnection.end();
      return res.rows;
    } catch (error) {
      console.log("ERROR",error);
    }
    finally{
      currConnection.release();
    }
 }

const updateVisitor = async  (id,updateName, age, timeOfVisit, dateOfVisit, personWhoAssisted, comments ) =>{
    const pool = new Pool(getConnection());
    const currConnection =  await pool.connect()
    const query_str = 'UPDATE visitors set  visitor_name = $2 , visitor_age = $3, date_of_visit =$4, time_of_visit =$5, assistant =$6 ,comments = $7  WHERE id =$1 RETURNING *';
    const query_var = [id,updateName, age, timeOfVisit, dateOfVisit, personWhoAssisted, comments];

   try {
    const res = await pool.query(query_str,query_var);
    console.log(`Visitor :${updateName} has been updated.`);
    currConnection.end();
    return res.rows;
   } catch (error) {
     console.log("ERROR", error)
   }
   finally{
    currConnection.release();
   }
}

const deleteVisitor = async  (id) =>{
    const pool = new Pool(getConnection());
    const currConnection =  await pool.connect()
    const query_str = 'DELETE from visitors WHERE id = $1';
    const query_var = [id];

   try {
    const res = await pool.query(query_str,query_var);
    console.log(`Visitor :${id} has been deleted.`);
    currConnection.release();
    currConnection.end();
    return res.rows;
   } catch (error) {
     
   }
   
}
const viewVisitor = async  (id) =>{
    const pool = new Pool(getConnection());
    const currConnection =  await pool.connect()
    const query_str = 'Select * from visitors where id=$1';
    const query_var = [id];
    
    try {
        const res = await pool.query(query_str,query_var);
        console.log(res.rows);
        currConnection.release();
        currConnection.end();
        return res.rows;
    } catch (error) {
        console.log("ERROR", error);
    }
}
const deleteAllVisitors = async  () =>{
    const pool = new Pool(getConnection())
    const currConnection =  await pool.connect()
    const query_str = 'DELETE from visitors';
    

    try {
        const res = await pool.query(query_str);
        console.log('All data has been deleted.');
        currConnection.release();
        currConnection.end();
        return res.rowCount;
    } catch (error) {
        console.log("ERROR", error);
    }
    finally{
      currConnection.release();
    }
}

  module.exports = {
    createTable,
    dropTable,
    addNewVisitor,
    viewAllVisitors,
    updateVisitor,
    deleteVisitor,
    viewVisitor,
    deleteAllVisitors
  }
