const pool = require('../database');

const createOferta = (req, res, next) => {
    const title = req.body.title;
    const description = req.body.description;
    const location = req.body.location;
    const date = req.body.date;
    const time = req.body.time;
    const category = req.body.category;
    const image = req.body.image;
    const nonProfitUsername = req.body.nonProfitUsername;
    const nonProfitName = req.body.nonProfitName;
    const status = req.body.status;


    pool.query(
        "INSERT INTO Ofertas (title,description,location,date,time,category,image,nonProfitUsername,nonProfitName,status)VALUES(?,?,?,?,?,?,?,?,?,?)",
        [title,description,location,date,time,category,image,nonProfitUsername,nonProfitName,status],
        (err,result) => {
            if(err){
                console.log(err);
            } else {
                res.send("Values inserted");
            }
        });
}

const deleteOferta = (req, res, next) => {
    const id = req.params.id;
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
    const username = req.params.username;

    let offerts = [];

    try{
        offerts = await pool.query("SELECT * FROM Ofertas");
    }
    catch(err) {
        console.log(err);
        res.status(500).send();
        return
    }

    const ofertas = await Promise.all(offerts.map(async(offert) => {
        let status = []
        try{
            status = await pool.query("SELECT applicationStatus as status FROM Aplican WHERE username=? AND id=?", 
                                    [username, offert.id]);
            
            if(status.length === 0) status.push({status: 'any'});
        }
        catch(err){
            console.log(err);
            status.push({status: 'any'});
        }
        return { ...offert, status: status[0].status }
    }))

    res.send(ofertas);

}

const getOfertasByCategory = async(req, res) => {
    const category = req.params.category;
    pool.query("SELECT * FROM Ofertas where category=?",category, (err,result) => {
        if (err){
            console.log(err)
        } else {
            res.send(result)
        }
    })

}

const getOrganizationList = async(req, res) => {
    pool.query("SELECT nonProfitName, nonProfitUsername FROM Ofertas", (err,result) => {
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
    const nonProfitUsername = req.body.nonProfitUsername;
    const nonProfitName = req.body.nonProfitName;
    const status = 1;

    const id = req.params.id;

    pool.query( 
        "UPDATE Ofertas SET title=?,description=?,location=?, date=?,time=?,category=?,image=?,nonProfitUsername=?,nonProfitName=?,status=? Where id=?",
        [title,description,location,date,time,category,image,nonProfitUsername,nonProfitName,status,id],      
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
    getOfertasByCategory,
    getOrganizationList
}