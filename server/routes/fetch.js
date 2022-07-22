const express = require('express');
cors = require('cors');
const FormData = require('form-data');
const axios = require('axios');
const app = express();
//const api = require('C:/xampp/htdocs/ladder-toolbox/server/routes/fetch');
app.use(express.json());
app.use(cors('*'));

async function download(cid) {
    form = new FormData();
    url = 'http://192.168.50.247:5001/api/v0/get/' + cid;
    console.log(url);
    response = await axios.post(url);
    console.log(response.status);
    //return;
}

app.post('/api/download', (req, res)=> {
    //format body with JSON!!!
    const cid = (req.body.title);
    download(cid);
    res.json({requestBody: req.body});
});

app.get('/api/test', (req, res) => {
    res.send('Success for /api/test!');
});

const port = process.env.PORT || 4001;
app.listen(port, () => console.log('Listening on port ' + port));