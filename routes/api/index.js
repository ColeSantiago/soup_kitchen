const router = require('express').Router();
const kitchenRoutes = require('./kitchen');

router.use('/kitchen', kitchenRoutes);

module.exports = router;