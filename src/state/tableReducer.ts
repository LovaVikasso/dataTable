import {Product, TableWithHeaders} from "../common/types.ts";

export const LOAD_DATA = 'LOAD_DATA';
export const CLEAR_DATA = 'CLEAR_DATA';

type LoadDataAction = {
    type: typeof LOAD_DATA;
    payload: TableWithHeaders;
}
type ClearDataAction = {
    type: typeof CLEAR_DATA;
}

const initialState = {
    headers: [] as string[],
    data: [] as Product[],
    totalQuantity: 0 as number,
    totalExpenses: 0 as number,
};

type TableState = typeof initialState;
type TableAction = LoadDataAction | ClearDataAction

const tableReducer = (state: TableState = initialState, action: TableAction): TableState => {
    switch (action.type) {
        case LOAD_DATA: {
            const [headers, ...rows] = action.payload;
            const data = rows.map((row) => ({
                internationalName: row[0],
                tradeName: row[1],
                releaseForm: row[2],
                quantity: row[3] !== undefined ? row[3] : 0,
                price: row[4] !== undefined ? row[4] : 0,
                expenses: (row[3] !== undefined ? row[3] : 0) * (row[4] !== undefined ? row[4] : 0)
            }));
           const totalQuantity = data.reduce((sum, product) => sum + product.quantity, 0);
           const totalExpenses = +data.reduce((sum, product) => sum + product.expenses, 0).toFixed(2);

            const newState = {
                ...state,
                headers,
                data,
                totalQuantity,
                totalExpenses
            };
            localStorage.setItem('tableData', JSON.stringify(newState));

            return newState;
        }
        case CLEAR_DATA:
            localStorage.removeItem('tableData');
            return {
                ...initialState
            };
        default:
            return state;
    }
};

export default tableReducer;

export const loadData = (tableWithHeaders: TableWithHeaders): LoadDataAction => ({
    type: LOAD_DATA,
    payload: tableWithHeaders
});

export const clearData = (): ClearDataAction => ({
    type: CLEAR_DATA
});
