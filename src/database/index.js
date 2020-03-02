const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb+srv://diogo:diogo@cluster0-5ru15.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


//mongoose.connect('mongodb://username:password@cluster0-shard-00-01-5ru15.mongodb.net:27017');

//mongodb://diogo:diogo@ds031982.mongolab.com:31982/bula



/*


mongoose.connect('mongodb+srv://diogo:diogo@cluster0-5ru15.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true
});




*/

//mongodb://username:password@cluster0-shard-00-01-5ru15.mongodb.net:27017/database?options

//mongodb+srv://diogo:diogo@cluster0-5ru15.mongodb.net/test?retryWrites=true&w=majority

mongoose.Promise = global.Promise;

module.exports = mongoose;