import {combineReducers} from 'redux'
import counterReducer from './counter'
import articlesReducer from './articles'
import * as _ from '../constants'
import * as f from '../fixtures'

const dateReducer = (state = {}, action) => {
    if (action.type === _.FILTER_DATE) {
        return action.payload
    }
    return state
}

const selectedReducer = (state = [], action) => {
    if (action.type === _.FILTER_SELECTED) {
        return action.payload
    }
    return state
}

const filterReducer = (state = f.articles, action) => {
    if (action.type === _.FILTER_ARTICLE) {

        const {articles, isFiltered, selected, date} = action.payload;

        let result = articles

        if (isFiltered) {
            if (selected && selected.length > 0) {
                result = articles.filter(article => selected.find(select => select.value === article.id))
            }

            if (date && date.from ) {
                result = result.filter( article => new Date(article.date).getTime() >= date.from.getTime() )
            }

            if (date && date.to) {
                result = result.filter( article => new Date(article.date) <= date.to.getTime())
            }
        }

        return result
    }
    return state
}

export default combineReducers({
    count: counterReducer,
    articles: articlesReducer,
    date: dateReducer,
    selected: selectedReducer,
    filtered: filterReducer,
})