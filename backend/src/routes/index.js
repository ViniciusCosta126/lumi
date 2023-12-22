import express from 'express'
import Nota from '../models/Nota.js'
import NotaController from '../controllers/NotaController.js'


const routes = (app)=>{
    app.route('/').get((req,res)=>res.status(200).send("Primeira rota lumi"))

    app.route('/dados').get(NotaController.listarNotas)
    app.route('/dados/:numero_cliente').get(NotaController.listarNotasPorCliente)
    app.use(express.json())
}

export default routes