import React, {Component} from 'react'
import Comment from './Comment';

export default class CommentList extends Component {
    state = {
        //лучше не держать вложеных объектов в state + название не очень
        isExpanded: false
    }

    static sortCommentsById = ( arr ) => {
        //не понимаю зачем это тебе
        /**-SB: обратная сортировка по числовому значению id commenta
         * думаю, что если это комментарии к статье, то они должны выводится в порядке обратном появлению
         * (немного потренировался в js)
         */
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
            //лучше не держать вложеных объектов в state + название не очень
            { isExpanded: !this.state.isExpanded }
        )
    }

    renderComments = (comments) => {
        if (this.state.isExpanded) {
            return (
                <ul>{comments.map(comment => {
                    return <li key={ comment.id }><Comment comment={ comment }/></li>;
                }) }
                </ul>
            );
        }
    }

    renderComponet = (comments) => {
        if (comments.length > 0) {
            return (
                <div>
                    {/*а это совсем не нужно в state, ты можешь получить текст из прошлой переменной*/}
                    {/* SB: как получить из прошлой переменной ??? Так ? */}
                    <button onClick={ this.handleClick }>{ this.state.isExpanded ? 'Скрыть комментарии' : 'Показать комментарии' }</button>
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
