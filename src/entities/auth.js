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

const createUser = (req, res, next) => {
    const name = req.body.name;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const cellphoneNumber = req.body.cellphoneNumber;
    const password = req.body.password;
    const accountType = req.body.accountType;

    db.query(
        "INSERT INTO voluntarios (name,lastName,email,cellphoneNumber,password,accountType)VALUES(?,?,?,?,?,?)",
        [name,lastName,email,cellphoneNumber,password,accountType],
        (err,result) => {
            if(err){
                console.log(err);
            } else {
                res.send("Values inserted");
            }
        });
}


const logIn = async(req, res) => {
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
}

module.exports = {
    changePassword,
    createUser,
    sendCodeNumber,
    logIn
}