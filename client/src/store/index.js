import { applyMiddleware, combineReducers, configureStore } from '@reduxjs/toolkit'
import regionReducer from './regionReducer'
import supplyReducer from './supplyReducer'
import thunk from "redux-thunk";


export const store = configureStore({//Создаем redux хранилище
    reducer:{
        region: regionReducer,
        supplies: supplyReducer
    },
},applyMiddleware(thunk))