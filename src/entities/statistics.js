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


const getNumberOfPosts  = async(req, res) => {
    pool.query("SELECT COUNT(*) FROM Ofertas", (err,result) => {
        if (err){
            console.log(err)
        } else {
            res.send(result)
        }
    })
}

const getNumberOfUserType  = async(req, res) => {
    let org = 0;
    let volunteers = 0;

    try {
        org = await pool.query("SELECT COUNT(*) FROM Usuarios where accountType='NON_PROFIT'");
    }
    catch (e) {
        res.status(500).send();
    }

    try {
        volunteers = await pool.query("SELECT COUNT(*) FROM Usuarios where accountType='VOLUNTEER'");
    }
    catch (e) {
        res.status(500).send();
    }

    res.json({
        orgs: org,
        volunteers: volunteers
    })

    res.status(200).send();
}


module.exports = {
    getNumberOfPosts,
    getNumberOfUserType
}


