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
        [name,lastName,email,cellphoneNumber,username,password,accountType],
        (err,result) => {
            if(err){
                console.log(err);
            } else {
                res.send("Values inserted");
            }
        });
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

const createTrans=()=>{
    var transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "0dbb026b1f812b",
        pass: "b0667b02828026"
      }
    });
    return transport;
  }

  const sendMail = async (correo,codigo) =>{
    const trasporter=createTrans()
    const info=await trasporter.sendMail({
      form: '"VolUn" <Vol@Un.com>',
      to:correo,
      subject:"Codigo de restablecimiento",
      html:"<b>este es tu codigo de restablecimiento "+codigo+"</b>"
  
    })
    console.log("Message sent: %s",info.messageId)
    return
  } 

 const pass = async(req,res)=>{
    const username = "'"+req.body.user+"'";
    const pass=req.body.pass;
    const comfirmpass="'"+req.body.comfirmpass+"'";
    const newpass="'"+req.body.newpass+"'";
  
  
    pool.query('select password from Usuarios where username='+username,function(error,filas){
      if(error){
        return res.json({"Error":"Usuario errado"});
        console.log("error");
      }else{
        if(filas!=""){
        console.log(filas)
        const contra=filas[0]
        if(pass==(contra.Pass)){
          if(comfirmpass==newpass){
            pool.query('UPDATE Usuarios SET password='+newpass+' WHERE username='+username,function(error,results){
            if(error){
                console.log(error)
  
            }else{
                console.log("cambio exitoso")
                res.json({"Exito":"cambio exitoso"})
            }
            })
          }else{
            console.log("La  nueva contraseña no coincide")
            res.json({"Error":"La  nueva contraseña no coincide"})
          }
        }else{
          console.log("contraseña errada")
  
          res.json({"Error":"contraseña errada"})
        }
  
        }else{
          res.json({"Error":"usuario errado"})
        }
  
      }
    })
  };

  const checkCode = async(req,res)=>{
    const code=req.body.code
    console.log(code)
    if(code==codigo.join("")){
      res.json({"Exito":"codigo correcto"})
      app.put('/forgot-password',async(req,res)=>{
        const clave="'"+req.body.clave+"'"
        const confirmacion="'"+req.body.confirmacion+"'"
        if(clave==confirmacion){
          console.log(iduser)
          pool.query('UPDATE Usuarios SET password='+clave+' WHERE username='+iduser,function(error,results){
            if(error){
                console.log(error)
  
            }else{
                console.log("cambio exitoso")
                res.json({"Exito":"cambio exitoso"})
            }
            })

        }else{
          res.json({"error":"clave no coincide"})
        }
      })
    }else{
      res.json({"Error":"codigo incorrecto"})
    }
    
  };

const forgotPassword = async(req,res)=>{
    const email="'"+req.body.email+"'";
    console.log(email);
    pool.query('Select username from Usuarios where email='+email,function(error,results){
      if(error){
        console.log(error)
      }else{
        if(results!=""){
          iduser=results[0]
          iduser=iduser.users_idusers
          console.log(email)
          const banco = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        
          const codigo=[]
          
          for (var i = 0; i < 5; i++) {     
            codigo.push(banco.charAt(Math.floor(Math.random() * banco.length))
            )   
            
    
          }console.log(codigo.join(""))
          
        sendMail(req.body.email,codigo)  
  
        res.json({"Exito":"codigo enviado exitosamente"})
  
        }else{
          res.json({"Error":"email errado"})
            }
         }
    })
};

  
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
};

const applyToOferta = async(req, res) => {
    const username = req.body.username;
    const id = req.body.id;
    const rows = await pool.query('select username, id, applicationStatus from Aplican where username=? and id=?',
    [username,id]);
    if(rows.length>0){
      const user =rows[0];
      res.send(user); 
    }
    else{
      res.send(false);
    }
};

      
    
  

module.exports = {
    createUser,
    logIn,
    forgotPassword,
    userType,
    applyToOferta,
}