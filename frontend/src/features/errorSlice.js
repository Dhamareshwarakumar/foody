import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    errors: null
};

export const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setErrors: (state, action) => {
            state.errors = action.payload;
        }
    }
});

export const { setErrors } = errorSlice.actions;

export default errorSlice.reducer;