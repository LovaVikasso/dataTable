import {Button, FileUploader} from "../ui";
import s from './FileControls.module.scss'
import {TableWithHeaders} from "../../common/types.ts";
import {useState} from "react";
import {DeleteDataModal} from "../Modals";

type Props = {
    load: (data: TableWithHeaders) => void
    clear: () => void
}
export const FileControls = ({load, clear}: Props) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const toggleModal = () => setIsModalOpen(!isModalOpen)

    return (
        <div className={s.container}>
            <FileUploader onFileUploaded={load}/>
            <Button onClick={toggleModal}>Очистить таблицу</Button>
            <DeleteDataModal deleteData={clear} isOpen={isModalOpen} toggleModal={toggleModal} />
        </div>
    )
}