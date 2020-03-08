const bodyParser = require("body-parser");
const moment = require("moment");

const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}:${moment().format()}`);
    next();
};

module.exports = {
   bodyParser: bodyParser.json(),
   logger: logger
}