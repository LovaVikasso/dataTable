export type ProductHeaders = string[]
export type ProductArray = [
    internationalName: string,
    tradeName: string,
    releaseForm: string,
    quantity: number,
    price: number,
];
export type Product = {
    internationalName: string
    tradeName: string,
    releaseForm: string,
    quantity: number,
    price: number,
    expenses: number
}
//первый элемент массива - заголовки таблицы, остальные элементы массива - ProductArray - то что получаем при загрузке файла
export type TableWithHeaders = [ProductHeaders, ...ProductArray[]];

//первый элемент массива - заголовки таблицы, остальные элементы массива для удобства преобразованы в объект
export type DataWithHeaders = [ProductHeaders, ...Product[]];