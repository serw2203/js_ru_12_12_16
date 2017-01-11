import React, {Component} from 'react'
import DayPicker, {DateUtils} from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import {connect} from 'react-redux'
import {filterDate} from '../AC'

class DateRange extends Component {
    state = {
        from: null,
        to: null
    }

    handleDayClick = (e, day) => {
        this.setState(DateUtils.addDayToRange(day, this.state))
    }

    componentDidUpdate() {
        this.props.filterDate(this.state.from, this.state.to)
    }

    render() {
        const {from, to} = this.state;
        const selectedRange = from && to && `${from.toDateString()} - ${to.toDateString()}`
        return (
            <div className="date-range">
                <DayPicker
                    ref="daypicker"
                    selectedDays={ day => DateUtils.isDayInRange(day, {from, to}) }
                    onDayClick={ this.handleDayClick }
                />
                {selectedRange}
            </div>
        );
    }

}

export default connect(null, {filterDate})(DateRange)