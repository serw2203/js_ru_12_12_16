import React, {Component, PropTypes} from 'react'
import {filterArticle} from '../AC'
import {connect} from 'react-redux'
import ArticlesSelect from './ArticlesSelect'
import DateRange from './DateRange'

class Filters extends Component {
    static propTypes = {
        articles: PropTypes.array.isRequired
    }

    state = {
        isFiltered: false,
    }

    handleButtonClick = (ev) => {
        this.setState({
            isFiltered: !this.state.isFiltered,
        })
    }

    componentDidUpdate = () => {
        this.props.filterArticle (this.state.isFiltered, this.props.articles, this.props.selected, this.props.date )
    }

    render() {
        return (
            <div style={{"padding": "20px"}}>
                <ArticlesSelect articles={this.props.articles}/>
                <DateRange/>
                <button onClick={this.handleButtonClick}>{this.state.isFiltered ? 'Disable' : 'Enable'} filter</button>
            </div>
        )
    }
}

export default connect((state) => {
    return {
        articles: state.articles,
        selected: state.selected,
        date: state.date,
    }
}, {filterArticle} )(Filters)