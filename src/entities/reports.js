const pool = require('../database');

const voluteersReport = async(req, res) => {
    const PENDIN = 'PENDING';
    const ACTIVE = 'ACTIVE';
    const DENIED = 'DENIED';
    const rows = await pool.query(' select o.nonProfitUsername as nonProfitUsername, o.nonProfitName as nonProfitName, count(if(a.applicationStatus =? and o.id=a.id,1,NULL)) as pending, count(if(a.applicationStatus =? and o.id=a.id,1,NULL)) as active, count(if(a.applicationStatus =? and o.id=a.id,1,NULL)) as denied from Ofertas as o, Aplican as a group by o.id',
    [PENDIN, ACTIVE, DENIED]);
    if(rows.length>0){
      res.send(rows); 
    }
    else{
      res.send(false);
    }
};

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
    const postId = req.params.postId;
    pool.query("SELECT U.name,U.lastName,A.username,A.ApplicationStatus FROM Aplican as A LEFT JOIN Usuarios as U ON A.username=U.username WHERE applicationStatus='PENDING' AND id=?",postId,(err,result) => {
        if (err){
            console.log(err)
        } else {
            res.send(result)
        }
    })
}

const postReportsDenied = async(req, res) => {
    const postId = req.params.postId;
    pool.query("SELECT U.name,U.lastName,A.username,A.ApplicationStatus FROM Aplican as A LEFT JOIN Usuarios as U ON A.username=U.username WHERE applicationStatus='DENIED' AND id=?",postId,(err,result) => {
        if (err){
            console.log(err)
        } else {
            res.send(result)
        }
    })
}



module.exports = {
    voluteersReport,
    postReportsActive,
    postReportsPending,
    postReportsDenied
}