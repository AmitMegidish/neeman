const jwt = require('jsonwebtoken');

const userAuth = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return;
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (error, payload) => {
        if (error) {
            res.status(401).json({ err: true, msg: error.message });
            return;
        }

        if (payload.isAdmin === true) {
            res.status(401).json({ err: true, msg: "Admin are NOT welcomed" });
            return;
        }

        const { _doc } = payload
        req.user = _doc;
        next();
    });
};

const adminAuth = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return;
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (error, payload) => {
        if (error) {
            res.status(401).json({ err: true, msg: error.message });
            return;
        }

        if (payload.isAdmin === false) {
            res.status(401).json({ err: true, msg: "Admins only area!" });
            return;
        }

        const { _doc } = payload;
        req.user = _doc;
        next();
    });
};

module.exports = {
    userAuth,
    adminAuth
};

