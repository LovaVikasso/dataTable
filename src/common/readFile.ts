import * as XLSX from 'xlsx';
import {ProductArray, TableWithHeaders} from "./types.ts";

export const readFile = (file: File, onFileProcessed: (data: TableWithHeaders) => void) => {
    // Создание нового экземпляра FileReader для чтения содержимого файла
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
        // Проверка на наличие результата чтения файла
        if (!e.target || !e.target.result) return;

        // Чтение содержимого файла как двоичного и создание рабочей книги XLSX
        const workbook = XLSX.read(e.target.result, { type: 'binary' });

        // Получение имени первого листа в рабочей книге
        const sheetName = workbook.SheetNames[0];

        // Получение объекта листа из рабочей книги по имени листа
        const worksheet = workbook.Sheets[sheetName];

        // Преобразование данных листа в массив объектов JSON с указанием, что заголовок находится в первой строке
        const jsonData = XLSX.utils.sheet_to_json<ProductArray>(worksheet, { header: 1 });

        // Вызов функции обратного вызова с преобразованными данными, приведенными к типу TableWithHeaders
        onFileProcessed(jsonData as TableWithHeaders);
    };

    // Начало процесса чтения содержимого файла
    reader.readAsBinaryString(file);
};