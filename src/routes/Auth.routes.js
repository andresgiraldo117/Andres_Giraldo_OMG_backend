const { Router } = require('express');
const { ClassAuth } = require('../controllers/Auth.controller');
const { ClassUsers } = require('../controllers/Users.controller');
const { apikey } = require('../middlewares/AuthJWT');
const { body, validationResult } = require('express-validator');
const router = Router();
const Boom = require('@hapi/boom');

router.post('/login', apikey,
    body('email').not().isEmpty().trim().isEmail(),
    async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            throw Boom.unauthorized(`The field ${errors.errors[0].param} is ${errors.errors[0].msg} `);
        }
        const { email, password } = req.body;
        const response = await ClassAuth.login(email, password);
        res.status(200).json(response );
    } catch (error) {
        res.status(400);
        next(error);
    }
});

router.post('/register',
    async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            throw Boom.unauthorized(`The field ${errors.errors[0].param} is ${errors.errors[0].msg} `);
        }
        const response = await ClassUsers.register(req.body);
        res.status(200).json(response );
    } catch (error) {
        res.status(400);
        next(error);
    }
});

module.exports = router;
