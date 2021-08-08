export interface GitHubSearchResponse {
    items: GitHubRepo[]
}

export interface GitHubUser {
    id: number
    login: string
}

export interface GitHubRepo {
    id: number,
    name: string,
    owner: GitHubUser,
    description: string,
    stargazers_count: number,
    watchers_count: number,
}

export interface GitHubError {
    message: string,
}

export function makeGitHubRequest(path: string): Promise<Object> {
    return new Promise(async (done, fail) => {
        let response = await fetch("https://api.github.com" + path)
            .then(response => response.json())
            .then(response => response as Object)

        if ("message" in response) {
            let error = response as GitHubError
            fail(error.message)
        } else {
            let data = response as Object
            done(data)
        }
    })
}

