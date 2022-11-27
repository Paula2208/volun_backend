const pool = require('../database');

const voluteersReport = async(req, res) => {
    const PENDIN = 'pendin';
    const ACTIVE = 'active';
    const DENIED = 'denied';
    const rows = await pool.query(' select o.nonProfitUsername as nonProfitUsername, o.nonProfitName as nonProfitName, count(if(a.applicationStatus =? and o.id=a.id,1,NULL)) as pending, count(if(a.applicationStatus =? and o.id=a.id,1,NULL)) as active, count(if(a.applicationStatus =? and o.id=a.id,1,NULL)) as denied from Ofertas as o, Aplican as a group by o.id',
    [PENDIN, ACTIVE, DENIED]);

    if(rows.length>0){
        const results = [];
        rows.forEach((row) => {
            if(results.findIndex((org) => org.nonProfitUsername === row.nonProfitUsername) === -1){
                results.push(row);
            }
            else{
                const i = results.findIndex((org) => org.nonProfitUsername === row.nonProfitUsername);
                const saved = results[i];
                results[i] = {
                    ...saved, 
                    pending: saved.pending + row.pending, 
                    active: saved.active + row.active, 
                    denied: saved.denied + row.denied};
            }
        })
      res.send(results); 
    }
    else{
      res.send(false);
    }
};

const postReportsActive = async(req, res) => {
    const postId = req.params.postId;
    pool.query("SELECT U.name as firstname,U.lastName as lastname,A.username,A.ApplicationStatus as status FROM Aplican as A LEFT JOIN Usuarios as U ON A.username=U.username WHERE applicationStatus='active' AND id=?",postId,(err,result) => {
        if (err){
            console.log(err)
        } else {
            res.send(result)
        }
    })
}

const postReportsPending = async(req, res) => {
    const postId = req.params.postId;
    pool.query("SELECT U.name as firstname,U.lastName as lastname,A.username,A.ApplicationStatus as status FROM Aplican as A LEFT JOIN Usuarios as U ON A.username=U.username WHERE applicationStatus='pendin' AND id=?",postId,(err,result) => {
        if (err){
            console.log(err)
        } else {
            res.send(result)
        }
    })
}

const postReportsDenied = async(req, res) => {
    const postId = req.params.postId;
    pool.query("SELECT U.name as firstname,U.lastName as lastname,A.username,A.ApplicationStatus as status FROM Aplican as A LEFT JOIN Usuarios as U ON A.username=U.username WHERE applicationStatus='denied' AND id=?",postId,(err,result) => {
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