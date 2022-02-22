const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3200;

// middleware goes here
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/SMediadb', {
    // Any options for connecting to the mongoose database should go here
})


app.listen(PORT, () => console.log(`Server now listening on localhost:${PORT} !!`))