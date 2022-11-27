
const express = require('express');
const cors = require('cors')

const app = express();
const nodemailer=require("nodemailer")


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
  

module.exports = app;
const createTrans=()=>{
  var transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "voltunt@gmail.com",
      pass: "gcwtvoettuetliix"
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
/*
var mysql = require('mysql');
const { post } = require('./src/routes/auth');
var conexion = mysql.createConnection({
    host: 'localhost',
    database: 'userdatabase',
    user: 'root',
    password: '_root123'
})

conexion.connect(function(error){
    if(error){
        throw error;

    }else{
        console.log('conexion exitosa')
    }

});
app.post('/pass',async(req,res)=>{
  const username = "'"+req.body.user+"'";
  const pass=req.body.pass;
  const comfirmpass="'"+req.body.comfirmpass+"'";
  const newpass="'"+req.body.newpass+"'";


  conexion.query('select Pass from users where User='+username,function(error,filas){
    if(error){
      return res.json({"Error":"Usuario errado"});
      console.log("error");
    }else{
      if(filas!=""){
      console.log(filas)
      const contra=filas[0]
      if(pass==(contra.Pass)){
        if(comfirmpass==newpass){
          conexion.query('UPDATE users SET Pass='+newpass+' WHERE User='+username,function(error,results){
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
})

app.post('/forgot-password',async(req,res)=>{
  const email="'"+req.body.email+"'";
  conexion.query('Select users_idusers from persona where Email='+email,function(error,results){
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
          
  
        }const stcodigo=(codigo.join(""))        
        console.log(stcodigo)
        
      sendMail(req.body.email,stcodigo)
      conexion.query('update codigo set codigo = "'+stcodigo+'" where idcodigo ='+iduser,function(error,results){
        if(error){
          console.log(error)
        }
      })

      res.json({"Exito":"codigo enviado exitosamente"})
      

      }else{
        res.json({"Error":"email errado"})
      }

    }
  })
})

app.get('/forgot-password',async(req,res)=>{
  const code=req.body.code
  console.log(code)
  conexion.query('SELECT idcodigo from codigo where codigo="'+code+'"',function(error,results){
    if(error){
      console.log(error)
    }else{
      if(results!=""){
        idcode=results[0]
        idcode=idcode.idcodigo
        res.json({"Exito":"codigo correcto","iduser":idcode})
        
        conexion.query('update codigo set codigo =NULL where idcodigo ='+idcode,function(error,results){
          if(error){
            console.log(error)
          }
        } )
        
      }else{
        res.json({"Error":"codigo incorrecto"}) 
      }
    }
  })
  
  
})
app.put('/forgot-password',async(req,res)=>{
  const clave="'"+req.body.clave+"'"
  const confirmacion="'"+req.body.confirmacion+"'"
  const iduser=req.body.iduser
  if(clave==confirmacion){
    console.log(iduser)
    conexion.query('UPDATE users SET Pass='+clave+' WHERE idUsers='+iduser,function(error,results){
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
})*/