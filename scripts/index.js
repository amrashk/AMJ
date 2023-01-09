//database begin    
import express from "express";
import swaggerJSdoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express';
const router = express.Router();
// queries
const queries = {
    getCountries:`SELECT * FROM Countries `,
    getSchools:`SELECT * FROM Schools;`,
    getbyCname:`SELECT * FROM Countries where c_name = $1`,
    getbysur_name:`SELECT * FROM Schools where sur_name = $1`,
    deletebySchool_name:`DELETE FROM "Schools" where "sur_name" = $1`,
    insertCountry: `insert into Countries Values ($1, $2, $3);`,
    upd_ccountry:`UPDATE "Countries" SET "C_ID"=$2, "C_name"=$3 WHERE "C_rank" = $1;`
}


import pkg from 'pg';
const {Pool} = pkg;
const pool = new Pool({
    host: "localhost",
    port: 5432,
    database: "web",
    user: "postgres",
    password: "123"
})
// const express = require('express');


const app = express();
const port = 5000;

const options = {
    definition: {
        openapi: '3.0.0',
        info:{
            title: 'WebAPI',
            version: '1.0.0',
        },
    },
    apis: ['./index.js',
    './index.js',
    ]
}

const openapiSpec = await swaggerJSdoc(options);
const UIoptions = {
    explorer:true
};

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpec, UIoptions));


/**
 * @openapi
 * /:
 *      get:
 *          summary: home
 *          description: Main datas
 *          responses:
 *              200:
 *                  description: respose for OK!
 *              500:
 *                  description: Error parsing!
 */
app.get('/', (req, res) =>{
    res.send("/countries , /schools");
})

app.listen(port, ()=>{
    console.log("server is listening")
})
/**
 * @openapi
 * /countries:
 *      get:
 *          summary: countries
 *          description: countries datas
 *          responses:
 *              200:
 *                  description: response for OK!
 *              500:
 *                  description: Error parsing!
 */
app.get('/countries', (req,res) =>{
    pool.query(queries.getCountries, (err, data)=>{
        res.status(200).json(data.rows);
    })
})
/**
 * @openapi
 * /schools:
 *      get:
 *          summary: schools
 *          description: schools datas
 *          responses:
 *              200:
 *                  description: response for OK!
 *              500:
 *                  description: Error parsing!
 */
app.get('/schools', (req,res) =>{
    pool.query(queries.getSchools, (err, data)=>{
        res.status(200).json(data.rows);
    })
})

/**
 * @openapi
 * /countries/{c_name}:
 *      get:
 *          summary: get by country name
 *          parameters:
 *            - in: path
 *              name: c_name
 *              description: country name
 *              required: true
 *              type: varchar
 *          responses:
 *              200: 
 *                  description: Done!
 *              500:
 *                  description: failed!
 */
app.get('/countries/:c_name', (req, res)=>{
    let c_name = req.params.c_name;
    pool.query(queries.getbyCname,[c_name] ,(err, data)=>{
        if(data.rowCount){
            res.status(200).json(data.rows);
        }
        else {
            res.status(404).send(`${c_name} Not found`);   
        }
    })
})
/**
 * @openapi
 * /schools/{sur_name}:
 *      delete:
 *          summary: Delete sur
 *          parameters:
 *            - in: path
 *              name: sur_name
 *              description: del by sur name
 *              required: true
 *              type: varchar
 *          description : del by sur name
 *          responses: 
 *              204:
 *                  description: DEleted!
 *              
 *              404:
 *                  description: id not found
 *              
 *              401:
 *                  description: Unauthorized!
 * 
 */
app.delete('/schools/:sur_name', (req, res)=>{
    let sur_name = req.params.sur_name;
    pool.query(queries.getbysur_name,[sur_name] ,(err, data)=>{
        if(data.rowCount){
            pool.query(queries.deletebySchool_name,[sur_name],(err,data)=>{
                res.status(200).send(`${sur_name} DELETED`);
            })
        }
        else {
            res.status(200).send(`${sur_name} NOT REGISTERED SUR`);   
        }
    })
})

/**
 * @openapi
 * /schools/post:
 *      post:
 *          summary: create new sur
 *          requestBody: 
 *              description: desc Optional description in *Markdown*
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              sur_name: varchar
 *                              description: surrrname
 *          responses:
 *                  200:
 *                      description: response for OK!
 *                  500:
 *                      description: Error parsing!
 */
app.post('/countries/post', (req, res)=>{
    const {
        C_name,
        c_id,
        crank
    } = req.body;
    
    pool.query(queries.getbyCname,[C_name], (err, data)=>{
        if(data.rowCount){
            res.send(`${C_name} registered`);
        }
        else{
            pool.query(queries.insertCountry, [c_id,C_name,crank],(err,data)=>{
                res.status(201).send(`${C_name} created`);
            })
        }
    })
})
/**
 * @openapi
 * /countries/upt:
 *      put:
 *          summary: upt
 *          requestBody: 
 *              content:
 */

app.put('/countries/upt', (req, res)=>{
    const {
        C_name,
        c_id,
        crank
    } = req.body;
    pool.query(queries.getbyCname,[C_name], (err, data)=>{
        if(data.rowCount){
            pool.query(queries.upd_ccountry, [c_id,C_name, crank], (err, data)=>{
                res.status(200).send(`${C_name} uptaded`);
            })
        }
        else{
            res.send(`${C_name} NOT REGISTERED TOUR ID`);
        }
    })
})