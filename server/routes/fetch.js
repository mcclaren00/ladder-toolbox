const express = require('express');
cors = require('cors');
const FormData = require('form-data');
const axios = require('axios');
const app = express();
const mysql = require('mysql');
app.use(express.json());
app.use(cors('*'));

async function download(cid) {
    form = new FormData();
    url = 'http://192.168.50.247:5001/api/v0/get/' + cid;
    console.log(url);
    response = await axios.post(url);
    console.log(response);
    console.log(response.status);
    console.log(response.data);
    //console.log(response.config);
    //return;
}

app.post('/api/download', (req, res) => {
    //format body with JSON!!!
    const cid = (req.body.title);
    download(cid);
    res.json({requestBody: req.body});
});

app.get('/api/test', (req, res) => {
    res.send('Success for /api/test!');
});

app.get('/api/fetch', (req, res) => {
    //res.send('Success for /api/fetch!');
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "ipfs_test"
      });
      con.connect(function(err){
        if (err) throw err;
        console.log("Connected");
        //using static set username field for now - no dynamic value to pass in currently
        var constName = 'john'
        var sql = `SELECT * FROM files WHERE (user = '${constName}');`
        //var sql = `INSERT INTO files (user, cid, file_name, date_uploaded, encryption_key) VALUES ('john', '${constCID}', '${constFileName}', '71222', '${constKey}')`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Records retrieved");
          console.log(result);
          res.send(result);
        });
      });
      //res.send(result);
});
const port = process.env.PORT || 4001;
app.listen(port, () => console.log('Listening on port ' + port));