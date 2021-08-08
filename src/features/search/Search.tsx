import React, { useState, useEffect } from 'react'
import { store } from '../../app/store'
import { useAppSelector } from '../../app/hooks'
import styles from './Search.module.css'
import Repo from './Repo'
import { GitHubRepo } from '../../common/github'
import {
    setSearchTerm, setSearchSort,
    addLanguage, removeLanguage,
    searchRepos
} from './SearchSlice'

export function LangaugeFilter() {
    let languages = useAppSelector(state => state.search.languages) 

    return <span className={styles.languageFilter}>
        {languages.map(language =>
            <span
                key={language}
                className={styles.language}
                placeholder="language"
                onClick={event => {
                    let value = (event.target as HTMLElement).innerHTML
                    store.dispatch(removeLanguage(value))
                }}
            >{language}</span>
        )}

        <input
            type="text"
            className={styles.languageInput}
            placeholder="language filter"
            onKeyUp={event => {
                if ( event.key === "Enter" || event.key === " " ) {
                    let element = event.target as HTMLInputElement
                    let value = element.value.trim()
                    element.value = ""
                    store.dispatch(addLanguage(value))
                }
            }}
        >
        </input>
    </span>
}

function LangaugeTerm() {
    let searchTerm = useAppSelector(state => state.search.searchTerm) 

    return <span className={styles.searchTerm}>
        <input
            type="text"
            placeholder="search"
            value={searchTerm}
            onInput={event => {
                let element = event.target as HTMLInputElement
                let value = element.value
                store.dispatch(setSearchTerm(value))
            }}
        />
    </span>
}

function LangaugeSortSelector() {
    let searchSort = useAppSelector(state => state.search.searchSort) 
    
    return <div className={styles.languageSort}>
        <select
            value={searchSort}
            className={styles.languageSelect}
            onChange={event => {
                let element = event.target as HTMLSelectElement
                let selected = element.value
                store.dispatch(setSearchSort(selected))
            }}
        >
            <option value="best-match">best match</option>
            <option value="stars">most stars</option>
            <option value="forks">most forks</option>
            <option value="updated">recently updated</option>
        </select>
    </div>
}

export default function Search() {
    let [searchResults, setSearchResults] = useState<GitHubRepo[]>([])

    // 
    let searchState = useAppSelector(state => state.search) 
    useEffect(() => {
        searchRepos(searchState)
            .then(repos => setSearchResults(repos))
            .catch(err => console.log(err))
    }, [searchState])

    return <div className={styles.search}>
        {/* Display search box. */}
        <LangaugeTerm />

        <div>
            <LangaugeSortSelector />
            <LangaugeFilter />
        </div>

        {/* Display search results. */}
        {searchResults.map(repo => <Repo key={repo.id} repo={repo} />)}
    </div>
}

