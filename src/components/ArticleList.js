import React, {PropTypes} from 'react'
import Article from './Article'
import Chart from './Chart'
import wrappedArticleList from '../decorators/wrappedArticleList'

class ArticleList extends React.Component {

    state = {
        openArticleId: null
    }

    render() {
        let {articles, that} = this.props
        that = that ? that : this

        const articleElements = articles.map(article =>
            <li key={article.id}>
                <Article article={article}
                         isOpen={ that.state.openArticleId == article.id }
                         onClick={ that.toggleOpenArticle(article.id) }
                />
            </li>)

        return (
            <div>
                <h2>Article List</h2>
                <ul>
                    {/*some comment*/}
                    {articleElements}
                </ul>
                <Chart articles={articles}/>
            </div>
        )
    }

    toggleOpenArticle = id => ev => {
        this.setState({
            openArticleId: id
        })
    }
}

//todo: HT 2.1
ArticleList.propTypes = {
    articles: PropTypes.array.isRequired,
    that: PropTypes.object,
}

//todo: HT 2.2
export default wrappedArticleList(ArticleList);