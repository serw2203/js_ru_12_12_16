import React, {Component, PropTypes} from 'react'

//todo : HT_3.2
export default class CommentForm extends Component {

    static propTypes = {
        modifyComments: PropTypes.func.isRequired,
    };

    state = {
        //ок, но я просил текст и юзера
        comment: '',
    }

    handleSubmit = ev => {
        ev && ev.preventDefault && ev.preventDefault();
        const comment = this.state.comment
        if (comment) {
            console.log('add comment to article ==>> \n', comment)
            this.props.modifyComments( comment );
            this.setState({comment: ''});
        }
    }

    handleChange = ev => {
        this.setState({comment: ev.target.value});
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <textarea style={{"width": 450, "height": 200}} value={this.state.comment}
                          onChange={this.handleChange}/>
                <br/>
                <button>add comment</button>
            </form>
        )
    }
}
