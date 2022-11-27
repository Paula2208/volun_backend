const mysql = require('mysql');
const fs = require('fs');
const { database } = require('../../src/keys');

const table = () =>{
    const con = mysql.createConnection(database);

    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM Usuarios", function (err, rows, fields) {
            if (err) throw err;
            fs.writeFile('users.json', JSON.stringify(rows, null, 2), function (err) {
                if (err) throw err;
            });
            //output(Object.values(JSON.parse(JSON.stringify(rows))));
        });
        con.end();
    });
}
table;
module.export = table();
