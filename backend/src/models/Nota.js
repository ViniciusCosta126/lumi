import { DataTypes } from 'sequelize'
import { sequelize } from '../db_conecction.js'

const Nota = sequelize.define('notas', {

    scee_kwh: {
        type: DataTypes.INTEGER
    },
    scee_valor_total: {
        type: DataTypes.FLOAT
    },
    gdi_kwh: {
        type: DataTypes.INTEGER
    },
    gdi_valor_total: {
        type: DataTypes.FLOAT
    },
    contrib_valor_total: {
        type: DataTypes.FLOAT
    },
    energia_kwh: {
        type: DataTypes.INTEGER
    },
    energia_valor_total: {
        type: DataTypes.FLOAT
    },
    nota: {
        type: DataTypes.STRING
    },
    numero_cliente: {
        type: DataTypes.STRING
    },
    caminho: {
        type: DataTypes.STRING
    },
    mes: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'notas',
    primaryKey: 'id',
    timestamps: false
})

export default Nota