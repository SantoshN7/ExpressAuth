const express = require("express");
const middleware = require("./middleware");
const api = require("./api");
const cors = require("cors");

//Setting port
const PORT = process.env.PORT || 8080;
//creating server
const app = express();
app.use(cors());
//middleware call
app.use(middleware.logger, middleware.bodyParser);

//Sample get req
app.get('/', (req, res) => {
    res.sendStatus(200);
});

//api handler
app.use('/api', api);

//server started and listen ***
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
