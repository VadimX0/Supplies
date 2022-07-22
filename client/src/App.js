import { Col,Row } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import TasksBar from "./components/TasksBar";
import '@progress/kendo-theme-default/dist/all.css';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  
  return (
    <Provider store={store}>
        <BrowserRouter>
        <Row>
        <Col md={1} >
          <TasksBar/>  {/* Боковое меню с задачами */}
        </Col>
        <Col style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
          <AppRouter/>  {/* Страницы и маршрцты к ним */}
          </Col>
          </Row>
        </BrowserRouter>
        </Provider>
  );
}

export default App;
