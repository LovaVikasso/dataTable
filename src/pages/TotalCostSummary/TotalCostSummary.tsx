import {Table} from "../../components/ui";

import s from './TotalCostSummary.module.scss'
import {clearData, useAppDispatch, useAppSelector} from "../../state";
import {TableWithHeaders} from "../../common/types.ts";
import {loadData} from "../../state";
import {selectedData, selectedHeaders, selectedTotalExpenses, selectedTotalQuantity} from "../../state";
import {FileControls} from "../../components/FileControls";
import {formatNumber, formatQuantity} from "../../common/functions.ts";

export const TotalCostSummary = () => {

    const dispatch = useAppDispatch()

    const headers = useAppSelector(selectedHeaders)
    const data = useAppSelector(selectedData)
    const totalQuantity = useAppSelector(selectedTotalQuantity)
    const totalExpenses = useAppSelector(selectedTotalExpenses)

    const handleFileUpload = (uploadedData: TableWithHeaders) => {
        dispatch(loadData(uploadedData));
    };
    const handleClearData = () => dispatch(clearData())
    //проверка на то чтобы таблица не была пустая, даже если есть названия столбцов
    const isDataEmpty = !data || data.length === 0 || data.every(item => item.quantity === 0 && item.price === 0);

    return (
        <div className={s.container}>
            <h3>Total cost summary</h3>

            {!isDataEmpty ? (
                <Table.Root>
                    <Table.Head>
                        <Table.Row>
                            {headers.map((header, index) => (
                                <Table.HeadData key={index}>{header}</Table.HeadData>
                            ))}
                            {!isDataEmpty && <Table.HeadData>Затраты</Table.HeadData>}
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {data.map((item, index) => {
                            const {internationalName, tradeName, releaseForm, quantity, price, expenses} = item
                            return (<Table.Row key={index}>
                                <Table.Data>{internationalName}</Table.Data>
                                <Table.Data>{tradeName}</Table.Data>
                                <Table.Data>{releaseForm}</Table.Data>
                                <Table.Data>{formatQuantity(quantity)}</Table.Data>
                                <Table.Data>{formatNumber(price)}</Table.Data>
                                <Table.Data>{formatNumber(expenses)}</Table.Data>
                            </Table.Row>)
                        })}
                        <Table.Row className={s.total}>
                            <Table.Data></Table.Data>
                            <Table.Data></Table.Data>
                            <Table.Data>Итого:</Table.Data>
                            <Table.Data>{formatNumber(totalQuantity)}</Table.Data>
                            <Table.Data></Table.Data>
                            <Table.Data>{formatNumber(totalExpenses)}</Table.Data>
                        </Table.Row>
                    </Table.Body>
                </Table.Root>
            ) : (
                <Table.Empty/>
            )}
            <FileControls load={handleFileUpload} clear={handleClearData} />
        </div>
    )
}