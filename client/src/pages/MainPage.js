import { useEffect } from "react"
import { Container, Row } from "react-bootstrap"
import { useHistory } from "react-router-dom"

import { BASIC_COLOR, PLAN_ROUTE } from "../utils/consts"


const MainPage=()=>{
    return(
        <div data-testid='main-page' style={styles.cardStyle}>
            <div style={{display:'flex', flexDirection:'column',justifyContent:'space-evenly', marginLeft:'1%'}}>
                <h4 style={styles.textItemsStyle}>Статистика</h4>
                <h4 style={styles.textItemsStyle}>Справочная информация</h4>
            </div>
        </div>
    )
}

const styles={
    cardStyle:{
        marginTop:'10vh',
        border:'2px solid black',
        borderRadius:5,
        display:'flex',
        width:'50vw',
        height:'50vh',
        backgroundColor:BASIC_COLOR
    },
    textItemsStyle:{
        display:'flex',
        cursor:'pointer',
        border:'1px solid grey',
        borderRadius:7,
        paddingLeft:'10%',
        paddingRight:'10%',
        width:'150%'
    }
}

export default MainPage