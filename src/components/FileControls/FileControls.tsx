import {memo, useState} from "react";
import {TableWithHeaders} from "@/common/types";
import {Button, FileUploader} from "@/components/ui";
import {DeleteDataModal} from "@/components/Modals";
import s from './FileControls.module.scss'

type Props = {
    load: (data: TableWithHeaders) => void
    clear: () => void
}
export const FileControls = memo(({load, clear}: Props) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const toggleModal = () => setIsModalOpen(!isModalOpen)

    return (
        <div className={s.container}>
            <FileUploader onFileUploaded={load}/>
            <Button onClick={toggleModal}>Очистить таблицу</Button>
            <DeleteDataModal deleteData={clear} isOpen={isModalOpen} toggleModal={toggleModal} />
        </div>
    )
})