import { Col, Container, Dropdown, Form, Row } from "react-bootstrap"
import {useDispatch, useSelector} from 'react-redux'
import { setSelectedRegion } from "../store/regionReducer"
import { SupplyTable } from "../components/SupplyTable"
import { useEffect, useState } from "react"
import { fetchAllRegions } from "../http/regionsAPI"
import {CircleLoader} from 'react-spinners'
import { BASIC_COLOR } from "../utils/consts"


const SupplyPlan = ()=>{
    const dispatch = useDispatch()
    const [regions, setRegions] = useState([])
    const selectedRegion = useSelector(state=>state.region.region)//Получаем выбранный субъект
    const [searchValue, setSearchValue] = useState('')//поиск по субъектам
    const [loading, setLoading] = useState(true)//Загрузка, пока получаются данные с сервера

    const selectRegion = (region)=>{//Передаем редьюсеру выбранный субъект, и он сохраняется в качестве выбранного
        dispatch(setSelectedRegion(region))
    }

    
    useEffect(()=>{
        fetchAllRegions().then(data=>{
           setRegions(data)
           dispatch(setSelectedRegion(data[0]))//По умолчанию первый субъект выбран
        }).finally(()=>setLoading(false))
    },[])

    const filteredRegions = regions.filter(region=>{//Поиск
        return region.p01?.toLowerCase().includes(searchValue.toLowerCase())
    })
  


    if(loading){
        return <div style={{margin:'10vh'}} className="d-flex justify-content-center"> <CircleLoader size={500} color={BASIC_COLOR}/></div>
    }


    return(
        <Container>
            <Row>
            <Col>
                <SupplyTable/>{/* Основная таблица */}
            </Col>
            </Row>
            <Container style={{height:'5vh'}}></Container>
            <Row>
                <Col md={2}>
                    {/* Выбор региона */}
                    <Dropdown>
                        <Dropdown.Toggle>
                            {selectedRegion.p01}
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{maxHeight:'50vh', overflowY:'scroll'}}>
                        <input placeholder="Поиск" onChange={(e)=>setSearchValue(e.target.value)}></input>
                            {filteredRegions.map(el=>{
                                return <Dropdown.Item key={el.id} onClick={()=>selectRegion(el)}>
                                    {el.p01}
                                </Dropdown.Item>
                            })}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
        </Container>
    )
}

export default SupplyPlan