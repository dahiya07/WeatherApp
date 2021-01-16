import React, { Component } from 'react'
import "../css/owfont-regular.css"
var moment = require('moment');

export default class LOL extends Component {
    clicked=(e)=>{
        this.props.click(this.props.id)
    }
    render() {
        const imgURL = `owf owf-${this.props.icon} owf-3x`
        let newDate = new Date();
        const weekday = this.props.date * 1000
        newDate.setTime(weekday)
        return (
            <div className="card-look" onClick={this.clicked} tabIndex="-1">
                <div className="day">{moment(newDate).format('dddd')}</div>
                <div className="temp">{this.props.temp}</div>
                <div className="icon"><i className={imgURL}/></div>
                <div className="desc">{this.props.text}</div>
            </div>
        )
    }
}
