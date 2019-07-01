const express = require('express')
const bodyParser = require('body-parser')
require('express-group-routes');

const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

const db = require('./db')

const app = express()
app.use(bodyParser.json())

app.group('/chat', (router) => {

    router.get('/history', expressJwt({secret: 'shhhhhhhhh'}), (req, res) => {
        db.query(`SELECT chats.id,chats.chats, users.name FROM chats INNER JOIN users on chats.by_id = users.id ORDER BY chats.id`, (err, rows, field) => {
            if (err) throw err;

            res.send(rows)
        })
    })

    router.post('/chats', expressJwt({secret: 'shhhhhhhhh'}), (req, res) => {
        const chats = req.body.chats
        const date = new Date().getMinutes()

        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.decode(token, 'shhhhhhhhh')
        const by_id = decode.id

        db.query(`INSERT INTO chats (chats, date, by_id) values ("${chats}", "${date}", "${by_id}")`, (err, rows, fields) => {
            if (err) throw err

            res.send(rows)
            console.log('data inserted')
        })
    })

    router.delete('/delete', (req, res) => {
        const id = req.body.id
        let sql = `DELETE FROM chats WHERE id = ${id}`
        db.query(sql, id, (err, rows, fields) => {
            if (err) throw err

            res.send(rows)
            console.log('the item deleted')
        })
    })

    router.patch('/edit', expressJwt({secret: 'shhhhhhhhh'}), (req, res) => {
        const chats = req.body.chats
        const id = req.body.id

        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.decode(token, 'shhhhhhhhh')
        const by_id = decode.id

        db.query(`UPDATE chats SET chats="${chats}" WHERE id="${id}" AND by_id ="${by_id}"`, (err, rows, fields) => {
            if (err) throw err

            res.send(rows)
            console.log('data inserted')
        })
    })

    router.post('/login', (req, res) => {
        const email = req.body.email
        const password = req.body.password

        db.query(`SELECT * FROM users WHERE email="${email}" AND password="${password}"`, (err, rows, field) => {
            if (err) throw err

            if (rows.length > 0) {
                const id = rows[0].id
                const name = rows[0].name
                const token = jwt.sign({ email: email, id: id, name: name }, 'shhhhhhhhh', { expiresIn: '1h' })
                res.send({token, name});
            } else {
                res.send(401)
            }
        })
    })
})

app.listen(3000, () => {
    console.log('App Started !')
})