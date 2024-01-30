import {useCallback, useMemo} from "react";
import {clearData, loadData, selectedData, selectedHeaders, useAppDispatch, useAppSelector} from "@/state";
import { Table } from "@/components/ui";
import {FileControls} from "@/components/FileControls";
import {formatNumber, formatQuantity} from "@/common/functions";
import {aggregateData, isDataEmpty} from "@/common/tableFunctions";
import {TableWithHeaders} from "@/common/types";
import s from './AggregateCostSummary.module.scss'


export const AggregateCostSummary = () => {
    const dispatch = useAppDispatch()

    const headers = useAppSelector(selectedHeaders)
    const data = useAppSelector(selectedData)

    const handleFileUpload = useCallback((uploadedData: TableWithHeaders) => {
        dispatch(loadData(uploadedData));
    }, [dispatch]);

    const handleClearData = useCallback(() => {
        dispatch(clearData());
    }, [dispatch]);

    const isEmpty = useMemo(() => isDataEmpty(data), [data]);

    const aggregatedData = useMemo(() => aggregateData(data), [data]);

    const [totalOverallQuantity, totalExpenses] = useMemo(() => {
        return aggregatedData.reduce(
            ([totalQuantity, totalExp], item) => [totalQuantity + item.totalQuantity, totalExp + item.expenses],
            [0, 0]
        );
    }, [aggregatedData]);

    return (
        <div className={s.container}>
            <h3>Агрегированная таблица затрат</h3>
            {!isEmpty ? <Table.Root>
                <Table.Head>
                    <Table.Row>
                        {headers.map((header, index) => (
                            <Table.HeadData key={index}>{header}</Table.HeadData>
                        ))}
                        <Table.HeadData>Затраты</Table.HeadData>
                    </Table.Row>
                </Table.Head>
                <Table.Body>
                    {aggregatedData.map((item, index) => {
                        const {
                            internationalName,
                            tradeNames,
                            releaseForms,
                            totalQuantity,
                            averagePrice,
                            expenses
                        } = item;
                        if (!item || !internationalName) return null;
                        return (
                            <Table.Row key={index}>
                                <Table.Data>{internationalName}</Table.Data>
                                <Table.Data>{tradeNames}</Table.Data>
                                <Table.Data>{releaseForms}</Table.Data>
                                <Table.Data>{formatQuantity(totalQuantity)}</Table.Data>
                                <Table.Data>{formatNumber(averagePrice)}</Table.Data>
                                <Table.Data>{formatNumber(expenses)}</Table.Data>
                            </Table.Row>
                        );
                    })}
                    <Table.Row className={s.total}>
                        <Table.Data></Table.Data>
                        <Table.Data></Table.Data>
                        <Table.Data>Итого:</Table.Data>
                        <Table.Data>{formatQuantity(totalOverallQuantity)}</Table.Data>
                        <Table.Data></Table.Data>
                        <Table.Data>{formatNumber(totalExpenses)}</Table.Data>
                    </Table.Row>
                </Table.Body>
            </Table.Root> : <Table.Empty/>}
            <FileControls load={handleFileUpload} clear={handleClearData}/>
        </div>
    )
}