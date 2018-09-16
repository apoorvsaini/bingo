import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import axios from 'axios';

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

        // TODO: Temp method
        setTimeout(function(){
            axios.get(api.API_URL + api.API_BINGO + '/' + sessionStorage.getItem('userId') + '/' + 0)
            .then(function (response) {
                console.log("CLAIMING");
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
        }, 10000);
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
                    {this.props.ballsDrawn.map((data, index) => (
                        <span className = {(index === 0) ? 'last_ball' : 'balls'} key = {'ball-' + data.time}> {data.ball} </span>
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