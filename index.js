const customExpress = require('./config/customExpress')
const connection = require('./infra/connection')
const Tables = require('./infra/tables')
const port = 3002
connection.connect(erro => {
    if(erro) {
        console.log(erro)
    } else {
        console.log('conectado com sucesso')
        
        Tables.init(connection)
        
        const app = customExpress()

        app.listen(port, () => console.log(`Servidor rodando na porta ${port}`))
    }
})
