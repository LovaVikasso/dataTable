import {Button, Modal, ModalProps} from "@/components/ui";
import s from './DeleteDataModal.module.scss'

type Props = {
    deleteData: () => void
} & ModalProps;

export const DeleteDataModal = ({deleteData, isOpen, toggleModal }: Props) => {

    const deleteHandler = () => {
        deleteData();
        toggleModal();
    };
    return (
       <Modal title='Удалить таблицу?' isOpen={isOpen} onClose={toggleModal}>
           <div className={s.container}>
               <h4>Вы уверены что хотите удалить таблицу?</h4>
               <div className={s.buttons}>
                   <Button onClick={toggleModal}>Отмена</Button>
                   <Button onClick={deleteHandler}>Удалить данные</Button>
               </div>
           </div>
       </Modal>
    )
}