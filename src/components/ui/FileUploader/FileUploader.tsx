import {ChangeEvent, useRef} from "react";
import {TableWithHeaders} from "../../../common/types.ts";
import {Button} from "../Button";
import {readFile} from "../../../common/readFile.ts";

type Props = {
    onFileUploaded: (data: TableWithHeaders) => void
}
export const FileUploader = ({onFileUploaded}: Props) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        readFile(file, onFileUploaded);
        event.target.value = ''; // очистить value
    };

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <>
            <input type="file"
                   ref={fileInputRef}
                   onChange={handleFileUpload}
                   accept=".xlsx, .xls, .csv" // только форматы Excel
                   multiple={false} // только 1 файл
                   style={{display: 'none'}} // скрыть инпут
            />
            <Button onClick={handleButtonClick}>Загрузить файл</Button>
        </>
    );
}