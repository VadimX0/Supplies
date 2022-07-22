import { $host } from ".";

export const fetchOrganizationsSupplies=async(p00)=>{//В зависимости от выбранного субъекта r1022 из бд возвращаются соотвествующие поставки
    const {data} = await $host.get('/organizations', {params:{p00}})
    console.log('data',p00)
    return data
}

export const insertOrganizationsSupply = async(//Внесение в бд введенных в таблицу данных
    r1022, naim_org, adr_fact, 
    inn, plazma_max, plazma_cena, 
    erm_max, erm_cena, immg_max,
    immg_cena, alb_max,alb_cena)=>{
    
    //Значение null для пустых клеток
    naim_org=naim_org||null
    adr_fact=adr_fact||null
    inn=inn||null
    plazma_max=plazma_max||null
    plazma_cena=plazma_cena||null
    erm_max=erm_max||null
    erm_cena=erm_cena||null
    immg_max=immg_max||null
    immg_cena=immg_cena||null
    alb_max=alb_max||null
    alb_cena=alb_cena||null

    const {data} = await $host.post('/organizations', {//Внесение записи в бд
            r1022, naim_org, adr_fact, 
            inn, plazma_max, plazma_cena, 
            erm_max, erm_cena, immg_max,
            immg_cena, alb_max,alb_cena
    })

    return data
}

export const updateSupplies = async(
    id,
    r1022, naim_org, adr_fact, 
    inn, plazma_max, plazma_cena, 
    erm_max, erm_cena, immg_max,
    immg_cena, alb_max,alb_cena)=>{

    const {data} = await $host.put('/organizations', {//Обновление записи в бд
            id,r1022, naim_org, adr_fact, 
            inn, plazma_max, plazma_cena, 
            erm_max, erm_cena, immg_max,
            immg_cena, alb_max,alb_cena
    })

    return data
}

export const deleteSupply=async(id)=>{//Удаление записи из таблицы
    const {data} = await $host.delete('/organizations', {params:{id}})
    return data
}