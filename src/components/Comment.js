import React, {Component} from 'react'

export default class Comment extends Component {

    render() {
        const comment = this.props.comment;
        return (
            <li>
                <h5>{ comment.user } ID = { comment.id }</h5>
                <p>{ comment.text }</p>
            </li>
        )
    }
}