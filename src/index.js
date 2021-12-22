const express =require('express');
const port = 3000;
const app = express();
const router=require("../src/routes/api/index");
const conectMongoDb=require("../src/config/db/index");
const passport=require('passport');
// khi minh muon lay data tren url xuong voi rq.body 
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
//passport se lam tham so trong ham ma ben file config export ra
require('./config/passports')(passport)

// load input Validation 
router(app);

conectMongoDb.connect();

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
