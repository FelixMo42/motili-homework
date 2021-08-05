import React from 'react'
import styles from './Search.module.css'
import { GitHubRepo } from '../../common/github'
import { Link } from 'react-router-dom'

export interface RepoProps {
    repo: GitHubRepo
}

export default function Repo({repo}: RepoProps) {
    return <Link to={`/${repo.owner.login}/${repo.name}`} className={styles.repo}>
        <span className={styles.repoOwner}>{repo.owner.login}</span>/
        <span className={styles.repoName}>{repo.name}</span>
    </Link>
}

