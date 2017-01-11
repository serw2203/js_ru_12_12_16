import * as _ from '../constants'

export function increment() {
    return {
        type: _.INCREMENT
    }
}

export function deleteArticle(id) {
    return {
        type: _.DELETE_ARTICLE,
        payload: { id }
    }
}

export function filterSelected (selected) {
    return {
        type: _.FILTER_SELECTED,
        payload: selected
    }
}

export function filterDate (from, to) {
    return {
        type: _.FILTER_DATE,
        payload: { from, to }
    }
}

export function filterArticle ( isFiltered, articles, selected, date ) {
    return {
        type: _.FILTER_ARTICLE,
        payload: { isFiltered, articles, selected, date }
    }
}