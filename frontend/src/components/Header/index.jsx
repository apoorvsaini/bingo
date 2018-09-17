import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import api from '../../api/api-config';
import claimBingo from '../../api/claim-bingo';

import './style.css';
import { setNewBall } from '../../actions/bingo';
import { setConnected } from '../../actions/home';


class Header extends React.Component {
    socket;

    constructor(props) {
        super(props);

        this.socket = io.connect(api.API_URL, api.SOCKET_OPTIONS);
        this.socket.emit('msg','yo');
        this.socket.on('reconnect', function (data) {
            console.log('re-connected');
        });
    }

    claimBingo(event) {
        if (this.props.bingoTickets.length > 0) {
            claimBingo(this.props.bingoTickets[0]).then(function(result) {
                alert(result);
            });
        }
        else {
            alert('LIAR!');
        }
    }

    checkConnection() {
        if(!this.socket.connected) {
            console.log('reconnecting...');
            this.socket = io.connect(api.API_URL);
        }
    }

    componentDidMount() {
        let _t = this;
        this.socket = io.connect(api.API_URL);

        this.socket.on('ball', function (data) {
            _t.props.setNewBall(data);
        });

        this.checkConnection();
    }

    componentDidUpdate() {
        this.checkConnection();
    }

    render() {
        return (
            <div className = 'header'>
                <div className = 'ball_ticker_area'>
                    <button className = 'bingo_button' onClick = {(e) => this.claimBingo(e)}>
                        Shout Bingo!
                    </button>
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
        bingoTickets: props.bingo.bingoTickets,
        connected: props.home.connected,
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(Header); 