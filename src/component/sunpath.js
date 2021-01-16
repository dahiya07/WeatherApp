import React, { Component } from 'react'

export default class sunpath extends Component {
    componentDidMount(){
        document.querySelector('.sun-animation').css('width', '70%');
    }
    render() {
        return (
            <div class="sunmoon">
                <h2>Sun &amp; Moon</h2>
                <div class="sun-times">
                    <div class="sun-path">
                        <div class="sun-animation"></div>
                    </div>
                    <div class="sun-symbol-path"><span class="symbol">☀</span></div>
                </div>
                <div class="legend">
                <div class="sunrise">5:30 AM</div>
                    <div class="sunset">8:04 PM</div>
                </div>
                <div class="clear">&nbsp;</div>
        </div>
        )
    }
}
