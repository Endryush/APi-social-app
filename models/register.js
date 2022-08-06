const moment = require('moment');
const { EMAIL_ALREADY_REGISTERED, GENERIC_ERROR_MESSAGE } = require('../config/enums/customErrorMessages');
const connection = require('../infra/connection');


class Register {
    newAccount(account, res) {
        const registration_date = moment().format('YYYY-MM-DD HH:MM:SS')
        const newMail = { ...account, registration_date }
        let sql = 'SELECT email FROM account'

        connection.query(sql, (error, response,) => {

            const listOfMails = response

            const hasEmail = listOfMails.some(email => email.email == account.email)

            if (hasEmail) {
                res.status(429).json(EMAIL_ALREADY_REGISTERED)
                return
            }

            sql = 'INSERT INTO account SET ?'

            connection.query(sql, newMail, (error, response) => {
                if (error) {
                    res.status(400).json(GENERIC_ERROR_MESSAGE)
                } else {
                    res.status(201).json(account.email)
                }
            })
        })
    }

    editAccount() {

    }

    deleteAccount(id, res) {
        const inactive_date = moment().format('YYYY-MM-DD HH:MM:SS')
        const active = 0
        const sql = 'UPDATE account SET ? WHERE id=?'
        
        connection.query(sql, [{active, inactive_date}, id], (error, resultados) => {
            if(error) {
                res.status(400).json(error)
            } else {
                res.status(200).json()
            }
        })
    }
}

module.exports = new Register