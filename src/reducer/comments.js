import {ADD_COMMENT, START, SUCCESS, FAIL, LOAD_ARTICLE_COMMENTS} from "../constants";
import {arrayToMap} from "../helpers";
import {Record, OrderedMap} from "immutable";

const CommentModel = Record({
    id: null,
    text: null,
    user: null
})

const DefaultReducerState = Record({
    error: null,
    loading: false,
    loaded: false,
    entities: new OrderedMap({})
})

const defaultState = new DefaultReducerState({})

export default (state = defaultState, action) => {
    const {type, payload, randomId} = action

    switch (type) {
        case ADD_COMMENT:
            return state.updateIn(['entities', randomId], (comment) => new CommentModel({...payload.comment, id: randomId}))


        case LOAD_ARTICLE_COMMENTS + START: {
            //здесь так не пройдет, ведь теоретически ты можешь одновременно для нескольких статей загружать
            return state.set('loading', true)
        }

        case LOAD_ARTICLE_COMMENTS + SUCCESS: {
            const {response} = action

            return state
                .mergeIn(['entities'], arrayToMap(response, CommentModel))
                .set('loading', false)
                .set('loaded', true)
                .set('error', null)
        }

        case LOAD_ARTICLE_COMMENTS + FAIL: {
            const {error} = action
            return state
                .set('error', error)
                .set('loading', false)
        }

    }

    return state
}
