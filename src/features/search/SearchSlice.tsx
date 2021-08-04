import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface SearchState {
    searchTerm: string
}

const initialState: SearchState = {
    searchTerm: ""
}

const counterSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearchTerm(state, action: PayloadAction<string>) {
            state.searchTerm = action.payload
        }
    }
})

export const { setSearchTerm } = counterSlice.actions

export default counterSlice.reducer
