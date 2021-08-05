import React, { useState, useEffect } from 'react'
import { GitHubRepo } from '../../common/github'

interface AboutParams {
    match: {
        params: {
            name: string,
            owner: string
        }
    }
}

export default function About({match: {params: {owner, name}}}: AboutParams) {
    let [repo, setRepo] = useState<GitHubRepo | undefined>()

    // The message is whats shown beffor the repo is loaded.
    // Defaults to "loading", but will also display error if loading fails.
    let [message, setMessage] = useState<string>("loading")

    // Ask the github api for the repo.
    // Note: Uses no dependencies so that it dosent resend when the repo is set. 
    useEffect(() => {
        fetch(`https://api.github.com/repos/${owner}/${name}`)
            .then(response => response.json())
            .then(response => response as GitHubRepo)
            .then(response => setRepo(response))
            .catch(err => setMessage(err))
    }, [])

    // If the repo is undefined
    if ( repo === undefined ) {
        return <div>{message}</div>
    }

    return <div>
        <div>{owner}/{name}</div>
        <div>{repo.description}</div>
        <br/>
        <div>stars: {repo.stargazers_count}</div> 
    </div>
}

