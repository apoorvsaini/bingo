import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import api from '../../api/api-config';

import './style.css';
import { setNewBall } from '../../actions/bingo';
import { setConnected } from '../../actions/home';


class Header extends React.Component {
    socket = io.connect(api.API_URL);
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let _t = this;
        this.socket = io.connect(api.API_URL);
        
        this.socket.on('ball', function (data) {
            console.log(data);
            _t.props.setNewBall(data);
        });

        this.checkConnection();
    }

    checkConnection() {
        if(!this.socket.connected) {
            console.log('reconnecting...');
            this.socket = io.connect(api.API_URL);
        }
    }

    componentDidUpdate() {
        this.checkConnection();
    }

    render() {
        return (
            <div className = 'header'>
                <div className = 'ball_ticker_area'>
                    {this.props.ballsDrawn.map(data => (
                        <span className = 'balls' key = {'ball-' + data.time}> {data.ball} </span>
                    ))}
                </div>
            </div>
        );
    }

}

function mapDispatchToProps(dispatch) {
    return ({
        setNewBall: (data) => dispatch(setNewBall(data)),
        setConnected: (status) => dispatch(setConnected(status)),
    });
}

function mapStateToProps(props) {
    return ({
        ballsDrawn: props.bingo.ballsDrawn,
        ticketsData: props.bingo.ticketsData,
        connected: props.home.connected,
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(Header); 