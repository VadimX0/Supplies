import { $host } from ".";

export const fetchAllRegions = async()=>{
    const {data} = await $host.get('/regions')
    return data
}