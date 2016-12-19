import React, { Component } from 'react'
import CommentList from './CommentList';

export default class Article extends Component {
    state = {
        isOpen: false
    }

/*
    constructor() {
        super()
        this.state = {
            isOpen: false
        }
    }
*/

    render() {
        const { article } = this.props
        return (
            <div>
                <h3 onClick = {this.toggleOpen}>{article.title}</h3>
                {this.getBody(article.comments)}
            </div>
        )
    }

    toggleOpen = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    getBody(comments) {
        if (!this.state.isOpen) return null
        return (
            <section>
                {this.props.article.text}
                {/*их стоило в getBody внести*/}
                <CommentList comments={ comments } />
            </section>
        )
    }
}
