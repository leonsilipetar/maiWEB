const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/user-routes.js');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const ServerConfig = require('./serverConfig');
require('dotenv').config();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      const allowedOrigins = ['http://localhost:3000', ''];

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  })
);
/*
const _dirname = path.dirname("");
const buildPath = path.join(_dirname, "../client/build");
app.use(express.static(buildPath));

app.get("/*", function(req, res){

  res.sendFile(
    path.join(__dirname, "../client/build/index.html"),
    function(err) {
      if(err){
        res.status(500),send(err);
      }
    }
  )
})
*/
// Handle preflight requests
app.options('*', cors());

app.use(cookieParser());
app.use(express.json());
app.use('/api', router);


const PORT = process.env.PORT || 5000;

mongoose.set('strictQuery', false);
mongoose.connect(`mongodb+srv://user:${process.env.MONGODB_PASSWORD}@cluster0.negpb65.mongodb.net/`)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database is connected");
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
