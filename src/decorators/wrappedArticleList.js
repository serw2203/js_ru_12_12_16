import React, {PropTypes} from "react";

//todo: HT 2.2
export default function (Component) {

    return class WrapperComponent2 extends React.Component {

        state = {
            openArticleId: null,
        }

        render() {
            return <Component { ...this.props } { ...this.state } that={ this } />
        }

        toggleOpenArticle = (id) => (ev) => {
            this.setState({
                //todo: HT 2.3
                openArticleId: id == this.state.openArticleId ? null : id
            })
        }
    }
}

