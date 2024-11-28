const winston = require('winston');


export const ES = (err, req, res, next) => {
    winston.error(err.message, { metadata: err });
    res.status(500).send('Something went wrong: ' + err.message);
};

// module.exports = (err, req, res, next) => {
//     winston.error(err.message, { metadata: err });
//     res.status(500).send('Something went wrong: ' + err.message);
// };
