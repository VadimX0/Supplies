import { createSlice } from "@reduxjs/toolkit"

export const SET_REGION = 'SET_REGION'




const regionSlice = createSlice({
    name:'region',
    initialState:{},
    reducers:{
        setSelectedRegion(state, action){//Редьюсер, устанавливающий выбранный пользователем регион
          state.region=action.payload
        }
    }
})

export const {setSelectedRegion}  = regionSlice.actions
export default regionSlice.reducer