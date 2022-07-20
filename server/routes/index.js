const { Router } = require("express");
const router = new Router()
const regionsRouter = require('./regionsRouter')
const organizationsRouter = require('./organizationsRouter')

router.use('/regions', regionsRouter)
router.use('/organizations', organizationsRouter)

module.exports = router


