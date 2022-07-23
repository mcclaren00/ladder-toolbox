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
async function fetchAll(user, callback) {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "ipfs_test"
      });
      con.connect(function(err){
        if (err) throw err;
        console.log("Connected");
        var sql = `SELECT * FROM files WHERE (user = '${user}');`
        con.query(sql, function (err, results) {
          if (err) throw err;
          userFiles = results;
          return callback(results);
        });
    });
}

app.post('/api/download', (req, res) => {
    //format body with JSON!!!
    const cid = (req.body.title);
    res.send(download(cid));
    res.json({requestBody: req.body});
});

app.post('/api/fetch', async (req, res) => {
    const user = (req.body.title);
    var userFiles = '';
    try {
        fetchAll(user, function(results) {
            userFiles = results;
            console.log('lolxd stuff i want');
            console.log(userFiles);
            res.json(userFiles);
        })
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

app.get('/api/test', (req, res) => {
    res.send('Success for /api/test!');
});

const port = process.env.PORT || 4001;
app.listen(port, () => console.log('Listening on port ' + port));