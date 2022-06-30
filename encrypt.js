const fs = require('fs');
const http = require('http');
const mysql = require('mysql');
const crypto = require('crypto');
const assert = require('assert');
const formidable = require('formidable');
const { exec } = require('child_process');

http.createServer(function (req, res) {
    if (req.url == '/fileupload') {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            var tempFilePath = files.filetoupload.filepath;
            const projectFilePath = __dirname + '/uploaded_file/' + files.filetoupload.originalFilename;
            fs.rename(tempFilePath, projectFilePath, function (err) {
                if (err) throw err;
                res.write('File has been successfully uploaded');
                res.end()

                //START ENCRYPTION STUFF
                fs.readFile(projectFilePath, 'utf8', (err, data) => {
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
                  fs.writeFile(projectFilePath, result, 'utf-8', (err, result) => { //write encrypted stream to filename (projectFilePath)
                    if (err) {
                      console.error(err);
                      return;
                    };
                    const newFileName = files.filetoupload.originalFilename;
                    const newPath = "uploaded_file/" + files.filetoupload.originalFilename;
                    console.log(newPath);
                    exec(`curl -X POST -F file=@${newPath} http://192.168.50.248:9095/api/v0/add`, (err, stdout, stderr) => {
                      if (err) {
                        console.log('error: ${error.message}', err);
                        return;
                      }
                      if (stderr) {
                        console.log(stderr, stdout);
                        const constCID = stdout; //IPFS RESPONSE VARIABLE
                        //START SQL HERE
                        var con = mysql.createConnection({
                          host: "localhost",
                          user: "root",
                          password: "",
                          database: "ipfs_test"
                        });
                        con.connect(function(err){
                          if (err) throw err;
                          console.log("Connected");
                          var sql = `INSERT INTO files (user, cid, file_name, date_uploaded) VALUES ('john', '${constCID}', '${newFileName}', '62622')`;
                          con.query(sql, function (err, result) {
                            if (err) throw err;
                            console.log("1 record inserted");
                          });
                        });
                        //STOP SQL HERE
                      }
                      return;
                      console.log(stdout);
                    });
                  }); //end fs.writeFile
                  //#
                  return result;
                }); // end fs.readFile
                //
            }); //end form.parse
      }); //end if req.url
    }
    else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="filetoupload"><br>');
        res.write('<input type="submit">');
        res.write('</form>');
        return res.end();
    }
}).listen(8080);
