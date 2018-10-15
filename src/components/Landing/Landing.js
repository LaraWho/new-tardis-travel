import React, { Component } from 'react';
import Particles from 'react-particles-js';
import particleConfig from '../../particlesjs-config.json';
import './landing.css';
import tardis from '../best-tardis-full.svg';
import question from '../who.svg';


class Landing extends Component {

    toMap = () => {
        this.props.history.push('/map');
    }

    render() {
        return(
                 <div className="space-bg">

                    <Particles style={{
                        width: '100%',
                        minHeight: '100vh',
                        height: "100%",
                        position: "absolute"
                        
                    }}
                        params={particleConfig}                        
                    />

                    <div className="landing-tardis-box">
                    <div className="question-btn-box" onClick={this.toMap}>
                        <h2 className="random-btn-text">WHERE WILL<br /> THE TARDIS<br /> TAKE YOU</h2>
                        <img className="question-mark" src={question} alt=""/>
                    </div>
                        <img className="landing-tardis" src={tardis} alt="TARDIS"/>
                    </div>


                </div>
        )
    }
}

export default Landing;