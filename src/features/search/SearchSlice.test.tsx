import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from './app/store'

import reducer, { makeSearchUrl, initialState, addLanguage, removeLanguage } from './SearchSlice'

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

test("test language filter slice actions", () => {
    let state = initialState

    state = reducer(state, addLanguage("rust"))
    expect(state.languages).toEqual(["rust"])

    state = reducer(state, addLanguage("rust"))
    expect(state.languages).toEqual(["rust"])
    
    state = reducer(state, addLanguage("python"))
    expect(state.languages).toEqual(["rust", "python"])
    
    state = reducer(state, addLanguage("rust"))
    expect(state.languages).toEqual(["rust", "python"])
    
    state = reducer(state, addLanguage("python"))
    expect(state.languages).toEqual(["rust", "python"])

    state = reducer(state, removeLanguage("python"))
    expect(state.languages).toEqual(["rust"]) 

    state = reducer(state, removeLanguage("python"))
    expect(state.languages).toEqual(["rust"]) 

    state = reducer(state, removeLanguage("rust"))
    expect(state.languages).toEqual([]) 

    state = reducer(state, removeLanguage("rust"))
    expect(state.languages).toEqual([]) 
})
