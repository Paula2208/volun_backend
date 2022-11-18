
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

const getNumberOfNonProfits  = async(req, res) => {
    pool.query("SELECT COUNT(*) FROM Usuarios where accountType='NON_PROFIT'", (err,result) => {
        if (err){
            console.log(err)
        } else {
            res.send(result)
        }
    })
}


module.exports = {
    getNumberOfPosts,
    getNumberOfNonProfits
}


