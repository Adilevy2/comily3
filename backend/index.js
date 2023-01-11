const express=require('express');
const comments=require('./routes/comments');
const users=require('./routes/users');
const auth=require('./routes/auth');
const mongoose=require('mongoose');
const morgan=require('morgan');
const app = express();
mongoose.set('strictQuery', false);
const cors=require('cors');
const log = require("./middlewares/logger")



mongoose.connect('mongodb://127.0.0.1:27017/exp2')
.then(()=>console.log('connected to data base'))
.catch(()=>console.log('couldnt connect to data base '));
console.log(` this is the node env ${process.env.NODE_ENV}`) //und
console.log(app.get('env'));


app.use(express.json()); // conver json to javascript and javascript to json
app.use(cors())
app.use(log)
app.use(express.static('public'))
if (app.get('env') === 'development')
  app.use(morgan('tiny'));



app.use('/api/comments',comments)
app.use('/api/users',users)
app.use('/api/auth',auth)

  const port = process.env.PORT || 5002; 

app.listen(port, () => console.log(`active on ${port}`))