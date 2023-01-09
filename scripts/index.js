//database begin    
import express from "express";
import swaggerJSdoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express';

const router = express.Router();
// queries
const queries = {
    getCountries:`SELECT * FROM Countries `,
    getSchools:`SELECT * FROM Schools;`,
    getbyCname:`SELECT * FROM Countries where c_name = "$1"`
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
// app.get('/:c_name', (req, res)=>{
//     let c_name = req.params.c_name;
//     pool.query(queries.getbyCname,[c_name] ,(err, data)=>{
//         // if(data.rowCount){
//             res.status(200).json(data.rows);
//         // }
//         // else {
//         //     res.status(404).send(`${c_name} Not found`);   
//         // }
//     })
// })
