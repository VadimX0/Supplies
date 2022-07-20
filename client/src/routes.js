
import MainPage from "./pages/MainPage";
import SupplyPlan from "./pages/SupplyPlan";
import { MAIN_ROUTE, PLAN_ROUTE } from "./utils/consts";

export const routes =[
    {
        path:MAIN_ROUTE,
        Component:MainPage
    },
    {
        path:PLAN_ROUTE,
        Component:SupplyPlan
    }
]