//import express from 'express'
//import cors from 'cors'

const express = require('express');
const cors = require('cors')
const jwt = require('jsonwebtoken');
const app = express();

const PORT = 2022;
app.use(cors());    

function onStart(){
    console.log(`Server running on port ${PORT} - CORS-enabled`);
}

app.listen(PORT, onStart);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Routes

//Modulo de Inicio de sesion
const authRouter = require('./src/routes/auth');

//CRUD de Ofertas
const offersRouter = require('./src/routes/offers');

//CRUD de reportes
const reportsRouter = require('./src/routes/reports');

//Analisis y tendencias
const statisticsRouter = require('./src/routes/statistics');
const pool = require('./src/database');

app.use('/v1', authRouter);
app.use('/v1', offersRouter);
app.use('/v1', reportsRouter);
app.use('/v1', statisticsRouter);

app.get('/', function (req, res) {
  res.send('Welcome to volUN - Backend listening...');
});
  
app.post('/login', async(req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const rows = await pool.query('SELECT * fROM users WHERE username = ?',[username]);
  if(rows.length>0){
    const user = rows[0];
    if(password==user.password){
      res.send('Loggin in');
    }
    else{
      res.send('credenciales incorrectas');
    }

  }
  else{
    res.send('el usuario no existe');
  }
});


module.exports = app;