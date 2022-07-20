const express = require('express')
require('dotenv').config()
const sequelize = require('./db')
const models = require('./models/models')
const router = require('./routes/index')
const cors = require('cors')

const PORT = process.env.PORT||2020//указываем порт для сервера

const app = express()//создаем серверное приложение
app.use(cors())
app.use(express.json())
app.use('/', router)

const start = async()=>{
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT,()=>console.log(PORT))
    }
    catch(e){
        console.log(e)
    }
}

start()
