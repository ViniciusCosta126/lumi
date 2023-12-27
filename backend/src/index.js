import express from 'express'
import { connectDatabase } from './db_conecction.js'
import routes from './routes/index.js'
import cors from 'cors'
const conexao = await connectDatabase()

const app = express()
app.use((req, res, next) => {
    //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
    //Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});
routes(app)

export default app