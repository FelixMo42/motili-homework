import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface SearchState {
    searchTerm: string
    searchSort: string
}

const initialState: SearchState = {
    searchTerm: "",
    searchSort: "best-match"
}

const counterSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearchTerm(state, action: PayloadAction<string>) {
            state.searchTerm = action.payload
        },
        setSearchSort(state, action: PayloadAction<string>) {
            state.searchSort = action.payload
        }
    }
})

export const { setSearchTerm, setSearchSort } = counterSlice.actions

export default counterSlice.reducer
