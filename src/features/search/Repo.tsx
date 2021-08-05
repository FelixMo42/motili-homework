import React from 'react'
import styles from './Search.module.css'
import { Link } from 'react-router-dom'

export interface GitHubUser {
    id: number
    login: string
}

export interface GitHubRepo {
    id: number,
    name: string,
    owner: GitHubUser,
    description: string,
    stargazers_count: 80,
    watchers_count: number,
}

export interface RepoProps {
    repo: GitHubRepo
}

export default function Repo({repo}: RepoProps) {
    return <Link to={`/${repo.owner.login}/${repo.name}`} className={styles.repo}>
        <span className={styles.repoOwner}>{repo.owner.login}</span>/
        <span className={styles.repoName}>{repo.name}</span>
    </Link>
}

