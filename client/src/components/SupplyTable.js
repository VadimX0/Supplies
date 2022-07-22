import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSupply, updateSupplies } from '../http/organizationsSupplyAPI';
import { insertOrganizationsSupply } from '../http/organizationsSupplyAPI';
import { fetchOrganizationsSupplies } from '../http/organizationsSupplyAPI';
import {Grid, GridColumn, GridToolbar} from '@progress/kendo-react-grid'
import { MyCommandCell } from './CommadCell';
import { setOrganizationsSupply } from '../store/supplyReducer';
import { filterBy, orderBy } from "@progress/kendo-data-query";
import { GridPDFExport, PDFExport } from "@progress/kendo-react-pdf";
import { ExcelExport } from '@progress/kendo-react-excel-export';
import '../styles/tableStyle.css'



const initialDataState = {//Свойства пагинации
    skip: 0,//Сколько записей пропускается на первой странице
    take: 10,//Сколько записей на странице
  };

const initialFilter = {//Фильтрация столбцов по умолчанию
    logic: "and",
    filters: [
      {
        field: "naim_org",
        operator: "contains",
        value: "",
      },
    ],
    
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
    const organizationsSupplies = useSelector(state=>state.supplies)//Записи таблицы в redux хранилище 
    const [page, setPage] = useState(initialDataState);
    const [editId, setEditID] = useState(null);//id редактируемой строки
    const [sort, setSort] = useState(initialSort);
    const [filter, setFilter] = useState(initialFilter);
    const [isAddNewEntryAvailable, setAddNewEntryAvailable] = useState(true)//Разрешено ли добавление новой записи
    const editField = 'inEdit'
    const _export = useRef(null);//Состояние для excel экспорта
    const gridPDFExport = useRef()//Для pdf
    

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

      const headerCell=(el)=>{//Кастомные заголовки столбцов
        return(
          <div className='colTitle'>{el.title}</div>
        )
      }

    const fetchOrganizations=()=>{
      fetchOrganizationsSupplies(selectedRegion.p00||'0100000000').then(data=>{//получаем данные из бд для таблицы в зависимости от выбранного субъекта
          dispatch(setOrganizationsSupply(data.sort((a,b)=>a.id-b.id)))//В таблице записи буду отсортированы по id, т.е. по порядку создания
      })
    }

    const add = (dataItem) => {//Добавление записи
      dataItem.inEdit=false
      setAddNewEntryAvailable(true)//Разрешено создать новую запись
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
      setAddNewEntryAvailable(true)
      deleteSupply(dataItem.id)
      dispatch(setOrganizationsSupply(organizationsSupplies.filter(el=>el.id!==dataItem.id)))
    }

    const cancel=(dataItem)=>{//Отменить редактирование 
      setEditID(null)
      dataItem.id===undefined && setAddNewEntryAvailable(true)//Если добавлялась новая запись, и ее добавление отменено, можно создать новую
      fetchOrganizations()//Возвращаются данные из бд вместо введенных
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
      if(isAddNewEntryAvailable){
        // if (sort.length){
        //     sort[0].dir=null //Отключение сортировки во время создания новой записи
        // } 
        const newItem = {}
        dispatch(setOrganizationsSupply([newItem, ...organizationsSupplies]))
        setAddNewEntryAvailable(false)//Во время редактирования новой записи добавление очередной запрещено
      }
    }

    const exportPDF = () => {
      if (gridPDFExport!==undefined) {
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
    },[selectedRegion])//Отрисовка компонента при изменении выбранного субъекта

  
    const grid = (
      <ExcelExport data={organizationsSupplies} ref={_export}>
        <Grid
        style={{fontSize:'14px', overflowWrap:'break-word', lineBreak:'strict'}}
          skip={page.skip}
          take={page.take}
          total={organizationsSupplies.length}
          pageable={true}
          onPageChange={pageChange}
          editField={editField}
          onItemChange={itemChange}
          onRowClick={rowClick}
          data={filterBy(organizationsSupplies.map(item=>
            ({...item, inEdit: item.id===editId})), filter).
              slice(page.skip, page.take + page.skip)}
          filterable={true}
          filter={filter}
          onFilterChange={(e) => setFilter(e.filter)}
            // sortable={true}
            // sort={sort}
            // onSortChange={(e) => {
            //     setSort(e.sort);
            
            //   }}
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
              onClick={exportPDF}>
                PDF экспорт
            </button>
            <button
              style={{backgroundColor:'#90EE90', borderColor:'#90EE90'}}
              title="Export Excel"
              className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
              onClick={excelExport}>
                Excel Экспорт
            </button>
            </GridToolbar>
                <GridColumn title={`Таблица о возможностях организаций, находящихся в ведении или сфере деятельности субъекта ${selectedRegion.p01}`}>
                <GridColumn headerCell={headerCell} title='Организация исполнитель'>
                    <GridColumn headerCell={headerCell} field='naim_org' title='Наименование' width='150%'></GridColumn>
                    <GridColumn headerCell={headerCell} field='adr_fact' title='Местоположение' width='160%'></GridColumn>
                    <GridColumn headerCell={headerCell} editor='numeric' field='inn' title='Инн' width='160%'></GridColumn>
                </GridColumn>
                <GridColumn headerCell={headerCell} title='Плазма свежозамор.'>
                    <GridColumn filterable={false} headerCell={headerCell} editor='numeric' field='plazma_max' title='Макс. об. (тыс. литров)'></GridColumn>
                    <GridColumn filterable={false} headerCell={headerCell} editor='numeric' field='plazma_cena' title='Цена (тыс. руб. за один литр)'></GridColumn>
                </GridColumn>
                <GridColumn headerCell={headerCell} title='Эритроцитарная масса'>
                    <GridColumn filterable={false} headerCell={headerCell} editor='numeric' field='erm_max' title='Макс. об. (тыс. литров)'></GridColumn>
                    <GridColumn filterable={false} headerCell={headerCell} editor='numeric' field='erm_cena' title='Цена (тыс. руб. за один литр)'></GridColumn>
                </GridColumn>
                <GridColumn headerCell={headerCell} title='Иммуноглобулин человека'>
                    <GridColumn filterable={false} headerCell={headerCell} editor='numeric' field='immg_max' title='Макс. об. (тыс. литров)'></GridColumn>
                    <GridColumn filterable={false} headerCell={headerCell} editor='numeric' field='immg_cena' title='Цена (тыс. руб. за один литр)'></GridColumn>
                </GridColumn>
                <GridColumn headerCell={headerCell} title='Альбумин 10-процентный'>
                    <GridColumn filterable={false} headerCell={headerCell} editor='numeric' field='alb_max' title='Макс. об. (тыс. литров)'></GridColumn>
                    <GridColumn filterable={false} headerCell={headerCell} editor='numeric' field='alb_cena' title='Цена (тыс. руб. за один литр)'></GridColumn>
                </GridColumn>
                <GridColumn filterable={false} width='122%' cell={CommandCell}></GridColumn>
                </GridColumn>
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

