const allowedCors = ['http://localhost:3000'];

const cors = (req, res, next) => {
    if (allowedCors.includes(req.headers.origin)) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
    }
    console.log(req.headers);
    next();
};

module.exports = cors;