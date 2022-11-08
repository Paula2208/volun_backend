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
        "INSERT INTO Ofertas (title,description,location,date,time,category,image, nonProfitUsername)VALUES(?,?,?,?,?,?,?,?)",
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
    const id = req.body.id;


    pool.query(
        "DELETE FROM Ofertas WHERE id= ?",[id],
        (err,result) => {
            if(err){
                console.log(err);
            } else {
                res.send("Post deleted");
            }
        });
}


module.exports = {
    createOferta,
    deleteOferta
}