import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    GitHubRepo, GitHubSearchResponse, GitHubError,
    makeGitHubRequest
} from '../../common/github'

export interface SearchState {
    searchTerm: string
    searchSort: string
    languages: string[]
}

export const initialState: SearchState = {
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
            for (let language of state.languages) {
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

export function makeSearchUrl(search: SearchState): string {
    // Create the REST api request to search the repos
    // https://docs.github.com/en/rest/reference/search#search-repositories
    return [
        // The path for the search REST api.
        "/search/repositories?q=",
        
        // Set the base search term to match against.
        search.searchTerm,

        // Sets which languages are allowed.
        // If the list is empty, it will allow all of them.
        `+language:${search.languages.join("+")}`,

        // Set the way we want to sort the results.
        `&sort=${search.searchSort}`
    ].join("")
}

export function searchRepos(search: SearchState): Promise<GitHubRepo[]> {
    // We shouldnt search if the search term is blank
    // Instead return a empty list
    if (search.searchTerm.length === 0) {
        return new Promise(done => done([]))
    }

    // Make the api request, then cast the result to the correct type and get the items.
    return makeGitHubRequest(makeSearchUrl(search))
        .then(response => response as GitHubSearchResponse)
        .then(response => response.items)
}

export default counterSlice.reducer

