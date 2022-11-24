
const functionTemplate = (req, res, next) => {

    const body = req.body;
    const query= req.query;
    
    res.json({
        body,
        query
    })
    res.status(201).send();
}

const postReportsActive = async(req, res) => {
    const postId = req.body.postId;
    pool.query("SELECT * FROM Aplican where id=? AND applicationStatus='Active'",postId,(err,result) => {
        if (err){
            console.log(err)
        } else {
            res.send(result)
        }
    })
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

module.exports = {
    functionTemplate,
    postReportsActive
}