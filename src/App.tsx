import React, { useState } from 'react'
import styles from './App.module.css'

interface GitHubRepo {
    id: number,
    name: string
}

interface GitHubSearchResponse {
    items: GitHubRepo[]
}

export default function App() {
    let [searchResults, setSearchResults] = useState<GitHubRepo[]>([])
    
    function submit(searchString: String) {
        console.log(searchString)

        fetch(`https://api.github.com/search/repositories?q=${searchString}`)
            .then(response => response.json())
            .then(response => response as GitHubSearchResponse)
            .then(response => setSearchResults(response.items))
            .catch(console.log)
    }

    return <div>
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
        {searchResults.map(repo => <div key={repo.id}>{repo.name}</div>)}
    </div>
}

