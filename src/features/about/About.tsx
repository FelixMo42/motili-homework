import React, { useState, useEffect } from 'react'
import { GitHubRepo } from '../search/Repo'

interface AboutParams {
    match: {
        params: {
            name: string,
            owner: string
        }
    }
}

export default function About({match: {params: {owner, name}}}: AboutParams) {
    useEffect(() => {
        fetch(`https://api.github.com/repos/${owner}/${name}`)
            .then(response => response.json())
            .then(response => response as GitHubRepo)
            // .then(response => setRepo(response))
            .catch(err => console.log(err))
    })

    /* let [repo, setRepo] = useState<GitHubRepo | undefined>()

    if ( repo === undefined ) {
        return <div>loading</div>
    } */

    return <div>{owner}/{name}</div>
}

