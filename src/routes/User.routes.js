const { Router } = require('express');
const { verifyToken, apikey, isUser } = require('../middlewares/AuthJWT');
const { ClassUsers } = require('../controllers/Users.controller');
const routerU = Router();


routerU.post('/', async (req, res, next) => {
    try {
        const response = await ClassUsers.register( req.body );
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
});

routerU.get('/', verifyToken, apikey, isUser,  async (req, res, next) =>{
    try {
        const response = await ClassUsers.getAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(403);
        next(error);
    }
});

routerU.get('/:id' , verifyToken, apikey, isUser , async(req, res, next) => {
    try {
        const response = await ClassUsers.getById(req.params.id);
        if(response === undefined)
            throw new Error('Error');

        if(Object.keys(response).length === 0)
            throw new Error('No se encontro un usuario');
        
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
});

routerU.put('/modify/:id', verifyToken, apikey, isUser, async(req, res, next) => {
    try {
        const response = await ClassUsers.update(req.params.id, req.body);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
});

routerU.delete('/remove/:id', verifyToken, apikey, isUser, async(req, res, next) => {
    try {
        const response = await ClassUsers.remove(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
});

module.exports = routerU;