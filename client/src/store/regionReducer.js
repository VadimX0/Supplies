import { createSlice } from "@reduxjs/toolkit"

export const SET_REGION = 'SET_REGION'

const defaultState = {
    region:'Москва'
}


const regionSlice = createSlice({
    name:'region',
    initialState:{
        region:'Москва'//По умолчанию выбран регион Москва
    },
    reducers:{
        setSelectedRegion(state, action){//Редьюсер, устанавливающий выбранный пользователем регион
          state.region=action.payload
        }
    }
})

export const {setSelectedRegion}  = regionSlice.actions
export default regionSlice.reducer