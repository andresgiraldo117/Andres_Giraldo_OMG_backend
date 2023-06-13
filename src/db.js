const mongoose = require('mongoose');
const { DB, DB_USER, DB_PASSWORD } = require('./config');

mongoose.set("strictQuery", false);
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.dgatyjh.mongodb.net/${DB}?retryWrites=true&w=majority`)
.then(db => console.log('Db connected to', db.connection.name))
.catch(err => console.error('Failed ', err));