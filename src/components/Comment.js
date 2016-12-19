import React, {Component} from 'react'

export default class Comment extends Component {

    render() {
        const comment = this.props.comment;
    /**лучше не вносить li в Comment, это значительно уменьшает возможность переиспользовать компонент*/
        return (
            <div>
                <h5>{ comment.user } ID = { comment.id }</h5>
                <p>{ comment.text }</p>
            </div>
        )
    }
}
