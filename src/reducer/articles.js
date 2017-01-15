import { DELETE_ARTICLE, ADD_COMMENT } from '../constants'
import { normalizedArticles } from '../fixtures'
import { arrayToMap } from '../helpers'
import { Record } from 'immutable'

const ArticleModel = Record({
    "id": null,
    "date": null,
    "title": null,
    "text": null,
    "comments": []
})

const defaultState = arrayToMap(normalizedArticles, ArticleModel)

export default (articlesState = defaultState, action) => {
    const { type, payload } = action

    switch (type) {
        case DELETE_ARTICLE:
            return articlesState.delete(payload.id)
        //todo HT_5.3
        case ADD_COMMENT: {
            let article = articlesState.get(payload.article.id).toJS()
            const comments = [...(articlesState.get(payload.article.id).comments || []), payload.comment.id]
            article.comments = [...comments, ...article.comments ]
            return articlesState.set (payload.article.id, article)
        }
    }

    return articlesState
}