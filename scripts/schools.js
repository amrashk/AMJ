import express, {Router} from 'express0';
const router  = express.Router();

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
