import React, { Component, PropTypes } from 'react'
import Comment from './Comment'
import toggleOpen from '../decorators/toggleOpen'
import NewCommentForm from './NewCommentForm'
import {connect} from 'react-redux'
import { addComment } from '../AC/comments'

class CommentList extends Component {
    static propTypes = {
        commentsIds: PropTypes.array,
        isOpen: PropTypes.bool,
        toggleOpen: PropTypes.func,
    }

    render() {
        return (
            <div>
                {this.getLink()}
                {this.getBody()}
            </div>
        )
    }

    getLink() {
        return <a href="#" onClick = {this.props.toggleOpen}>
            {this.props.isOpen ? 'hide' : 'show'} comments
        </a>
    }

    //todo: HT_5.3
    addComment = (comment) => {
        this.props.addComment (this.props.article, comment)
    }

    getBody() {
        const { comments, isOpen } = this.props
        if (!isOpen) return null
        //todo: HT_5.3
        const form = <NewCommentForm addComment={ this.addComment } />
        if (!comments.length) return <div><p>No comments yet</p>{form}</div>

        const commentItems = comments.map(comment => <li key = {comment.id}><Comment comment = {comment} /></li>)
        return (
            <div>
                <ul>{commentItems}</ul>
                {form}
            </div>
        )
    }
}

export default connect((storeState, props) => {
    return {
        comments: props.commentsIds.map(id => storeState.comments.get(id))
    }
    //todo: HT_5.3
}, { addComment })(toggleOpen(CommentList))