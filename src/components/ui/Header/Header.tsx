
import s from './Header.module.scss'
import {NavLink, useLocation} from "react-router-dom";
import {Button, ButtonVariant} from "@/components/ui";


export const Header = () => {
    const location = useLocation();

    const getButtonVariant = (path: string): ButtonVariant => {
        return location.pathname === path ? 'solid' : 'outline';
    }

    return (
        <div className={s.header}>
            <NavLink to={'/'}>
                <Button variant={getButtonVariant('/')}>Сводная таблица</Button>
            </NavLink>
            <NavLink to={'/aggregate'}>
                <Button variant={getButtonVariant('/aggregate')}>Агрегированная таблица</Button>
            </NavLink>
        </div>
    )
}