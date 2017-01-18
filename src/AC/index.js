import {
    INCREMENT, DELETE_ARTICLE, ADD_COMMENT, LOAD_ALL_ARTICLES, LOAD_ARTICLE,
    START, SUCCESS, FAIL, LOAD_ARTICLE_COMMENTS,
} from '../constants'
import $ from 'jquery'

export function increment() {
    return {
        type: INCREMENT
    }
}

export function deleteArticle(id) {
    return {
        type: DELETE_ARTICLE,
        payload: {id}
    }
}

export function addComment(articleId, comment) {
    return {
        type: ADD_COMMENT,
        payload: {articleId, comment},
        generateId: true
    }
}

export function loadAllArticles() {
    return {
        type: LOAD_ALL_ARTICLES,
        callAPI: '/api/article'
    }
}

export function loadArticleById(id) {
    return (dispatch, getState) => {

        if (getState().articles.getIn(['entities', id, 'text'])) return null

        dispatch({
            type: LOAD_ARTICLE + START,
            payload: {id}
        })

        $.get(`/api/article/${id}`)
            .done(response => dispatch({
                type: LOAD_ARTICLE + SUCCESS,
                payload: {id},
                response
            }))
            .fail(error => dispatch({
                type: LOAD_ARTICLE + FAIL,
                payload: {id},
                error
            }))
    }
}

export function loadCommentsByArticleId(id) {
    return (dispatch, getState) => {
        //нет, такая проверка подходила для статьи, поскольку нам для нее нужно было загружать текст. А это у тебя вообще всегда undefined будет, ведь там id статьи,  а ищешь ты в комментах
        if (getState().comments.getIn(['entities', id, 'text'])) return null

        dispatch({
            type: LOAD_ARTICLE_COMMENTS + START,
            payload: {id}
        })

        setTimeout(() => {
            $.get(`/api/comment?article=${id}`)
                .done(response => dispatch({
                    type: LOAD_ARTICLE_COMMENTS + SUCCESS,
                    payload: {id},
                    response
                }))
                .fail(error => dispatch({
                    type: LOAD_ARTICLE_COMMENTS + FAIL,
                    payload: {id},
                    error
                }))
        }, 2000)
    }
}
