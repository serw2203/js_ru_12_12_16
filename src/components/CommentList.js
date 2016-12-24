import React, {Component, PropTypes} from 'react'
import Comment from './Comment'
import toggleOpen from '../decorators/toggleOpen'
import CommentForm from './CommentForm'

class CommentList extends Component {
    static propTypes = {
        comments: PropTypes.array,
        isOpen: PropTypes.bool,
        toggleOpen: PropTypes.func
    }
    static defaultProps = {
        comments: []
    }

    state = {
        comments: null,
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
        return <a href="#" onClick={this.props.toggleOpen}>
            {this.props.isOpen ? 'hide' : 'show'} comments
        </a>
    }

    //todo : HT_3.2
    modifyComments = (text) => {
        const el = document.getElementById('username')
        const user = el && el.value ? el.value : 'anonymous'
        const id = Math.floor(Math.random() * 10) + 10

        const comments = [...(this.state.comments || this.props.comments), {id: id, user: user, text: text}]
        this.setState({comments: comments})
        console.log('modifiedComments == >>>')
        comments.forEach(comment => console.log(comment))
        console.log('------------------------------------------')
    }

    getBody() {
        const {comments, isOpen} = this.props
        if (!isOpen) return null
        //todo : HT_3.2
        const commentForm = <CommentForm modifyComments={this.modifyComments}/>

        if (!comments.length) {
            return (
                <div>
                    <p>No comments yet</p>
                    {commentForm}
                </div>)
        }
        const commentItems = comments.map(comment => <li key={comment.id}><Comment comment={comment}/></li>)
        return (
            <ul>
                <div>{commentItems}</div>
                {commentForm}
            </ul>)
    }
}

export default toggleOpen(CommentList)