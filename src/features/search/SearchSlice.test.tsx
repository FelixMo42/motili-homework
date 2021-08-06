import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from './app/store'

import reducer, {
    makeSearchUrl, initialState,
    addLanguage, removeLanguage
} from './SearchSlice'

test("test make search api request url", () => {
    expect(makeSearchUrl({
        searchTerm: "good fun",
        searchSort: "best-match",
        languages: ["rust"]
    })).toBe("https://api.github.com/search/repositories?q=good fun+language:rust&sort=best-match")

    expect(makeSearchUrl({
        searchTerm: "rep",
        searchSort: "stars",
        languages: ["python", "javascript"]
    })).toBe("https://api.github.com/search/repositories?q=rep+language:python+javascript&sort=stars")

    expect(makeSearchUrl({
        searchTerm: "test",
        searchSort: "updated",
        languages: []
    })).toBe("https://api.github.com/search/repositories?q=test+language:&sort=updated")
})

describe("search slice language filter", () => {
    let state = initialState

    test("adds first language", () => {
        state = reducer(state, addLanguage("rust"))
        expect(state.languages).toEqual(["rust"])
    })

    test("dosen't add duplicate languages if only one", () => {
        state = reducer(state, addLanguage("rust"))
        expect(state.languages).toEqual(["rust"])
    })
   
    test("adds second language", () => {
        state = reducer(state, addLanguage("python"))
        expect(state.languages).toEqual(["rust", "python"])
    })

    test("dosen't add duplicate language", () => {
        state = reducer(state, addLanguage("rust"))
        expect(state.languages).toEqual(["rust", "python"])

        state = reducer(state, addLanguage("python"))
        expect(state.languages).toEqual(["rust", "python"])
    })
    
    test("removes second languages", () => {
        state = reducer(state, removeLanguage("rust"))
        expect(state.languages).toEqual(["python"])
    })

    test("can remove non existant languages", () => {
        state = reducer(state, removeLanguage("rust"))
        expect(state.languages).toEqual(["python"])
    })

    test("can remove first language", () => {
        state = reducer(state, removeLanguage("python"))
        expect(state.languages).toEqual([])
    })

    test("can remove from empty languages", () => {
        state = reducer(state, removeLanguage("rust"))
        expect(state.languages).toEqual([])
    })
})
