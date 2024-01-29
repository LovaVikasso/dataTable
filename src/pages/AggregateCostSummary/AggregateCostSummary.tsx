import {clearData, loadData, selectedData, selectedHeaders, useAppDispatch, useAppSelector} from "../../state";
import s from './AggregateCostSummary.module.scss'
import {Table} from "../../components/ui";
import {Product, TableWithHeaders} from "../../common/types.ts";
import {FileControls} from "../../components/FileControls";
import {formatNumber, formatQuantity} from "../../common/functions.ts";

export const AggregateCostSummary = () => {
    const dispatch = useAppDispatch()

    const headers = useAppSelector(selectedHeaders)
    const data = useAppSelector(selectedData)

    const handleFileUpload = (uploadedData: TableWithHeaders) => {
        dispatch(loadData(uploadedData));
    };
    const handleClearData = () => dispatch(clearData())

    //проверка на то чтобы таблица не была пустая, даже если есть названия столбцов
    const isDataEmpty = !data || data.length === 0 || data.every(item => item.quantity === 0 && item.price === 0);


    const aggregateData = (data: Product[]) => {
        const aggregation: Record<string, {
            internationalName: string;
            tradeNames: Set<string>;
            releaseForms: Set<string>;
            totalQuantity: number;
            totalPrice: number;
            totalExpenses: number
        }> = {};

        data.forEach(item => {
            const {internationalName, tradeName, releaseForm, quantity, price} = item;

            if (!aggregation[internationalName]) {
                aggregation[internationalName] = {
                    internationalName,
                    tradeNames: new Set(),
                    releaseForms: new Set(),
                    totalQuantity: 0,
                    totalPrice: 0,
                    totalExpenses: 0
                };
            }

            aggregation[internationalName].tradeNames.add(tradeName);
            aggregation[internationalName].releaseForms.add(releaseForm);
            aggregation[internationalName].totalQuantity += quantity;
            aggregation[internationalName].totalExpenses += price * quantity;
        });

        return Object.values(aggregation).map(item => ({
            internationalName: item.internationalName,
            tradeNames: Array.from(item.tradeNames).join('\n'),
            releaseForms: Array.from(item.releaseForms).join('\n'),
            totalQuantity: item.totalQuantity,
            averagePrice: item.totalQuantity > 0 ? +(item.totalExpenses / item.totalQuantity).toFixed(2) : 0,
            expenses: item.totalExpenses
        }));
    };

    const aggregatedData = aggregateData(data);

    const totalOverallQuantity = aggregatedData.reduce((acc, item) => acc + item.totalQuantity, 0)
    const totalExpenses = aggregatedData.reduce((sum, item) =>  sum + item.expenses, 0);
    return (
        <div className={s.container}>
            <h3>Агрегированная таблица затрат</h3>
            {!isDataEmpty ? <Table.Root>
                <Table.Head>
                    <Table.Row>
                        {headers.map((header, index) => (
                            <Table.HeadData key={index}>{header}</Table.HeadData>
                        ))}
                        {!isDataEmpty && <Table.HeadData>Затраты</Table.HeadData>}
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
                        if (!item || !internationalName || !tradeNames) return null;
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