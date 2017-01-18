import React, {Component, PropTypes} from 'react'
import {addComment, loadCommentsByArticleId} from '../AC'
import Comment from './Comment'
import toggleOpen from '../decorators/toggleOpen'
import NewCommentForm from './NewCommentForm'
import Loader from './Loader'
import {connect} from 'react-redux'

class CommentList extends Component {
    static propTypes = {
        article: PropTypes.object,
        isOpen: PropTypes.bool,
        toggleOpen: PropTypes.func
    }

    render() {
        return (
            <div>
                {this.getLink()}
                {this.getBody()}
            </div>
        )
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.isOpen && nextProps.isOpen) {
            nextProps.loadCommentsByArticleId(nextProps.article.id)
        }
    }

    getLink() {
        if (this.props.loading) return null

        return <a href="#" onClick={this.props.toggleOpen}>
            {this.props.isOpen ? 'hide' : 'show'} comments
        </a>
    }

    getBody() {
        const {comments, article, isOpen, addComment, loading} = this.props
        if (!isOpen) return null

        if (!loading) {
            const form = <NewCommentForm addComment={(comment) => addComment(article.id, comment)}/>
            if (!comments.length) return <div><p>No comments yet</p>{form}</div>
            const commentItems = comments.map(comment => comment ?
                <li key={comment.id}><Comment comment={comment}/></li> : null)
            return (
                <div>
                    <ul>{commentItems}</ul>
                    {form}
                </div>
            )
        } else {
            return (<Loader/>)
        }
    }
}

export default connect((storeState, props) => {
    return {
        comments: props.article.comments.map(id => storeState.comments.entities.get(id)),
        loading: storeState.comments.loading

    }
}, {addComment, loadCommentsByArticleId})(toggleOpen(CommentList))