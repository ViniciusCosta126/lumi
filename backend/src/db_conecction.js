import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(`postgresql://${process.env.USER}:${process.env.PASSWORD}@localhost:5432/${process.env.DB}`)
async function connectDatabase() {
    try {
        await sequelize.authenticate()
        console.log('Conectado ao db')
    } catch (error) {
        console.error(error)
    }
}


export { connectDatabase, sequelize } 