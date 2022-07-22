const sequelize = require('../db')
const {DataTypes} = require('sequelize')

//Определяем таблицы
const Organizations = sequelize.define('mpe1gem', { //Таблица о возможностях организаций
    id:{type: DataTypes.INTEGER, autoIncrement:true, primaryKey:true},
    npp:{type:DataTypes.INTEGER},
    r1022:{type: DataTypes.STRING(11)},
    naim_org:{type: DataTypes.STRING(1000)},
    adr_fact:{type: DataTypes.STRING(1000)},
    inn:{type: DataTypes.STRING(100)},
    plazma_max:{type:DataTypes.INTEGER},
    plazma_cena:{type:DataTypes.INTEGER},
    erm_max:{type:DataTypes.INTEGER},
    erm_cena:{type:DataTypes.INTEGER},
    immg_max:{type:DataTypes.INTEGER},
    immg_cena:{type:DataTypes.INTEGER},
    alb_max:{type:DataTypes.INTEGER},
    alb_cena:{type:DataTypes.INTEGER},
},
    {schema:'minzdrav', timestamps:false}
)

const Federals = sequelize.define("r1022",{
    p00:{type:DataTypes.STRING},
    p01:{type:DataTypes.STRING},
    p02: {type:DataTypes.STRING},
    utv:{type:DataTypes.STRING,allowNull:true},
    sp:{type:DataTypes.STRING,allowNull:true},
},{schema:'public', timestamps:false, freezeTableName:true})


//Определяем зависимости
Federals.belongsToMany(Organizations, {onDelete:'cascade', onUpdate:'cascade', through:'p00'})//Субъекты имеют по несколько организаций

module.exports = {
    Organizations,
    Federals
}
