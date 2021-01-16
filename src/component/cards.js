import React, { Component } from 'react'
import LOL from './lol'
import './cards.css'
export default class Cards extends Component {
    click=(i)=>{
        this.props.click(i)
    }
    render() {
        var value=this.props.data.map((x,index)=>(
                (<LOL 
                key={index}
                id={index}
                date={x.dt}
                temp={x.temp.eve}
                text={x.weather[0].main}
                icon={x.weather[0].id}
                click={this.click}
                />)
        ))
        return (
            <div className="day-wise">
                {value}
            </div>
        )
    }
}
