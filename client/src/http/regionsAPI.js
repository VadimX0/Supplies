import { $host } from ".";

export const fetchAllRegions = async()=>{
    const {data} = await $host.get('/regions')//Запрос всех субъектов
    return data
}