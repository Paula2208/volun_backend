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

const postReportsActive = async(req, res) => {
    const postId = req.params.postId;
    pool.query("SELECT U.name,U.lastName,A.username,A.ApplicationStatus FROM Aplican as A LEFT JOIN Usuarios as U ON A.username=U.username WHERE applicationStatus='ACTIVE' AND id=?",postId,(err,result) => {
        if (err){
            console.log(err)
        } else {
            res.send(result)
        }
    })
}

const postReportsPending = async(req, res) => {
    const postId = req.body.postId;
    pool.query("SELECT U.name,U.lastName,A.username,A.ApplicationStatus FROM Aplican as A LEFT JOIN Usuarios as U ON A.username=U.username WHERE applicationStatus='PENDING' AND id=?",postId,(err,result) => {
        if (err){
            console.log(err)
        } else {
            res.send(result)
        }
    })
}

const postReportsDenied = async(req, res) => {
    const postId = req.body.postId;
    pool.query("SELECT U.name,U.lastName,A.username,A.ApplicationStatus FROM Aplican as A LEFT JOIN Usuarios as U ON A.username=U.username WHERE applicationStatus='active' AND id=?",postId,(err,result) => {
        if (err){
            console.log(err)
        } else {
            res.send(result)
        }
    })
}



module.exports = {
    functionTemplate,
    postReportsActive,
    postReportsPending,
    postReportsDenied
}