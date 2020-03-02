const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: false}));

require('./controllers/authController')(app);


const listener = app.listen(3000, function() {
    console.log("Your app is listening on port " + 3000);
    console.log("----------");
    //console.log(laudo);
    
  });