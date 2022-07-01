var express = require('express');
var router = express.Router();

testAPIRouter = require("./routes/testAPI")

app.use("/testAPI", testAPIRouter)
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
