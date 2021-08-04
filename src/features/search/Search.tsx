import React, { useState } from 'react'
import styles from './Search.module.css'
import Repo, { GitHubRepo } from './Repo'

interface GitHubSearchResponse {
    items: GitHubRepo[]
}

export default function Search() {
    let [searchResults, setSearchResults] = useState<GitHubRepo[]>([
        { id: 0, name: "example", owner: { login: "chonk", id: 0 }},
        { id: 1, name: "a;uebiua", owner: { login: "god", id: 1 }}
    ])
    
    function submit(searchString: String) {
        fetch(`https://api.github.com/search/repositories?q=${searchString}`)
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
            onKeyUp={event => {
                if ( event.key === "Enter" ) {
                    let inputValue = (event.target as HTMLInputElement).value
                    submit(inputValue)
                }
            }}
        />

        {/* The list of search results */}
        <div>{
            searchResults.map(repo => <Repo key={repo.id} repo={repo}/>)
        }</div>
    </div>
}

