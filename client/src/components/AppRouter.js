import React from 'react'
import {Switch, Redirect, Route} from 'react-router-dom'
import MainPage from '../pages/MainPage'
import { routes } from '../routes'

const AppRouter = ()=>{
    return(
    <div>
        <Switch>
                {routes.map(({path, Component})=>{//Каждый путь переносит на соответствующую страницу
                    return <Route key={path} path = {path} component={Component} exact/>
                })}
                <Redirect to ={MainPage}/> 
                {/* По умолчанию открывается главная страница */}
            </Switch>
    </div>
    )
}

export default AppRouter