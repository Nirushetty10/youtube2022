import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    city : undefined,
    dates : [{
        startDate : new Date(),
        endDate : new Date(),
        key: "selection",
    }],
    options : {
        adult : 1,
        children : 0,
        room : 1,
    }
}

const searchSlice = createSlice({
    name : "SEARCH",
    initialState : INITIAL_STATE,
    reducers : {
        newSearch (state , action) {
            const { city, dates, options } = action.payload;
          state.city = city;
          state.dates = dates;
          state.options = options;
        },
        reSearch (state , action) {
            const { city, dates, options } = action.payload;
          state.city = city;
          state.dates = dates;
          state.options = options;
          }
    }
})

export const SearchActions = searchSlice.actions;
export default searchSlice;