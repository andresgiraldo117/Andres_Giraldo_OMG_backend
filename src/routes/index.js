const { Router } = require('express');
const routesAuth = require('./Auth.routes');
const routerU  = require('./User.routes');
const routerP = require('./Products.routes');
const router = Router();

router.use('/api/auth', routesAuth);
router.use('/api/users', routerU);
router.use('/api/products', routerP);

module.exports = router;