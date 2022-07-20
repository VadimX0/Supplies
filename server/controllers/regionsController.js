const { Federals } = require("../models/models");

class RegionsController{
    async allRegions(req, res){
        const regions = await Federals.findAll()
        return res.json(regions)
    }

    
}

module.exports = new RegionsController()
