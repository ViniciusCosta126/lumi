import Nota from "../models/Nota.js"


class NotaController {
    static async listarNotas(req, res, next) {
        try {
            const dados = await Nota.findAll()
            if (dados.length > 0) {
                res.status(200).json(dados)
            } else {
                res.status(404).send({ 'message': "Nenhum dado encontrado!!" })
            }

        } catch (error) {
            console.log(error)
        }
    }
    static async listarNotasPorCliente(req, res, next) {
        try {
            const { numero_cliente } = req.params
            const dados = await Nota.findAll({
                where: {
                    numero_cliente: numero_cliente
                }
            })
            if (dados.length > 0) {
                res.status(200).json(dados)
            } else {
                res.status(404).send({ 'message': "Cliente nao encontrado!!" })
            }

        } catch (erro) {
            console.log(erro)
        }
    }
}
export default NotaController