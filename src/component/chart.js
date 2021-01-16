import CanvasJSReact from '../canvajs/canvasjs.react';
var React = require('react');
var Component = React.Component;
//var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class Canvas extends Component {
	render() {
		var x=[];
		for(var i=this.props.start;i<this.props.end;i++)
		{
			var obj={};
			let newDate = new Date();
    		const weekday = this.props.hourly[i].dt * 1000
			newDate.setTime(weekday)
			var y=newDate.getHours();
			obj["x"]=y
			obj["y"]=this.props.hourly[i].temp;
			x.push(obj)
		}
		const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light2", // "light1", "dark1", "dark2"
            axisY:{    
                valueFormatString: " ",
            },
			axisX: {
				postfix: " ",
				interval: 2
			},
			data: [{
				type: "line",
				toolTipContent: "Week {x}: {y}%",
				dataPoints : x
			}]
		}
		return (
		<div className="chart">
			<div className="curr_temp">{this.props.temp}*C</div>
			<CanvasJSChart options = {options}
				onRef={ref => this.chart = ref} 
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}
export default Canvas