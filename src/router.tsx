import {createBrowserRouter, Outlet, RouteObject, RouterProvider} from "react-router-dom";
import {Layout, AggregateCostSummary, TotalCostSummary, PageNotFound} from "./pages";

//доступные пути
const tableRoutes: RouteObject[] = [
    {
        path: '/',
        element: <TotalCostSummary/>,
    },
    {
        path: '/aggregate',
        element: <AggregateCostSummary/>,
    },
    {
        path: '/*',
        element: <PageNotFound />,
    },
]

//создание роутера с layout (внутри только Header), в children компонент с outlet и роуты
const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                element: <TableRouter/>,
                children: tableRoutes,
            },
        ],
    },
]);

 //обертка для App
export const Router = () => {
    return <RouterProvider router={router}/>
}

//нужен для Outlet, здесь можно добавть состояние загрузки
function TableRouter() {
    return <Outlet/>
}
