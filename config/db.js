const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://pavandpatil003:pavan003@cluster0.goblmqg.mongodb.net/b42_database',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});

  const connection = mongoose.connection;
  connection.on('connected', ()=>{
    console.log('mongodb connected successfully');
  })

  connection.on('error', (error)=>{
    console.log('mongodb connection failed', error);
  })

  module.exports = mongoose;

