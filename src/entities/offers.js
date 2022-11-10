const pool = require('../database');

const functionTemplate = (req, res, next) => {

    const body = req.body;
    const query= req.query;
    
    res.json({
        body,
        query
    })
    res.status(201).send();
}

const createOferta = (req, res, next) => {
    const title = req.body.title;
    const description = req.body.description;
    const location = req.body.location;
    const date = req.body.date;
    const time = req.body.time;
    const category = req.body.category;
    const image = req.body.image;
    const nonProfitUsername = req.body.nonProfitUsername

    pool.query(
        "INSERT INTO Ofertas (title,description,location,date,time,category,image,nonProfitUsername)VALUES(?,?,?,?,?,?,?,?)",
        [title,description,location,date,time,category,image,nonProfitUsername],
        (err,result) => {
            if(err){
                console.log(err);
            } else {
                res.send("Values inserted");
            }
        });
}

const deleteOferta = (req, res, next) => {
    const id = req.param.id;


    pool.query(
        "DELETE FROM Ofertas WHERE id= ?",id,
        (err,result) => {
            if(err){
                console.log(err);
            } else {
                res.send("Post deleted");
            }
        });
}

const getOfertas = async(req, res) => {
    pool.query("SELECT * FROM Ofertas", (err,result) => {
        if (err){
            console.log(err)
        } else {
            res.send(result)
        }
    })

}

const getOrganizationList = async(req, res) => {
    const category = req.param.id;
    pool.query("SELECT * FROM Ofertas where category=?",[category], (err,result) => {
        if (err){
            console.log(err)
        } else {
            res.send(result)
        }
    })

}

const updateOferta = (req, res, next) => {
    const title = req.body.title;
    const description = req.body.description;
    const location = req.body.location;
    const date = req.body.date;
    const time = req.body.time;
    const category = req.body.category;
    const image = req.body.image;
    const nonProfitUsername = req.body.nonProfitUsername
    const id = 3;

    pool.query( 
        "UPDATE Ofertas SET title=?,description=?,location=?, date=?,time=?,category=?,image=?,nonProfitUsername=? Where id=?",
        [title,description,location,date,time,category,image,nonProfitUsername,id],      
        (err,result) => {
            if(err){
                console.log(err);
            } else {
                res.send("Values inserted");
            }
        });
}

module.exports = {
    createOferta,
    deleteOferta,
    getOfertas,
    updateOferta,
}