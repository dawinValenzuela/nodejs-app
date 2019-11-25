const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

const postRouter = require('./routes/postRoutes');

const app = express();

// MIDDLEWARES
app.use(morgan('dev'));

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    req.requestTime = new Date().getTime()/1000;
    next();
});

// ROUTES
app.use('/api/v1/posts', postRouter);

module.exports = app;