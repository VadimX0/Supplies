const {Router} = require('express')
const router = new Router()
const organizationsController = require('../controllers/organizationsConroller')


router.post('/', organizationsController.insertOrganizationSupply)//Создание записи в таблице
router.get('/', organizationsController.getOrganizationsSupplies)//Получение всех записей в таблице по субъекту
router.put('/', organizationsController.updateOrgazationsSupplies)//Обновление записи в бд при редактировании таблицы
router.delete('/', organizationsController.deleteSupply)//Удаление записи

module.exports = router