import { createSlice } from "@reduxjs/toolkit"


const supplySlice = createSlice({
    name:'supplies',
    initialState:[],
    reducers:{
        setOrganizationsSupply(state, action){//Хранение записей таблицы поставок, полученных из бд
          state=action.payload
          return state
        }
    }
})

export const {setOrganizationsSupply}  = supplySlice.actions
export default supplySlice.reducer