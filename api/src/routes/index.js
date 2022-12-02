const { Router, response } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const countryRouter = require("./countryRouter.js");
const activityRouter = require("./activitiesRouter.js");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use ('/countries', countryRouter);
router.use ('/act', activityRouter); 

module.exports = router;
