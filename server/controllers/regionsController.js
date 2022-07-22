const { Federals } = require("../models/models");

class RegionsController{
    async allRegions(req, res){//Получение всех субъектов из бд
        const regions = await Federals.findAll()
        return res.json(regions)
    }
}

module.exports = new RegionsController()
