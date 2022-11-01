
const mysql= require('mysql');
const db = mysql.createConnection({
    user: 'admin',
    host:'database-1.ccgnkutt75yl.us-east-1.rds.amazonaws.com',
    password: 'Volun123!',
    database: 'Volun'
});

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

    db.query(
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

const logIn = (req, res, next) => {

    const body = req.body;
    const query= req.query;

    res.json({
        body,
        query
    })
    res.status(201).send();
}

module.exports = {
    changePassword,
    createUser,
    sendCodeNumber,
    logIn
}