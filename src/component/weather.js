import React, { Component } from 'react'
import DayCard from './cards';
import Can from './chart';
import Load from './loader'
import './cards.css'
export default class Weather extends Component {
    state={
        lat:"",
        lon:"",
        data:[],
        value:" ",
        hourlt:[],
        loading:true,
        city:"",
        temp:"",
        humidity:"",
        pressure:"",
        start:0,
        end:6
    }
    getPosition = () => {
        return new Promise(function (resolve, reject) {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
      }
    getWeather = async (latitude, longitude) => {
        fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=ce56e240f61af7eb2d39ee9ac6ebcb67`)
        .then(res => res.json())
        .then(dat =>{
           
            const x = dat
            this.setState({
            lat: latitude,
            lon: longitude,
            hourly:dat.hourly,
            data:x,
            value: dat.timezone,
             temp: dat.current.temp,
             humidity:dat.current.humidity,
             pressure:dat.current.pressure
        })
             this.setState({loading:false})
      })
    }
    componentDidMount(){
        this.getPosition().then((position)=>{
            this.getWeather(position.coords.latitude,position.coords.longitude)
        }).catch((err)=>console.log(err))
        this.timerID = setInterval(
            () => this.getWeather(this.state.lat, this.state.lon),
            600000
          );
    }
    handleChange=(event)=> {
        this.setState({value: event.target.value});
      }
    handleSubmit=(event)=> {
        event.preventDefault();
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&units=metric&appid=ce56e240f61af7eb2d39ee9ac6ebcb67`)
        .then(res => res.json())
        .then(position =>{
            this.getWeather(position.coord.lat,position.coord.lon)
        })
    }
    changehour=(i)=>{
        var x=(i*6)
        var end=x+6;
        this.setState({start:x,end:end})
        this.setState({humidity:this.state.data.daily[i].humidity})
        this.setState({pressure:this.state.data.daily[i].pressure})
        this.setState({temp:this.state.data.daily[i].temp.eve})
    }
    render() {
        console.log(this.state.data)
        var de=this.state.city;
        if(this.state.loading)
        {
            return (<div className="loader">
                        <Load/>
                        <h4>Loading</h4>
                    </div>)
        }
        else{
            return (
                <div className="forcasted">
                    <form  className="location" onSubmit={this.handleSubmit}>
                        <input placeholder={de} type="text" value={this.state.value} onChange={this.handleChange} />
                        <input type="submit" value="Submit"></input>
                    </form>
                    <DayCard data={this.state.data.daily} click={this.changehour}/>
                    <Can temp={this.state.temp} hourly={this.state.hourly} clicked={this.changehour}start={this.state.start} end={this.state.end}/>
                    <div className="current">
                        <div className="curr_forc">
                            <h4>Pressure</h4>
                            <p>{this.state.pressure}</p>
                        </div>
                        <div className="curr_forc">
                            <h4>Humidity</h4>
                            <p>{this.state.humidity}</p>
                        </div>
                    </div>
                </div>
            )
        }
    }
}
