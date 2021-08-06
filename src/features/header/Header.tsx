import React from 'react'
import styles from './Header.module.css'
import { Link } from 'react-router-dom'

export default function Header() {
    return <div className={styles.header}>
        <Link to="/" className={styles.icon}>🔍</Link>
        <span className={styles.title}>GitHub repo search</span>
    </div>
}
