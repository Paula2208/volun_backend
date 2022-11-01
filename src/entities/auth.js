const pool = require('../database');
const changePassword = (req, res, next) => {

    const body = req.body;
    const query= req.query;
    
    res.json({
        body,
        query
    })
    res.status(201).send();
}


const sendCodeNumber = (req, res, next) => {

    const body = req.body;
    const query= req.query;
    
    res.json({
        body,
        query
    })
    res.status(201).send();
}

const functionTemplate = (req, res, next) => {

    const body = req.body;
    const query= req.query;
    
    res.json({
        body,
        query
    })
    res.status(201).send();
}

const logIn = async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const rows = await pool.query('SELECT * fROM Usuarios WHERE username = ?',[username]);
    if(rows.length>0){
      const user = rows[0];
      if(password==user.password){
        res.send(true);
      }
      else{
        res.send(false);
      }
  
    }
    else{
      res.send(false);
    }
}

module.exports = {
    changePassword,
    createUser,
    sendCodeNumber,
    logIn
}