let express = require('express'),
    multer = require('multer'),
    router = express.Router();
const DIR = './public/';
const fs = require('fs');
//const assert = require('assert');
//const mysql = require('mysql');
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
        rFilePath = '../server/public/' + fileName;
        console.log(rFilePath);
        fs.readFile(rFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            var buffer = data;
            console.log(data);
            const algorithm = 'aes-256-ctr';
            let key = 'MySuperSecretKey';
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
                  const newPath = rFilePath;
                  console.log(newPath);
                  exec(`curl -X POST -F file=@${newPath} http://192.168.50.247:9095/api/v0/add`, (err, stdout, stderr) => {
                    if (err) {
                      console.log('error: ${error.message}', err);
                      return;
                    }
                    if (stderr) {
                      console.log(stderr, stdout);
                      const constCID = stdout; //IPFS RESPONSE VARIABLE

                      //Deletes file
                      fs.unlink(newPath, function(err){ 
                        if(err) return console.log(err);
                        console.log('file deleted successfully!');
                      });
                      //START SQL HERE - UNCOMMENT WHEN READY FOR DB FILE TRACKING
                      //var con = mysql.createConnection({
                        //host: "localhost",
                        //user: "root",
                        //password: "",
                        //database: "ipfs_test"
                      //});
                      //con.connect(function(err){
                        //if (err) throw err;
                        //console.log("Connected");
                        //var sql = `INSERT INTO files (user, cid, file_name, date_uploaded) VALUES ('john', '${constCID}', '${newFileName}', '62622')`;
                        //con.query(sql, function (err, result) {
                          //if (err) throw err;
                          //console.log("1 record inserted");
                        //});
                      //});
                      //STOP SQL HERE
                    }
                    return;
                    console.log(stdout);
                  });
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