import React, { PropTypes } from 'react'
import ArticleList from './ArticleList'
import UserForm from './UserForm'
import Filter from './Filter'
import DayPicker from './DayPicker'

function AppContainer(props) {
    //todo : HT_3.1
    return (
        <div>
            <UserForm />
            <Filter articles = {props.articles}/>
            <ArticleList articles={props.articles}/>
            <br/>
            <DayPicker width={10} />
        </div>
    )
}

AppContainer.propTypes = {
}

export default AppContainer