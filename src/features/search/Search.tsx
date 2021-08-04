import React, { useState } from 'react'
import { store } from '../../app/store'
import { useAppSelector } from '../../app/hooks'
import styles from './Search.module.css'
import { setSearchTerm } from './SearchSlice'
import Repo, { GitHubRepo } from './Repo'

interface GitHubSearchResponse {
    items: GitHubRepo[]
}

export default function Search() {
    let [searchResults, setSearchResults] = useState<GitHubRepo[]>([
        { id: 0, name: "example", owner: { login: "chonk", id: 0 }},
        { id: 1, name: "abue biua", owner: { login: "god", id: 1 }}
    ])

    let searchTerm = useAppSelector(state => state.search.searchTerm) 
    
    function search() {
        fetch(`https://api.github.com/search/repositories?q=${searchTerm}`)
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

        {/* The list of search results */}
        <div>{
            searchResults.map(repo => <Repo key={repo.id} repo={repo}/>)
        }</div>
    </div>
}

