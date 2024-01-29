import {Button, ButtonVariant} from "../Button";
import s from './Header.module.scss'
import {NavLink, useLocation} from "react-router-dom";

export const Header = () => {
    const location = useLocation();

    const getButtonVariant = (path: string): ButtonVariant => {
        return location.pathname === path ? 'solid' : 'outline';
    }

    return (
        <div className={s.header}>
            <NavLink to={'/'}>
                <Button variant={getButtonVariant('/')}>Total count</Button>
            </NavLink>
            <NavLink to={'/aggregate'}>
                <Button variant={getButtonVariant('/aggregate')}>Aggregate</Button>
            </NavLink>
        </div>
    )
}