import Nota from "../models/Nota.js"


class NotaController {
    static async listarNotas(req, res, next) {
        try {
            const dados = await Nota.findAll().then(dados => dados).catch(erro => console.log(erro))
            res.status(200).send(dados)
        } catch (error) {
            console.log(error)
        }
    }
    static async listarNotasPorCliente(req,res,next){
        try {
            const {numero_cliente} = req.params
            console.log(numero_cliente)
            const dados = await Nota.findAll({where:{
                numero_cliente: numero_cliente
            }})
            res.status(200).send(dados)
        } catch (erro) {
            console.log(erro)
        }
    }
}
export default NotaController