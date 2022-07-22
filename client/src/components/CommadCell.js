import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteSupply, fetchOrganizationsSupplies } from "../http/organizationsSupplyAPI"
import { setOrganizationsSupply } from "../store/supplyReducer"
import { BASIC_COLOR } from "../utils/consts"

export const MyCommandCell = (props)=>{//Кнопки управления введенными данными на каждую строку в таблице
    const {dataItem} = props
    const isNewItem = dataItem.id === undefined;//Является ли данная строка новой, созданной пользователем
    const inEdit = dataItem[props.editField];//Выбрана ли данна строка для редактирования
    
    return inEdit?(//Если строка на данный момент редактируется
        <td> 
            <button style={{width:'7vw', backgroundColor:'#90EE90', borderColor:'white',borderRadius:'50px'}} 
                onClick={() => isNewItem ? props.add(dataItem) : props.update(dataItem)}>
                {isNewItem?'Добавить':'Сохранить'}
            </button>
            <button style={{width:'7vw', backgroundColor:'#F5DEB3', borderColor:'white', borderRadius:'50px'}} 
                onClick={()=>props.cancel(dataItem)}>
                Отменить
            </button>
        </td>
    ):(//Если - нет, то отрисовывается только кнопка удалить
        <td>
            <button style={{backgroundColor:BASIC_COLOR, borderRadius:'50px', borderColor:'white'}}
                onClick={()=>props.remove(dataItem)}>Удалить</button>
        </td>
    )
}