const express = require('express');
const router = express.Router();
const mysql = require('mysql');


//connetion database
const mysqlConnection = mysql.createPool({
    connectionLimit: 100,
    host: '',
    user: '',
    password: '',
    database: '',
});





router.get('/', (req, res) => res.send('BIENVENIDO A AGROFIGHTERSPRO'));


router.get('/user/', (req, res) => {
    mysqlConnection.getConnection(function (error, connetion) {
        if (error) {
            console.log('error de myqsl');
        } else {
            mysqlConnection.query('SELECT * FROM Users', (err, rows, fields) => {
                if (rows != '') {
                    res.json(rows);
                } else {
                    res.json(null);
                }
            });
        }
    });
});


router.get('/user/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.getConnection(function (error, connetion) {
        if (error) {
            console.log('error de myqsl');
        } else {
            mysqlConnection.query('SELECT * FROM Users WHERE id =  ?', [id], (err, rows, fields) => {
                if (rows != '') {
                    res.json(rows);
                } else {
                    console.log('no  encontro usuario registrado');
                    res.json(null);
                }
            });
        }
    });
});

router.post('/create/user/', (req, res) => {
    const data = req.body;
    mysqlConnection.getConnection(function (error, connetion) {
        if (error) {
            console.log('error de myqsl');
        } else {
            mysqlConnection.query('INSERT INTO Users set ?', [data], (err, rows, fields) => {
                if (!err) {
                    res.json({ 'status': 'usuario creado' });
                    console.log('creado');
                } else {
                    res.json(null);
                    console.log('error al guardar');
                }
            });
        }
    });
});


router.post('/update/information/user/:id', (req, res) => {
    const { id } = req.params;
    const data = req.body;
    mysqlConnection.getConnection(function (error, connetion) {
        if (error) {
            console.log('error de myqsl');
        } else {
            mysqlConnection.query('UPDATE Users set ? WHERE id = ?', [data, id], (err, rows, fields) => {
                if (!err) {
                    res.json({ status: 'usuario modificado' });
                } else {
                    console.log(err);
                    res.json(null);
                }
            });
        }
    });
});


router.delete('/delete/user/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.getConnection(function (error, connetion) {
        if (error) {
            console.log('error de myqsl');
        } else {
            mysqlConnection.query('DELETE FROM Users WHERE id = ?', [id], (err, rows, fields) => {
                if (!err) {
                    res.json({ status: 'empleado eliminado' });
                } else {
                    res.json(null);
                }
            });
        }
    });
});

module.exports = router;