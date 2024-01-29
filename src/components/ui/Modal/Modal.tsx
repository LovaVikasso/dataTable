import { ReactNode} from 'react';
import {CloseButton} from "../../../assets/icon/close.tsx";
import s from './Modal.module.scss'

export type ModalProps = {
    isOpen: boolean;
    toggleModal: () => void;
};

type Props = {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
};
export const Modal = ({title, isOpen, onClose, children}: Props) => {
    return <>
        {isOpen && (
            <div className={s.overlay} onClick={onClose}>
                <div onClick={(e) => e.stopPropagation()} className={s.content}>
                    <div className={s.header}>
                        <h4>{title}</h4>
                        <CloseButton className={s.close} onClick={onClose}/>
                    </div>
                    {children}

                </div>
            </div>
        )}
    </>
}