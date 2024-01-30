import {StateType} from "@/state/store";

export const selectedHeaders = (state:StateType) => state.table.headers
export const selectedData = (state:StateType) => state.table.data
export const selectedTotalQuantity = (state:StateType) => state.table.totalQuantity
export const selectedTotalExpenses = (state:StateType) => state.table.totalExpenses