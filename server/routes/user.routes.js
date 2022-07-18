let express = require('express'),
    multer = require('multer'),
    router = express.Router();
path = require ('path');
const DIR = '../server/public/';
const FormData = require('form-data');
const fs = require('fs');
const axios = require('axios');
const secretKey = require('secret-key'); 
//const assert = require('assert');
const mysql = require('mysql');
const crypto = require('crypto');
const { exec } = require('child_process');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        fileName = file.originalname.toLowerCase().split(' ').join('-');
        console.log(fileName);
        cb(null, fileName)
        //uuidv4() + '-' + (was directly before fileName, adds UUID in front of filename)
    }
});
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => { 
        cb(null, true); // THIS ACTUALLY UPLOADS IT TO /PUBLIC
        console.log('uploaded!');
        //ENCRYPT HERE
        rFilePath = path.join(__dirname + '../' + '../'+ '/public/' + fileName);
        constFileName = fileName
        console.log(rFilePath);
        fs.readFile(rFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            var buffer = data;
            console.log(data);
            const algorithm = 'aes-256-ctr';
            var length = 8, 
              charset = "abcdefghijklmnopqrstuvwxyzABCEFGHIJKLMNOPQRSTUVWXYZ1234567890",
              retVal = ""; 
            for (var i = 0, n = charset.length; i < length; ++i) {
              retVal += charset.charAt(Math.floor(Math.random() * n));
            }

            let key = retVal
            constKey = retVal;
            console.log(key)
            key = crypto.createHash('sha256').update(key).digest('base64').substr(0, 32);
            const iv = crypto.randomBytes(16);
            const cipher = crypto.createCipheriv(algorithm, key, iv);
            const result = Buffer.concat([iv, cipher.update(buffer), cipher.final()]);
            console.log(result);
            fs.writeFile(rFilePath, result, 'utf-8', (err, result) => { //write encrypted stream to filename (projectFilePath)
                if (err) {
                    console.error(err);
                    return;
                  };

                  //start axios IPFS upload                
                  async function upload() {
                    const form = new FormData();
                    form.append('file', rFilePath);
                    const response = await axios.post(
                        'http://192.168.50.247:9095/api/v0/add',
                        form,
                        {
                            headers: {
                                ...form.getHeaders()
                            }
                        }
                    );
                    //console.log(response);
                    //console.log( response.data.Hash )
                    constCID = response.data.Hash;
                    console.log(constCID);
                  }

                  (async() => {
                    console.log('before start');
                    await upload();
                    console.log('after start');
                    
                    //remove entry in filesystem
                    fs.unlink(rFilePath, function(err){ 
                      if(err) return console.log(err);
                      console.log('file deleted successfully!');
                    });

                    //START SQL HERE - UNCOMMENT WHEN READY FOR DB FILE TRACKING

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
                        var sql = `INSERT INTO files (user, cid, file_name, date_uploaded, encryption_key) VALUES ('john', '${constCID}', '${constFileName}', '71222', '${constKey}')`;
                        con.query(sql, function (err, result) {
                          if (err) throw err;
                          console.log("1 record inserted");
                        });
                      });

                    //STOP SQL HERE

                  })();

                  //end axios IPFS upload

                      
            })
        })
    }
});
// User model ??
let User = require('../models/User');
router.post('/user-profile', upload.single('profileImg'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
})
module.exports = router;