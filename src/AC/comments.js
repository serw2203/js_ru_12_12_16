import { ADD_COMMENT } from '../constants'

export function addComment (article, comment ) {
    return {
        type: ADD_COMMENT,
        payload: {article, comment}
    }
}