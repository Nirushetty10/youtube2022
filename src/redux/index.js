import {configureStore , getDefaultMiddleware } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";

import searchSlice from "./search-slice";
import authSlice from "./auth-slice";

const store = configureStore({
    reducer : {
        search : searchSlice.reducer,
        auth : authSlice,
    } ,
    middleware : [thunkMiddleware , ...getDefaultMiddleware() ]
})

export default store;