import {ChangeEvent, useRef} from "react";
import {ProductArray, TableWithHeaders} from "../../../common/types.ts";
import * as XLSX from 'xlsx';
import {Button} from "../Button";

type Props = {
    onFileUploaded: (data: TableWithHeaders) => void
}
export const FileUploader = ({onFileUploaded}: Props) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        // Получение первого выбранного файла из input элемента
        const file = event.target.files?.[0];
        if (!file) return;

        // Создание нового экземпляра FileReader для чтения содержимого файла
        const reader = new FileReader();

        // Установка обработчика события 'load', который срабатывает при успешном завершении чтения файла
        reader.onload = (e: ProgressEvent<FileReader>) => {
            // Проверка на наличие результата чтения файла
            if (!e.target || !e.target.result) return;

            // Чтение содержимого файла как двоичного и создание рабочей книги XLSX
            const workbook = XLSX.read(e.target.result, {type: 'binary'});

            // Получение имени первого листа в рабочей книге
            const sheetName = workbook.SheetNames[0];

            // Получение объекта листа из рабочей книги по имени листа
            const worksheet = workbook.Sheets[sheetName];

            // Преобразование данных листа в массив объектов JSON с указанием, что заголовок находится в первой строке
            const jsonData = XLSX.utils.sheet_to_json<ProductArray>(worksheet, {header: 1});
            // Вызов функции обратного вызова с преобразованными данными, приведенными к типу TableWithHeaders
            onFileUploaded(jsonData as TableWithHeaders);
        };

        // Начало процесса чтения содержимого файла
        reader.readAsBinaryString(file);

        //зачистить value
        event.target.value = '';
    }
        const handleButtonClick = () => {
            if (fileInputRef.current) {
                fileInputRef.current.click();
            }
        };

    return  (
        <>
            <input type="file"
                   ref={fileInputRef}
                   onChange={handleFileUpload}
                   accept=".xlsx, .xls, .csv" // только форматы Excel
                   multiple={false} // только 1 файл
                   style={{ display: 'none' }} // скрыть инпут
            />
            <Button onClick={handleButtonClick}>Upload File</Button>
        </>
    );
}