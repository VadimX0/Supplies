import { useHistory, useLocation } from "react-router-dom"
import { BASIC_COLOR, MAIN_ROUTE, PLAN_ROUTE } from "../utils/consts"
import {AiFillHome} from 'react-icons/ai'
import {GiHandTruck} from 'react-icons/gi'
import { Col, Container, Row } from "react-bootstrap"


const TasksBar = ()=>{//Боковая панель для перехода пос траницам
    const history = useHistory()
    return(
        <div style={styles.blockStyle}>
            <Row data-testid='main-link' onClick={()=>history.push(MAIN_ROUTE)} style={{cursor:'pointer'}}>
                <h5 style={{textAlign:'center'}}>Главная</h5>
                <AiFillHome size={40}/>
            </Row>
                <div style={{height:'5%'}}></div>
                <Row data-testid='supply-link' style={{cursor:'pointer'}}  onClick={()=>history.push(PLAN_ROUTE)}>
                <h5 style={{textAlign:'center'}}>Планирование поставок</h5>
                <GiHandTruck size={40}/>
            </Row>
        </div>
    )
}

const styles ={
    blockStyle:{
        border:'1px solid grey',
        position:'fixed',
        width:'10vw',
        height:'100vh',
        borderRightWidth:2,
        borderLeftWidth:0,
        backgroundColor:BASIC_COLOR,
        justifyContent:'space-evenely'
    }
}

export default TasksBar

