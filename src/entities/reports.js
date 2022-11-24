
const functionTemplate = (req, res, next) => {

    const body = req.body;
    const query= req.query;
    
    res.json({
        body,
        query
    })
    res.status(201).send();
}
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

module.exports = {
    functionTemplate,
    voluteersReport
}