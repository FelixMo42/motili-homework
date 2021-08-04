import React from 'react'
import styles from './Search.module.css'

export interface GitHubUser {
    id: number
    login: string
}

export interface GitHubRepo {
    id: number,
    name: string,
    owner: GitHubUser
}

export interface RepoProps {
    repo: GitHubRepo
}

export default function Repo({repo}: RepoProps) {
    return <div className={styles.repo}>
        <span className={styles.repoOwner}>{repo.owner.login}</span>/
        <span className={styles.repoName}>{repo.name}</span>
    </div>
}

