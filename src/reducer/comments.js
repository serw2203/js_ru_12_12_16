import {ADD_COMMENT} from '../constants'
import {normalizedComments} from '../fixtures'
import {arrayToMap} from '../helpers'
import {Record} from 'immutable'

//todo : HT_5.1
export const CommentModel = Record({
    "id": null,
    "user": null,
    "text": null
})

const defaultState = arrayToMap(normalizedComments, CommentModel)

export default (state = defaultState, action) => {
    const {type, payload, response, error} = action
    //todo : HT_5.3
    if (type === ADD_COMMENT) {
        const comment = new CommentModel (payload.comment)
        return state.set(comment.id, comment)
    }

    return state
}