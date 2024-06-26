"use client";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./features/globalSlice";
import currencyReducer from "./features/currencySlice";
import coinReducer from "./features/coinInfoSlice";
import selectedCoinReducer from "./features/selectedCoinSlice";
import timelineReducer from "./features/timelineSlice";
import coinTableReducer from "./features/coinsTableSlice";
import coinPageReducer from "./features/coinPageSlice";

export const store = configureStore({
  reducer: {
    globalData: globalReducer,
    currency: currencyReducer,
    coinData: coinReducer,
    selectedCoin: selectedCoinReducer,
    timeline: timelineReducer,
    coinsTable: coinTableReducer,
    coinPageData: coinPageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
