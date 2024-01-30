import {useCallback, useMemo} from "react";
import {Table} from "@/components/ui";
import {FileControls} from "@/components/FileControls";
import {
    clearData,
    useAppDispatch,
    loadData,
    useAppSelector,
    selectedData,
    selectedHeaders,
    selectedTotalExpenses,
    selectedTotalQuantity
} from "@/state";
import {TableWithHeaders} from "@/common/types";
import {formatNumber, formatQuantity} from "@/common/functions";
import {isDataEmpty} from "@/common/tableFunctions";
import s from './TotalCostSummary.module.scss'

export const TotalCostSummary = () => {

    const dispatch = useAppDispatch()

    const headers = useAppSelector(selectedHeaders)
    const data = useAppSelector(selectedData)
    const totalQuantity = useAppSelector(selectedTotalQuantity)
    const totalExpenses = useAppSelector(selectedTotalExpenses)

    const handleFileUpload = useCallback((uploadedData: TableWithHeaders) => {
        dispatch(loadData(uploadedData));
    }, [dispatch]);

    const handleClearData = useCallback(() => {
        dispatch(clearData());
    }, [dispatch]);

    const isEmpty = useMemo(() => isDataEmpty(data), [data]);

    return (
        <div className={s.container}>
            <h3>Сводная таблица затрат</h3>

            {!isEmpty ? (
                <Table.Root>
                    <Table.Head>
                        <Table.Row>
                            {headers.map((header, index) => (
                                <Table.HeadData key={index}>{header}</Table.HeadData>
                            ))}
                            <Table.HeadData>Затраты</Table.HeadData>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {data.map((item, index) => {
                            const {internationalName, tradeName, releaseForm, quantity, price, expenses} = item
                            if (!item || !internationalName || !tradeName) return null;
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
            <FileControls load={handleFileUpload} clear={handleClearData}/>
        </div>
    )
}