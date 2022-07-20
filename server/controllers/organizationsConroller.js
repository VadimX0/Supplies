const { response } = require("express")
const { Organizations } = require("../models/models")

class OrganizationsController{
    async insertOrganizationSupply(req, res){//Внесение в бд данных, введенных в таблицу
        try{
            const {
                r1022, naim_org, adr_fact, 
                inn, plazma_max, plazma_cena, 
                erm_max, erm_cena, immg_max,
                immg_cena, alb_max,alb_cena
            } = req.body
    
            const entry = await Organizations.create({ //Запись в таблице вносится в бд
                r1022, naim_org, adr_fact, 
                inn, plazma_max, plazma_cena, 
                erm_max, erm_cena, immg_max,
                immg_cena, alb_max,alb_cena
            })
            return res.json(entry)
        }catch(e){
            return res.json(e)
        }
        
        
    }

    async getOrganizationsSupplies(req,res){
        try{
            const {p00} = req.query//какой субъект выбран
            const entries = await Organizations.findAll({where:{r1022:p00 || "0100000000"}})//выбираем записи с организациями для этого субъекта
            return res.json(entries)
        }catch(e){
            res.json(e)
        }
        
    }

    async updateOrgazationsSupplies(req,res){
        try{
            const {
                id, r1022, naim_org, adr_fact, 
                inn, plazma_max, plazma_cena, 
                erm_max, erm_cena, immg_max,
                immg_cena, alb_max,alb_cena
            } = req.body
    
            const entries = await Organizations.update(
                {
                r1022, naim_org, adr_fact, 
                inn, plazma_max, plazma_cena, 
                erm_max, erm_cena, immg_max,
                immg_cena, alb_max,alb_cena
                },
                {
                    where:{id:id}
                })
                return res.json(entries)
        }catch(e){
            res.json(e)
        }
        
    }

    async deleteSupply(req,res){//удаление записи из таблицы
        try{
            const {id} = req.query
            console.log(req.query)
            const entry = await Organizations.destroy({where:{id:id}})
            return res.json(entry)
        }catch(e){
            res.json(e)
        }
    }
}

module.exports = new OrganizationsController()