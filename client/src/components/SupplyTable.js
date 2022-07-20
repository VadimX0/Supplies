import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSupply, updateSupplies } from '../http/organizationsSupplyAPI';
import { insertOrganizationsSupply } from '../http/organizationsSupplyAPI';
import { fetchOrganizationsSupplies } from '../http/organizationsSupplyAPI';
import {Grid, GridColumn, GridToolbar} from '@progress/kendo-react-grid'
import { regions } from '../utils/regions';
import { MyCommandCell } from './CommadCell';
import { setOrganizationsSupply } from '../store/supplyReducer';
import { store } from '../store';
import { orderBy } from "@progress/kendo-data-query";
import { GridPDFExport, PDFExport } from "@progress/kendo-react-pdf";
import { ExcelExport } from '@progress/kendo-react-excel-export';
import '../styles/tableStyle.css'
import { BASIC_COLOR } from '../utils/consts';


const initialDataState = {//Данные для пагинации
    skip: 0,//Сколько записей пропускается на первой странице
    take: 10,//Сколько записей на странице
  };

const initialSort = [//Начальная сортировка по столбцам...
    {
      field: 'id',//...включена по очередности добавления записей в бд
      dir: 'asc',
    },
  ];


export const SupplyTable = ()=>{
    const dispatch = useDispatch()
    const selectedRegion = useSelector(state=>state.region.region)//Выбранный регион определяет какие данные будут в таблице
    const organizationsSupplies = useSelector(state=>state.supplies)
    const [page, setPage] = useState(initialDataState);
    const [editId, setEditID] = useState(null);
    const [sort, setSort] = useState(initialSort);
    const editField = 'inEdit'
    const _export = useRef(null);
    const gridPDFExport = useRef()

    const CommandCell = (props) => (//Кнопки работы с вводом данных (последний столбец)
        <MyCommandCell
          {...props}
          remove={remove}
          add={add}
          update={update}
          cancel={cancel}
          editField={editField}
        />
      ); 

    const fetchOrganizations=()=>{
        fetchOrganizationsSupplies(selectedRegion.p00||'0100000000').then(data=>{//получаем данные из бд для таблицы в зависимости от выбранного субъекта
            dispatch(setOrganizationsSupply(data))
        })
    }

    const enterEdit=(dataItem)=>{//Редактирование записи
        console.log(dataItem.id,'item')
        let newData = organizationsSupplies.map((item) =>
          item.id === dataItem.id ? { ...item, inEdit: true } : item
        );
        dispatch(setOrganizationsSupply(newData))
    }

    const add = (dataItem) => {//Добавление записи
        
        dataItem.inEdit=false
        insertOrganizationsSupply(//Передача данных на сервер
            selectedRegion.p00,//r1022
            dataItem.naim_org, dataItem.adr_fact, dataItem.inn,
            dataItem.plazma_max, dataItem.plazma_cena, dataItem.erm_max,
            dataItem.erm_cena, dataItem.immg_max, dataItem.immg_cena, 
            dataItem.alb_max, dataItem.alb_cena
            ).then(fetchOrganizations)
        
      };

      const update = (dataItem)=>{
        setEditID(null)
        updateSupplies(
            dataItem.id, selectedRegion.p00,
            dataItem.naim_org, dataItem.adr_fact, dataItem.inn,
            dataItem.plazma_max, dataItem.plazma_cena, dataItem.erm_max,
            dataItem.erm_cena, dataItem.immg_max, dataItem.immg_cena, 
            dataItem.alb_max, dataItem.alb_cena
        ).then(fetchOrganizations)
      }

      const remove=(dataItem)=>{//удаление записи из таблицы
        deleteSupply(dataItem.id)
        dispatch(setOrganizationsSupply(organizationsSupplies.filter(el=>el.id!==dataItem.id)))
        console.log(dataItem.id)
      }

      const cancel=()=>{
        setEditID(null)
      }


    const rowClick = (e) => {//При клике по строке она становится редактируемой
        e.dataItem.inEdit ? setEditID(null) : setEditID(e.dataItem.id);
      };

    const itemChange = (e)=>{//Ввод данных при редактировании таблицы
        const editedItemId = e.dataItem.id
        const data = organizationsSupplies.map(item =>
            item.id === editedItemId ? {...item, [e.field]: e.value} : item
        );
        dispatch(setOrganizationsSupply(data))
    }

    const addNew = ()=>{
        if (sort.length){
            sort[0].dir=null //Отключение сортировки во время создания новой записи
        } 
        const newItem = {}
        dispatch(setOrganizationsSupply([newItem, ...organizationsSupplies]))
    }

    const exportPDF = () => {
          if (gridPDFExport!==undefined) {
            console.log(gridPDFExport,'hi')
            gridPDFExport.current.save();
          }
      };


      const excelExport = () => {
        if (_export.current !== null) {
          _export.current.save();
        }
      };

      const pageChange = (event) => {
        setPage(event.page);
      };

    useEffect(()=>{
        fetchOrganizations()
        console.log(organizationsSupplies.length)
    },[selectedRegion])

  
    const grid = (
    <ExcelExport data={organizationsSupplies} ref={_export}>
        <Grid
            skip={page.skip}
            take={page.take}
            total={organizationsSupplies.length}
            pageable={true}
            onPageChange={pageChange}
            editField={editField}
            onItemChange={itemChange}
            onRowClick={rowClick}
            data={orderBy(organizationsSupplies.map(item=>
                ({...item, inEdit: item.id===editId})
            ), sort).slice(page.skip, page.take + page.skip)}
            sortable={true}
            sort={sort}
            onSortChange={(e) => {
                setSort(e.sort);
              }}
        >
            <GridToolbar>
        <button
          style={{backgroundColor:'#fa72a8', borderColor:'#fa72a8'}}
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
          onClick={addNew}>
          Добавить запись
        </button>
        <button
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
          onClick={exportPDF}
        >PDF экспорт</button>
        <button
            style={{backgroundColor:'#90EE90', borderColor:'#90EE90'}}
            title="Export Excel"
            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
            onClick={excelExport}
          >Excel Экспорт
          </button>
      </GridToolbar>
                <GridColumn title='Организация исполнитель'>
                    <GridColumn field='naim_org' title='Наименование'></GridColumn>
                    <GridColumn field='adr_fact' title='Местоположение'></GridColumn>
                    <GridColumn editor='numeric' field='inn' title='Инн'></GridColumn>
                </GridColumn>
                <GridColumn title='Плазма свежозамор.'>
                    <GridColumn editor='numeric' field='plazma_max' title='Макс. об. (тыс. литров)'></GridColumn>
                    <GridColumn editor='numeric' field='plazma_cena' title='Цена (тыс. руб. за один литр)'></GridColumn>
                </GridColumn>
                <GridColumn title='Эритроцитарная масса'>
                    <GridColumn editor='numeric' field='erm_max' title='Макс. об. (тыс. литров)'></GridColumn>
                    <GridColumn editor='numeric' field='erm_cena' title='Цена (тыс. руб. за один литр)'></GridColumn>
                </GridColumn>
                <GridColumn title='Иммуноглобулин человека'>
                    <GridColumn editor='numeric' field='immg_max' title='Макс. об. (тыс. литров)'></GridColumn>
                    <GridColumn editor='numeric' field='immg_cena' title='Цена (тыс. руб. за один литр)'></GridColumn>
                </GridColumn>
                <GridColumn title='Альбумин 10-процентный'>
                    <GridColumn editor='numeric' field='alb_max' title='Макс. об. (тыс. литров)'></GridColumn>
                    <GridColumn editor='numeric' field='alb_cena' title='Цена (тыс. руб. за один литр)'></GridColumn>
                </GridColumn>
                <GridColumn cell={CommandCell}></GridColumn>
            </Grid>
            </ExcelExport>)

            
    
    return (
        <div className='tableStyle'>
          <PDFExport
           ref={gridPDFExport}
            margin="1cm">
            {grid}
          </PDFExport>
        </div>
      );
}

