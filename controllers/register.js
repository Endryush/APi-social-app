const Register = require('../models/register')

module.exports = app => {
    app.post('/new/account', (req, res) => {
        const newAccount = req.body

        Register.newAccount(newAccount, res)
    })

    app.patch('/delete/account/:id', (req, res) => {
        const id = parseInt(req.params.id)
        
        Register.deleteAccount(id, res)
    })
}