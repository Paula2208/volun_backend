
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
    const PENDIN = 'PENDIN';
    const ACTIVE = 'ACTIVE';
    const DENIED = 'DENIED';
    const id = req.params.id;
    const rows = await pool.query('select o.nonProfitUsername as nonProfitUsername, o.nonProfitName as nonProfitName, count(if(a.applicationStatus =?,1,NULL)) as pending, count(if(a.applicationStatus =?,1,NULL)) as active, count(if(a.applicationStatus =?,1,NULL)) as denied from Ofertas as o, Aplican as a where o.id = ?',
    [PENDIN, ACTIVE, DENIED, id]);
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