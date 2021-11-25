const { Sequelize } = require('sequelize');

const database = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
})

database.authenticate()
    .then(() => console.log('Banco de dados conectado com sucesso.'))
    .catch(() => console.error('Não foi possível conectar ao banco de dados.', error))

module.exports = {
    database
}