import { useNavigate } from 'react-router-dom'
import {Button} from "@/components/ui";
import s from './PageNotFound.module.scss'

export const PageNotFound = () => {
    const navigate = useNavigate()
    const handleGoBack = () => {
        navigate(-1) // -1 означает перейти на предыдущую страницу
    }

    return (
        <div className={s.wrap}>
            <h3>Sorry! Page not found!</h3>
            <Button onClick={handleGoBack}>Back to previous page</Button>
        </div>
    )
}
