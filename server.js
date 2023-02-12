const { urlencoded } = require('express');
const express = require('express');
const fs = require('fs');
const apiRouter = require('./routes/apiRouter');
const frontRouter = require('./routes/frontRouter');

const app = express();
const PORT = 3001;

// parse incoming json
app.use(express.json());
// parse incoming string or array
app.use(express.urlencoded({ extended: true }));
// middleware
app.use(express.static('public'));

// Accessing routers
app.use('/api', apiRouter);
app.use('/', frontRouter);

// Call to listen to port
app.listen(PORT, () => {
    console.log('App listening on 3001');
});