import React, {Component, PropTypes} from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import {connect} from 'react-redux'
import {filterSelected} from '../AC'

class ArticlesSelect extends Component {
    static propTypes = {
        articles: PropTypes.array
    };
    //от сетйта избавиться, нужные данные теперь в сторе живут
    state = {
        selected: null
    }

    render() {
        const options = this.props.articles.map(article => ({
            label: article.title,
            value: article.id
        }))
        return (
            <div>
                <Select options={options} value={this.state.selected} onChange={this.handleChange} multi={true}/>
            </div>
        )
    }

    handleChange = selected => this.setState({
        selected
    })

    componentDidUpdate() {
        this.props.filterSelected(this.state.selected)
    }
}

export default connect(null, {filterSelected})(ArticlesSelect)
