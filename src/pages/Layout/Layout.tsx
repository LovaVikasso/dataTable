import { Outlet } from 'react-router-dom'
import {Header} from "../../components/ui";

export const Layout = () => {
    return (
        <div>
            <Header/>
            <Outlet />
        </div>
    )
}