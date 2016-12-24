import React, {Component, PropTypes} from 'react'
import ReactDayPicker from 'react-day-picker'
import './style.css'
import './extended-style.css'

const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timezone: 'UTC'
};

function formatDate (date) {
    return date ? date.toLocaleString("ru", options) : date;
}
//todo : HT_3.1
export default class extends Component {

    static propTypes = {
        width: PropTypes.number,
        height: PropTypes.number,
    }

    state = {
        selectedDay: new Date(),
        from: null,
        to: null,
    }

    handleReset = () => {
        this.setState({ from: null, to: null, output: '' })
    }

    handleDayClick = (e, day, {selected, disabled}) => {
        if (disabled) return

        let output = ''
        let from = this.state.from;
        let to = this.state.to;

        if (from && to) {
            from = null
            to = null
        }

        if (!from) {
            from = day;
            output = 'selected first date in range'
        } else if (!to) {
            to = day
            if ( to - from > 0) {
                output =  formatDate(from) + ' - ' + formatDate(to)
            } else
                output = formatDate(to) + ' - ' + formatDate(from)
        }

        this.setState({selectedDay: day, from: from, to: to, output: output});
    };

    render() {
        const {width, height} = this.props;

        return (
            <div className="extended-DayPicker-Container" style={{"width": width, "height": height}}>
                <ReactDayPicker onDayClick={ this.handleDayClick }/>
                <div className="extended-DayPicker-Reset">
                    <button onClick={ this.handleReset }>reset</button>
                </div>
                <p className="extended-DayPicker-StatusBar-Text">{this.state.output}</p>
            </div>
        )
    }
}