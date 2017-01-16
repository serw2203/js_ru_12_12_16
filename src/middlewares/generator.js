import {ADD_COMMENT} from '../constants'
import {addComment} from '../AC/comments'

//todo: HT 5.2
function generate() {
    return Math.floor( Math.random() * Number.MAX_SAFE_INTEGER );
}

export default store => next => action => {
    //через мидлвары будет проходить каждый экшин, они должны быть максимально общими, завязывать на конкретные экшины - плохая практика
    if (action.type === ADD_COMMENT) {
        const {article, comment} = action.payload
        if (!comment.id) {
            const substitute = addComment(article, {...{id: generate()}, ...comment} )
            //лучше используй next
            store.dispatch(substitute)
        } else {
            next(action)
        }
    } else {
        next(action)
    }

}
