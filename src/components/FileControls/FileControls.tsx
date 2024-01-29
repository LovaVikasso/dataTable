import {Button, FileUploader} from "../ui";
import s from './FileControls.module.scss'
import {TableWithHeaders} from "../../common/types.ts";

type Props = {
    load: (data: TableWithHeaders) => void
    clear: () => void
}
export const FileControls = ({load, clear}: Props) => {
    return (
        <div className={s.container}>
            <FileUploader onFileUploaded={load}/>
            <Button onClick={clear}>Очистить таблицу</Button>
        </div>
    )
}