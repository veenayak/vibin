const express = require("express");
const app = express();
const routes = require('./routes/route');

app.use(express.json({limit: '50mb'}));

app.use('/', routes);
app.use('/uploads', express.static(__dirname +'/uploads'));

const PORT = process.env.PORT || 8081;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));