export type ProductHeaders = string[]
export type ProductArray = [
    internationalName: string,
    tradeName: string,
    releaseForm: string,
    quantity: number,
    price: number,
]
export type Product = {
    internationalName: string
    tradeName: string,
    releaseForm: string,
    quantity: number,
    price: number,
    expenses: number
}
export type TableWithHeaders = [ProductHeaders, ...ProductArray[]];
export type DataWithHeaders = [ProductHeaders, ...Product[]];