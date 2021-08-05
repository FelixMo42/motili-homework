import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Search from './features/search/Search'
import About from './features/about/About'
import { BrowserRouter, Route } from 'react-router-dom'
import { store } from './app/store'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Route path="/" exact component={Search} />
                <Route path="/:owner/:name" component={About} />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

