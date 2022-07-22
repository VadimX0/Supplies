import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"
import '@testing-library/jest-dom/extend-expect';
import App from '../App'
import ReactDOM from 'react-dom';
import { fetchAllRegions } from "../http/regionsAPI";

describe('Router',()=>{
    
    test('URL Error',()=>{//При неправильном адресе пользователя должно переносить на главную
        render(
            <MemoryRouter initialEntries={['/agrgr']}>
                <App/>
            </MemoryRouter>
        )
        expect(screen.getByTestId('main-page')).toBeInTheDocument()
    }),

    test('MainPage test',async()=>{//Тестирует как работает маршрутизация в приложении
        render(
            <MemoryRouter>
                <App/>
            </MemoryRouter>
        )
        
        const mainLink = screen.getByTestId('main-link')//Кнопка главная на боковой панели
        const supplyLink = screen.queryByTestId('supply-link')//Кнопка планирование поставок
        userEvent.click(mainLink)//Пользователь нажимает на главную
        expect(screen.getByTestId('main-page')).toBeInTheDocument()//Его переносит на главную страницу
        userEvent.click(supplyLink)
        return fetchAllRegions().then(()=>expect(screen.queryByTestId('supply-page')).toBeInTheDocument())//Страница загружается после получения данных с сервера
    })
})