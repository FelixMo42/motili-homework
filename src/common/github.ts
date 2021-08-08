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
