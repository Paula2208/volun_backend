const pool = require('../database');

const getNumberOfPosts  = async(req, res) => {
    pool.query("SELECT COUNT(*) as posts FROM Ofertas", (err,result) => {
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
        org = await pool.query("SELECT COUNT(*) as orgs FROM Usuarios where accountType='NON_PROFIT'");
    }
    catch (e) {
        res.status(500).send();
    }

    try {
        volunteers = await pool.query("SELECT COUNT(*) as volunteers FROM Usuarios where accountType='VOLUNTEER'");
    }
    catch (e) {
        res.status(500).send();
    }

    res.send({
        orgs: org,
        volunteers: volunteers
    });
}


module.exports = {
    getNumberOfPosts,
    getNumberOfUserType
}


