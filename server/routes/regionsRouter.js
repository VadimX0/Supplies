const {Router} = require('express')
const regionsController = require('../controllers/regionsController')
const router = new Router()

router.get('/', regionsController.allRegions)//Получить все субъекты

module.exports = router