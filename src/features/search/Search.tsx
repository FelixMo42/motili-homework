import React, { useState } from 'react'
import { store } from '../../app/store'
import { useAppSelector } from '../../app/hooks'
import styles from './Search.module.css'
import Repo, { GitHubRepo } from './Repo'
import {
    setSearchTerm,
    setSearchSort,
    addLanguage,
    removeLanguage
} from './SearchSlice'

interface GitHubSearchResponse {
    items: GitHubRepo[]
}

export default function Search() {
    let [searchResults, setSearchResults] = useState<GitHubRepo[]>([
        { id: 0, name: "example", owner: { login: "chonk", id: 0 }},
        { id: 1, name: "abue biua", owner: { login: "god", id: 1 }}
    ])

    let searchTerm = useAppSelector(state => state.search.searchTerm) 
    let searchSort = useAppSelector(state => state.search.searchSort) 
    let languages = useAppSelector(state => state.search.languages) 
    
    function search() {
        // We shouldnt search if the search term is blank
        if (searchTerm.length === 0) {
            return
        }

        // https://docs.github.com/en/rest/reference/search#search-repositories
        let searchRequestUrl = [
            // The url for the REST api.
            "https://api.github.com/search/repositories?q=",
            
            // Set the base search term to match against.
            searchTerm,

            // Sets which languages are allowed.
            // If the list is empty, it will allow all of them.
            `+language:${languages.join("+")}`,

            // Set the way we want to sort the results.
            `&sort=${searchSort}`
        ].join("")

        fetch(searchRequestUrl)
            .then(response => response.json())
            .then(response => response as GitHubSearchResponse)
            .then(response => setSearchResults(response.items))
            .catch(console.log)
    }

    return <div>
        {/* The search box */}
        <input
            type="text"
            className={styles.search}
            placeholder="search"
            onInput={event => {
                let element = event.target as HTMLInputElement
                let value = element.value
                store.dispatch(setSearchTerm(value))
            }}
            onKeyUp={event => {
                if ( event.key === "Enter" ) {
                    search()
                }
            }}
        />

        {/* Select sort */}
        <select
            value={searchSort}
            onChange={event => {
                let element = event.target as HTMLSelectElement
                let selected = element.value
                store.dispatch(setSearchSort(selected))
            }}
        >
            <option value="best-match">best match (default)</option>
            <option value="stars">stars</option>
            <option value="forks">forks</option>
            <option value="updated">updated</option>
        </select>

        {/* allowed languages */}
        <div>{languages.map(language =>
            <span
                key={language}
                className={styles.language}
                placeholder="language"
                onClick={event => {
                    let value = (event.target as HTMLElement).innerHTML
                    store.dispatch(removeLanguage(value))
                }}
            >{language}</span>
        )}</div>
        
        <input
            type="text"
            placeholder="language"
            onKeyUp={event => {
                if ( event.key === "Enter" ) {
                    let element = event.target as HTMLInputElement
                    let value = element.value
                    element.value = ""
                    store.dispatch(addLanguage(value))
                }
            }
        }/>

        {/* The list of search results */}
        <div>{
            searchResults.map(repo => <Repo key={repo.id} repo={repo}/>)
        }</div>
    </div>
}

