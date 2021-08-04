import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface SearchState {
    searchTerm: string
    searchSort: string
    languages: string[]
}

const initialState: SearchState = {
    searchTerm: "",
    searchSort: "best-match",
    languages: []
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
        },
        addLanguage(state, action: PayloadAction<string>) {
            // Check too make sure were not adding a duplicate language.
            for (let language in state.languages) {
                if ( language === action.payload ) {
                    return
                }
            }

            // Add the language too the list
            state.languages = [...state.languages, action.payload]
        },
        removeLanguage(state, action: PayloadAction<string>) {
            state.languages = state.languages.filter(language => language !== action.payload)
        }
    }
})

export const {
    setSearchTerm,
    setSearchSort,
    addLanguage,
    removeLanguage
} = counterSlice.actions

export default counterSlice.reducer
