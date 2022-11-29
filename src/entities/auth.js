const pool = require('../database');
const nodemailer=require("nodemailer")

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
    [name, lastName, email, cellphoneNumber, username, password, accountType],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values inserted");
      }
    });
}

const logIn = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const rows = await pool.query('SELECT * fROM Usuarios WHERE username = ?', [username]);
  if (rows.length > 0) {
    const user = rows[0];
    if (password == user.password) {
      res.send(true);
    }
    else {
      res.send(false);
    }

  }
  else {
    res.send(false);
  }
}

const createTrans=()=>{
  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "voltunt@gmail.com",
      pass: "gcwtvoettuetliix"
    }
  });

  return transport;
}

const sendMail = async (correo, codigo) => {
  const trasporter = createTrans()
  const info = await trasporter.sendMail({
    form: '"VolUn" <Vol@Un.com>',
    to: correo,
    subject: "Retrieve Code - VolUN",
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="display: flex; background-color: #FFFFFF; justify-content: center;">
    
    <head>
        <meta charset="UTF-8">
        <meta content="width=device-width, initial-scale=1" name="viewport">
        <meta name="x-apple-disable-message-reformatting">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta content="telephone=no" name="format-detection">
        <title>Retrieve Password VolUN</title>
    </head>
    
    <body style="background-color: #020A40;display: flex;flex-direction: column;text-align: center;border: 3px solid #4960F4;justify-content: center; padding: 50px; border-radius: 10px; align-items: center; width: fit-content;">
        <h1 style="color: #4960F4; font-size: 60px;">
            Forgot Password Code
        </h1>
        <h2 style="color: #FFFFFF; font-size: 30px; font-weight: lighter;">
            Oh! You have forgotten your VolUN password...
        </h2>
        <span style="color: #FFFFFF; font-size: 20px; font-weight: lighter;">
            Don't worry, here is your forgot password code to change it!
        </span>
        <span style="color: #4960F4; font-size: 30px; font-weight: bold; display: flex;flex-direction: column;text-align: center;border: 3px solid #4960F4;justify-content: center; padding: 10px; border-radius: 10px; margin-top: 30px; width: 40%;">
            ${codigo}
        </span>
    </body>
    
    </html>`

  })
  console.log("Message sent: %s", info.messageId)
  return
}

const changePassword = async (req, res) => {
  const email = req.body.email;
  const code = req.body.code;
  const newpass = req.body.password;

  let users = [];

  try{
    users = await pool.query(`Select * from Usuarios where email='${email}'`);
  }
  catch(error){
    console.log(error);
    res.status(500).send();
    return
  }

  if(users.length > 0){
    try{
      const rows = await pool.query('UPDATE Usuarios SET password = ? WHERE email = ?',
      [newpass, email]);
    }
    catch(error){
      console.log('Error on update', error);
      res.status(500).send();
      return
    }

    try{
      const r = await pool.query(`DELETE FROM Codes WHERE code='${code}'`);
    }
    catch(error){
      console.log('Error on delete', error);
      res.status(500).send();
      return
    }

    res.send(true);
    return;
  }

  res.send(false);
  return;
};

const checkCode = async (req, res) => {
  const code = req.body.code

  let codes = [];

  try{
    codes = await pool.query(`Select * from Codes where code='${code}'`);
  }
  catch(error){
    console.log(error);
    res.status(500).send();
    return
  }

  if (codes.length > 0 && codes[0].code === code) {
    res.send(true);
  } 
  else {
    res.send(false);
  }

};

const sendCode = async (req, res) => {
  const email = req.body.email
  
  let users = [];

  try{
    users = await pool.query(`Select * from Usuarios where email='${email}'`);
  }
  catch(error){
    console.log('Error on users', error);
    res.status(500).send();
    return
  }

  if(users.length > 0 && users[0].email === email){
    const banco = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    const code = []

    for (var i = 0; i < 5; i++) {
      code.push(banco.charAt(Math.floor(Math.random() * banco.length)))
    }

    try{
      const rows = await pool.query("INSERT INTO Codes (code,username,email_codes) VALUES(?,?,?)",
      [code.join(""), users[0].username , email]);
    }
    catch(error){
      console.log('Error on rows',error);
      res.status(500).send();
      return
    }

    sendMail(email, code.join(""));
    res.status(201).send();
  }
  else{
    res.status(404).send();
  }

};

const userType = async (req, res) => {
  const username = req.params.username;
  const rows = await pool.query('SELECT name, lastName, accountType FROM Usuarios WHERE username = ?', [username]);
  if (rows.length > 0) {
    const user = rows[0];
    res.send(user);
  }
  else {
    res.send(false);
  }
};

const applyToOferta = async (req, res) => {
  const username = req.body.username;
  const id = req.body.id;

  try {
    const rows = await pool.query('INSERT INTO Aplican (username, id, applicationStatus) VALUES (?, ?, ?)',
      [username, id, 'pendin']);
  }
  catch (err) {
    console.log(err);
    res.status(500).send();
    return
  }

  res.send(true);
};

const changeStatus = async (req, res) => {
  const applicationStatus = req.body.status;
  const postId = req.body.id;
  const idAplican = req.body.username;

  try{
    const rows = await pool.query('UPDATE Aplican SET applicationStatus = ? WHERE username = ? AND id=?',
    [applicationStatus, idAplican, postId]);
  }
  catch(err){
    console.log(err);
    res.status(500).send();
  }

  res.send(true);

}

module.exports = {
  createUser,
  logIn,
  sendCode,
  userType,
  applyToOferta,
  changeStatus,
  checkCode,
  changePassword
}
