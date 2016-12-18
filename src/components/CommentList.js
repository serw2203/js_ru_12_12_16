import React, {Component} from 'react'
import Comment from './Comment';

const openComments = {
    isOpen: true,
    //а это совсем не нужно в state, ты можешь получить текст из прошлой переменной
    btnTitle: 'Скрыть комментарии',
};

const closeComments = {
    isOpen: false,
    btnTitle: 'Показать комментарии',
};

export default class CommentList extends Component {
    state = {
        //лучше не держать вложеных объектов в state + название не очень
        toogleComments: closeComments
    }

    static sortCommentsById = ( arr ) => {
        //не понимаю зачем это тебе
        return arr.sort((a, b) => {
            let i1 = Number(a.id);
            let i2 = Number(b.id);

            i1 = isNaN(i1) ? 0 : i1;
            i2 = isNaN(i2) ? 0 : i2;

            if (i1 < i2) {
                return 1;
            } else if (i1 > i2) {
                return -1;
            } else {
                return 0;
            }
        });
    }

    handleClick = () => {
        this.setState(
            //что это за присвоение такое?
            this.state.toogleComments = this.state.toogleComments.isOpen ? closeComments : openComments
        )
    }

    renderComments = (comments) => {
        if (this.state.toogleComments.isOpen) {
            return (
                <ul>{comments.map(comment => {
                    return <Comment key={ comment.id } comment={ comment }/>;
                }) }
                </ul>
            );
        }
    }

    renderComponet = (comments) => {
        if (comments.length > 0) {
            return (
                <div>
                    <button onClick={ this.handleClick }>{ this.state.toogleComments.btnTitle }</button>
                    {this.renderComments(comments)}
                </div>
            );
        }
    }

    render() {
        let comments = CommentList.sortCommentsById (this.props.comments || []);
        return (<div>{ this.renderComponet(comments) }</div>);
    }
}
