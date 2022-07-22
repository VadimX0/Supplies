import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"
import '@testing-library/jest-dom/extend-expect';
import App from '../App'
import { fetchAllRegions } from "../http/regionsAPI";


describe('Fetching Regions test', ()=>{
    test('Are regions loaded correctly',async()=>{
        render(
            <MemoryRouter>
                <App/>
            </MemoryRouter>
        )
        const supplyLink = screen.queryByTestId('supply-link')//Кнопка планирование поставок
        userEvent.click(supplyLink)
        return fetchAllRegions().then(()=>expect(screen.queryByTestId('toggle-item')).toHaveTextContent('Алтайский край'))//После загрузки страницы выбранный субъект - Алтайский край
    })
})