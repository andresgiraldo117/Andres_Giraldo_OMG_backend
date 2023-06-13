const { Router } = require('express');
const { ClassProducts } = require('../controllers/Products.controller');
const { verifyToken, apikey, isUser } = require('../middlewares/AuthJWT');
const routerP = Router();
const { body, validationResult } = require('express-validator');
const Boom = require('@hapi/boom');
const express = require('express');
const multer = require('multer');

routerP.post('/', 
    verifyToken, apikey, isUser, async(req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            throw Boom.unauthorized(`The field ${errors.errors[0].param} is ${errors.errors[0].msg} `);
        }
        const response = await ClassProducts.register(req.user, req.body);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
});

routerP.get('/', verifyToken, apikey, isUser,  async(req, res, next) => {
    try {
        const response = await ClassProducts.getAll(req.user);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
});

routerP.get('/:id', verifyToken, apikey, isUser, async(req, res, next) => {
    try {
        const response = await ClassProducts.getById(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
});

routerP.put('/modify/:id', verifyToken, apikey, isUser, async(req, res, next) => {
    try {
        const response = await ClassProducts.update(req.params.id, req.body);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
});

routerP.delete('/remove/:id', verifyToken, apikey, isUser, async(req, res, next) => {
    try {
        const response = await ClassProducts.delete(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
});


module.exports = routerP;