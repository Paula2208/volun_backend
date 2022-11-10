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

const createUser = (req, res, next) => {
    const name = req.body.name;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const cellphoneNumber = req.body.cellphoneNumber;
    const password = req.body.password;
    const username = req.body.username;
    const accountType = req.body.accountType;

    pool.query(
        "INSERT INTO Usuarios (name,lastName,email,cellphoneNumber,username,password,accountType)VALUES(?,?,?,?,?,?,?)",
        [name,lastName,email,cellphoneNumber,username,password,accountType],
        (err,result) => {
            if(err){
                console.log(err);
            } else {
                res.send("Values inserted");
            }
        });
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

const userType = async(req, res) => {
    const username = req.params.username;
    const rows = await pool.query('select name, lastName, accountType from Usuarios where username = ?',[username]);
    if(rows.length>0){
      const user = rows[0];
      res.send(user); 
    }
    else{
      res.send(false);
    }
}

const applyToOferta = async(req, res) => {
    const username = req.body.username;
    const id = req.body.Ofertas.id;
    const rows = await pool.query('select Usuarios.name, Ofertas.title from Usuarios, Ofertas where Usuarios.username = ? and Ofertas.id = ?',
    [username,id]);
    if(rows.length>0){
      res.send(true); 
    }
    else{
      res.send(false);
    }
}

module.exports = {
    changePassword,
    createUser,
    sendCodeNumber,
    logIn,
    userType,
    applyToOferta
}