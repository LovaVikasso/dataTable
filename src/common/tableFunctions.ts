import {Product} from "./types";

export const isDataEmpty = (data: Product[]): boolean => {
    return !data || data.length === 0 || data.every(item => item.quantity === 0 && item.price === 0);
};

//агрегируем данные по internationalName
export const aggregateData = (data: Product[]) => {
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
